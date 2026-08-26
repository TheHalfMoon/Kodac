import {
  createK6R3RouteOutcomeLinkage,
  validateK6R3RouteOutcomeLinkage,
  type K6R3RouteOutcomeLinkage,
} from "./outcome-linkage-contracts.ts"

export function materializeK6R3RouteOutcomeLinkage(value: unknown): K6R3RouteOutcomeLinkage {
  const linkage = createK6R3RouteOutcomeLinkage(value)
  return validateK6R3RouteOutcomeLinkage(linkage, value)
}
