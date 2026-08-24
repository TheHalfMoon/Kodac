import type { ExtensionDescriptor } from "../extensions/contracts.ts"
import { ExtensionDescriptorRegistry } from "../extensions/registry.ts"
import {
  K4_R1_LIMITS,
  K4_R1_NORMALIZATION_DISPOSITIONS,
  createCompatibilityBindingSnapshot,
  validateCompatibilityCapabilityId,
  validateCompatibilityExtensionId,
  validateCompatibilitySha256,
  validateExternalCapabilityBinding,
  validateExternalCapabilityName,
  validateExternalObjectKind,
  compatibilityStandardPin,
  type CompatibilityBindingSnapshot,
  type CompatibilityStandardId,
  type ExternalCapabilityBinding,
  type ExternalObjectKind,
  type NormalizationDisposition,
} from "./contracts.ts"

export const K4_R1_REGISTRATION_VERSION = "k4-r1-compatibility-registration-v1" as const

export interface CompatibilityBindingRegistrationReceipt {
  readonly version: typeof K4_R1_REGISTRATION_VERSION
  readonly bindingIdentity: string
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly registrationSerial: number
}

interface ActiveRegistration {
  readonly binding: ExternalCapabilityBinding
  readonly conflictKey: string
  readonly registrationSerial: number
}

const RECEIPT_KEYS = ["version", "bindingIdentity", "extensionId", "descriptorIdentity", "registrationSerial"] as const
const DISPOSITION_SET = new Set<string>(K4_R1_NORMALIZATION_DISPOSITIONS)

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be an object`)
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object`)
  if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError(`${label} must not contain symbol fields`)
  const result = Object.create(null) as Record<string, unknown>
  for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    if (!("value" in descriptor) || !descriptor.enumerable) throw new TypeError(`${label}.${key} must be an enumerable data property`)
    result[key] = descriptor.value
  }
  try {
    structuredClone(value)
  } catch {
    throw new TypeError(`${label} must not be a Proxy or contain uncloneable values`)
  }
  return result
}

function exactKeys(record: Record<string, unknown>, allowed: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) {
    if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  }
  for (const key of allowed) {
    if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
  }
}

function positiveSafeInteger(value: unknown, label: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 1) throw new TypeError(`${label} must be a positive safe integer`)
  return value as number
}

function cloneBinding(binding: ExternalCapabilityBinding): ExternalCapabilityBinding {
  return Object.freeze({ ...binding, normalizedCapabilityIds: Object.freeze([...binding.normalizedCapabilityIds]) })
}

function conflictKey(binding: ExternalCapabilityBinding): string {
  return [
    binding.standardPinIdentity,
    binding.objectKind,
    binding.externalName,
    binding.extensionId,
    binding.descriptorIdentity,
  ].join("\0")
}

function receipt(registration: ActiveRegistration): CompatibilityBindingRegistrationReceipt {
  return Object.freeze({
    version: K4_R1_REGISTRATION_VERSION,
    bindingIdentity: registration.binding.bindingIdentity,
    extensionId: registration.binding.extensionId,
    descriptorIdentity: registration.binding.descriptorIdentity,
    registrationSerial: registration.registrationSerial,
  })
}

function assertProviderClaims(descriptor: ExtensionDescriptor, binding: ExternalCapabilityBinding): void {
  for (const capabilityId of binding.normalizedCapabilityIds) {
    const contribution = descriptor.capabilities.find((entry) => entry.capabilityId === capabilityId)
    if (contribution === undefined || !contribution.roles.includes("PROVIDER")) {
      throw new TypeError(`adapter does not declare normalized capability as PROVIDER: ${capabilityId}`)
    }
  }
}

export function validateCompatibilityBindingRegistrationReceipt(value: unknown): CompatibilityBindingRegistrationReceipt {
  const record = asRecord(value, "compatibility binding registration receipt")
  exactKeys(record, RECEIPT_KEYS, "compatibility binding registration receipt")
  if (record.version !== K4_R1_REGISTRATION_VERSION) throw new TypeError("unsupported compatibility binding registration receipt")
  return Object.freeze({
    version: K4_R1_REGISTRATION_VERSION,
    bindingIdentity: validateCompatibilitySha256(record.bindingIdentity, "registration receipt bindingIdentity"),
    extensionId: validateCompatibilityExtensionId(record.extensionId, "registration receipt extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "registration receipt descriptorIdentity"),
    registrationSerial: positiveSafeInteger(record.registrationSerial, "registration receipt registrationSerial"),
  })
}

export class CompatibilityBindingRegistry {
  private readonly registrations = new Map<string, ActiveRegistration>()
  private readonly conflictKeys = new Set<string>()
  private readonly extensionRegistry: ExtensionDescriptorRegistry
  private nextRegistrationSerial = 1

  constructor(extensionRegistry: ExtensionDescriptorRegistry) {
    if (!(extensionRegistry instanceof ExtensionDescriptorRegistry)) {
      throw new TypeError("compatibility registry requires an ExtensionDescriptorRegistry")
    }
    this.extensionRegistry = extensionRegistry
  }

  get size(): number {
    return this.registrations.size
  }

  register(value: unknown): CompatibilityBindingRegistrationReceipt {
    const binding = validateExternalCapabilityBinding(value)
    const descriptor = this.extensionRegistry.get(binding.extensionId)
    if (descriptor === undefined) throw new TypeError(`adapter extension is not registered: ${binding.extensionId}`)
    if (descriptor.descriptorIdentity !== binding.descriptorIdentity) {
      throw new TypeError("adapter descriptor identity does not match the registered H1 descriptor")
    }
    assertProviderClaims(descriptor, binding)

    const key = conflictKey(binding)
    if (this.registrations.has(binding.bindingIdentity)) throw new TypeError("compatibility binding identity is already registered")
    if (this.conflictKeys.has(key)) throw new TypeError("conflicting compatibility binding is already registered")
    if (this.registrations.size >= K4_R1_LIMITS.maxRegistryBindings) {
      throw new RangeError(`compatibility registry is limited to ${K4_R1_LIMITS.maxRegistryBindings} active bindings`)
    }
    if (!Number.isSafeInteger(this.nextRegistrationSerial) || this.nextRegistrationSerial < 1) {
      throw new RangeError("compatibility registration serial exhausted")
    }

    const registration = Object.freeze({
      binding: cloneBinding(binding),
      conflictKey: key,
      registrationSerial: this.nextRegistrationSerial,
    })
    this.registrations.set(binding.bindingIdentity, registration)
    this.conflictKeys.add(key)
    this.nextRegistrationSerial += 1
    return receipt(registration)
  }

  dispose(value: unknown): boolean {
    const candidate = validateCompatibilityBindingRegistrationReceipt(value)
    const current = this.registrations.get(candidate.bindingIdentity)
    if (current === undefined) return false
    if (
      current.registrationSerial !== candidate.registrationSerial
      || current.binding.extensionId !== candidate.extensionId
      || current.binding.descriptorIdentity !== candidate.descriptorIdentity
    ) return false
    this.registrations.delete(candidate.bindingIdentity)
    this.conflictKeys.delete(current.conflictKey)
    return true
  }

  has(bindingIdentity: string): boolean {
    return this.registrations.has(validateCompatibilitySha256(bindingIdentity, "bindingIdentity"))
  }

  get(bindingIdentity: string): ExternalCapabilityBinding | undefined {
    const registration = this.registrations.get(validateCompatibilitySha256(bindingIdentity, "bindingIdentity"))
    return registration === undefined ? undefined : cloneBinding(registration.binding)
  }

  list(): CompatibilityBindingSnapshot {
    return this.snapshot(() => true)
  }

  findByStandard(standard: CompatibilityStandardId): CompatibilityBindingSnapshot {
    const pin = compatibilityStandardPin(standard)
    return this.snapshot((binding) => binding.standardPinIdentity === pin.standardPinIdentity)
  }

  findByObjectKind(objectKind: ExternalObjectKind): CompatibilityBindingSnapshot {
    const normalized = validateExternalObjectKind(objectKind)
    return this.snapshot((binding) => binding.objectKind === normalized)
  }

  findByExternalName(externalName: string): CompatibilityBindingSnapshot {
    const normalized = validateExternalCapabilityName(externalName)
    return this.snapshot((binding) => binding.externalName === normalized)
  }

  findByAdapter(extensionId: string, descriptorIdentity: string): CompatibilityBindingSnapshot {
    const normalizedId = validateCompatibilityExtensionId(extensionId)
    const normalizedIdentity = validateCompatibilitySha256(descriptorIdentity, "descriptorIdentity")
    return this.snapshot((binding) => binding.extensionId === normalizedId && binding.descriptorIdentity === normalizedIdentity)
  }

  findByCapability(capabilityId: string): CompatibilityBindingSnapshot {
    const normalized = validateCompatibilityCapabilityId(capabilityId)
    return this.snapshot((binding) => binding.normalizedCapabilityIds.includes(normalized))
  }

  findByDisposition(disposition: NormalizationDisposition): CompatibilityBindingSnapshot {
    if (typeof disposition !== "string" || !DISPOSITION_SET.has(disposition)) throw new TypeError("normalization disposition is unsupported")
    return this.snapshot((binding) => binding.disposition === disposition)
  }

  private snapshot(predicate: (binding: ExternalCapabilityBinding) => boolean): CompatibilityBindingSnapshot {
    return createCompatibilityBindingSnapshot(
      [...this.registrations.values()].map((registration) => registration.binding).filter(predicate),
    )
  }
}
