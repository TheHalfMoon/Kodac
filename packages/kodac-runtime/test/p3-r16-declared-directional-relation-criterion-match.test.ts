import assert from "node:assert/strict"
import test from "node:test"

import {
  P3_R16_ALLOWED_RELATIONS,
  P3_R16_CRITERION_DECLARATION_KIND,
  P3_R16_CRITERION_DECLARATION_VERSION,
  P3_R16_CRITERION_MATCH_EVIDENCE_KIND,
  P3_R16_CRITERION_MATCH_EVIDENCE_VERSION,
} from "../bench/p3-r16/contracts.ts"
import { buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence } from "../bench/p3-r16/declared-directional-relation-criterion-match.ts"

test("P3-R16 exposes only the closed declaration/evidence contract literals", () => {
  assert.equal(
    P3_R16_CRITERION_DECLARATION_VERSION,
    "p3-r16-declared-directional-relation-criterion-declaration-v1",
  )
  assert.equal(P3_R16_CRITERION_DECLARATION_KIND, "declare_strategy_directional_relation_criteria")
  assert.equal(
    P3_R16_CRITERION_MATCH_EVIDENCE_VERSION,
    "p3-r16-declared-directional-relation-criterion-match-evidence-v1",
  )
  assert.equal(
    P3_R16_CRITERION_MATCH_EVIDENCE_KIND,
    "declared_strategy_directional_relation_criterion_match_evidence",
  )
  assert.deepEqual(P3_R16_ALLOWED_RELATIONS, [
    "EQUAL_RAW_VALUE",
    "LEFT_FAVORED_BY_DIRECTION",
    "RIGHT_FAVORED_BY_DIRECTION",
  ])
  assert.ok(Object.isFrozen(P3_R16_ALLOWED_RELATIONS))
})

test("P3-R16 rejects wrong arity before any caller-root semantic read", () => {
  let getterCalls = 0
  const hostile = Object.defineProperty({}, "value", {
    enumerable: true,
    get() {
      getterCalls += 1
      throw new Error("caller root was read")
    },
  })

  const invoke = buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence as unknown as (
    ...values: unknown[]
  ) => unknown

  assert.throws(
    () => invoke(hostile, hostile, hostile),
    /requires exactly four arguments/,
  )
  assert.equal(getterCalls, 0)

  assert.throws(
    () => invoke(hostile, hostile, hostile, hostile, hostile),
    /requires exactly four arguments/,
  )
  assert.equal(getterCalls, 0)
})
