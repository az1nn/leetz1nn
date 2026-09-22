# CAVEMAN HANDOFF v1

REPO: az1nn/leetz1nn
CANONICAL SIGA PROCEDURE: .github/skills/siga/SKILL.md
CANONICAL SIGA STATE: .github/skills/siga/HANDOFF.md

BASE BRANCH: feat/007-stack-valid-parentheses
BASE VERIFIED HEAD: 194c4162d04e6e5af9250c477ed8c835c12041d7
CURRENT BRANCH: feat/008-prefix-sum-range-sum
PR: #8 — feat: add Prefix Sum range query lab
FUNCTIONAL TARGET SHA: 18138879af222553656678bd2470fecee071c9e6
SPEC: specs/008-prefix-sum-range-sum/spec.md
STATE: WAVE_008_MACHINE_GREEN_HV_PENDING
SIGA CLASSIFICATION: ADVANCE

## Verified machine gates

quality run #37: SUCCESS

- install: PASS
- Vitest: PASS
- TypeScript: PASS
- Expo Doctor: PASS
- PR machine gate: PASS on frozen functional target

## Delta

Wave 008 adds:

- pure `traceRangeSum()` Prefix Sum algorithm;
- deterministic prefix preprocessing trace;
- inclusive `[left, right]` O(1) query subtraction;
- array and prefix-boundary visualization;
- guarded array/range inputs that preserve the active valid trace;
- Lab 006 catalog/progress/review-queue integration;
- backward-compatible v1 progress hydration;
- SPEC-008;
- regression tests for prefix construction, range subtraction, single-element queries, invalid bounds and progress migration.

## Human Validation

Status: PENDING_HUMAN
Packet: docs/validation/008-prefix-sum-range-sum.md
Frozen implementation SHA: 18138879af222553656678bd2470fecee071c9e6
Required checks: HV-01 through HV-07.

Human Validation is asynchronous and does not block safe independent engineering under the current stack policy. It must never be inferred from CI.

## Existing stack

- PR #1 — playground foundation — open; mergeable but unstable because its original quality run remains failed
- PR #2 — Two Pointers + async Human Validation — open; clean
- PR #3 — Sliding Window — open; clean
- PR #4 — study navigation + progress — open; clean
- PR #5 — Binary Search — open; clean
- PR #6 — Review Queue — open; clean
- PR #7 — Stack / Valid Parentheses — open; clean
- PR #8 — Prefix Sum / Range Sum Query — open; clean on the frozen functional target

No review threads were open on PR #1–#8 at the Wave 008 freeze boundary.

All parent merges, heads, mergeability and CI must be re-verified before retargeting or future work.

## Next boundary

1. Reconcile PR #1–#8, heads, mergeability, review threads and latest CI.
2. If PR #8 functional code changes, mark the current Human Validation packet `SUPERSEDED` and regenerate it.
3. If Wave 008 machine gates remain green, ADVANCE to the next coherent pattern lab on a new branch stacked on PR #8; preferred next slice: Lab 007 — Linked List / Reverse Linked List.
4. Keep progress/storage schema at v1 unless a future spec explicitly requires new persisted fields.

## Authority boundaries

- No automatic merge.
- No invented Human Validation pass.
- No duplicate branch for an already active wave.
- Retarget stacked PRs only after parent merge is verified.
- Re-run relevant gates after retargeting or functional mutation.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep progress/storage outside algorithm implementations.
- SIGA procedure/state stays only in this repository.
- Real repository state must be checked before using this handoff.
