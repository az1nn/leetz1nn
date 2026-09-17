# Human Validation — 002 Two Pointers + Async Validation

Status: `PENDING_HUMAN`
Target implementation SHA: `8a6a2228b3ccc8a95a752b0853d1eb3137b82298`
Branch: `feat/002-two-pointers-human-validation`
PR: #2, stacked on PR #1
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] `npm install`
- [x] `npm test` — 3 trace tests passed
- [x] `npm run typecheck`
- [x] `npm run doctor`
- [x] quality run #23 completed successfully

The final compatibility fixes align the Expo SDK 57 dependency matrix, remove deprecated/unused TypeScript alias configuration, and declare CSS side-effect imports for TypeScript 6. None of this constitutes Human Validation.

## Prerequisites

1. Check out `8a6a2228b3ccc8a95a752b0853d1eb3137b82298`.
2. Run `npm install` and `npm run web`.
3. Open the playground in a modern browser.

## Required steps

### HV-01 — Foundation regression
**Action:** Run Lab 001 with `2, 7, 11, 15`, target `9`, to completion.
**Expected:** Pair `[0, 1]`; hash-map state, pseudocode highlight and playback controls behave correctly.
**Evidence:** `PASS`/`FAIL`; screenshot on failure.
**Result:** `PENDING`

### HV-02 — Default Two Pointers trace
**Action:** Run Lab 002 with `1, 8, 6, 2, 5, 4, 8, 3, 7` to completion.
**Expected:** Shorter-wall reasoning is visible; final area `49`; best pair `[1, 8]`; `O(n)` time / `O(1)` space.
**Evidence:** One middle-step and one final-state screenshot, or equivalent observations.
**Result:** `PENDING`

### HV-03 — Minimal fixture
**Action:** Run `1, 1`.
**Expected:** Final area `1`; stable two-bar UI.
**Evidence:** `PASS`/`FAIL`.
**Result:** `PENDING`

### HV-04 — Invalid input guard
**Action:** Test `1`, `1, -2, 3`, and `1, nope, 3`.
**Expected:** Each is rejected with `Use at least two comma-separated, non-negative heights.` without replacing valid state.
**Evidence:** Exact failing input and observation if any case fails.
**Result:** `PENDING`

### HV-05 — Responsive web behavior
**Action:** Validate around `390px` and `>= 1280px`; use visualization scrolling and all playback controls.
**Expected:** No clipping/overlap; controls remain reachable; horizontal scrolling stays local to the visualization.
**Evidence:** One mobile and one desktop screenshot.
**Result:** `PENDING`

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Earlier implementation targets are `SUPERSEDED`. Any functional change after `8a6a2228b3ccc8a95a752b0853d1eb3137b82298` requires regeneration.

## Continuation Prompt

```text
Continue work on leetz1nn.
Repository: az1nn/leetz1nn
Branch: feat/002-two-pointers-human-validation
PR/stack: PR #2 on PR #1; PR #3 and PR #4 are already stacked above it. Continue independently of merges; retarget children after parent merges and re-run gates.
Frozen implementation SHA: 8a6a2228b3ccc8a95a752b0853d1eb3137b82298

Completed:
- Lab 001 Two Sum.
- Lab 002 Container With Most Water.
- Async Human Validation skill.
- Expo SDK 57 / TypeScript 6 compatibility baseline.
- Quality run #23 green: install, tests, typecheck, Expo Doctor.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/002-two-pointers-human-validation.md
- Pending: HV-01..HV-05.

Next boundary:
1. Re-check PR #1–#4 state, review threads and CI.
2. Preserve Human Validation as asynchronous and SHA-bound.
3. Continue from the highest coherent stacked PR; do not reopen solved foundation work unless evidence regresses.

Constraints:
- Never infer Human Validation from CI.
- Mark packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve pure algorithm → trace → hook/player → visualizer.
```
