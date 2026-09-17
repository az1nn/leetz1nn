# Human Validation — 005 Binary Search

Status: `PENDING_HUMAN`
Target implementation SHA: `e3b7b2efa511ece384376233cd81614a96e9aad3`
Branch: `feat/005-binary-search`
PR: #5, stacked on PR #4
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [ ] algorithm + progress tests
- [ ] TypeScript
- [ ] Expo Doctor
- [ ] PR CI completed successfully

## Prerequisites

1. Check out `e3b7b2efa511ece384376233cd81614a96e9aad3`.
2. Run `npm install` and `npm run web`.
3. Open the study workspace in a modern browser.

## Required steps

### HV-01 — Catalog integration
**Action:** Open the catalog and select Lab 004 — Binary Search.
**Expected:** Catalog contains four labs, only Binary Search visualizer is mounted, and current-study state follows Lab 004.
**Evidence:** `PASS`/`FAIL`; screenshot on failure.
**Result:** `PENDING`

### HV-02 — Found target / logarithmic shrink
**Action:** Use default `-1, 0, 3, 5, 9, 12`, target `9`, and advance to completion.
**Expected:** `left/mid/right` are visible; discarded halves fade; range size decreases; final found index is `4`; complexity shows `O(log n)` time / `O(1)` space.
**Evidence:** Screenshot first probe and final found state, or equivalent observations.
**Result:** `PENDING`

### HV-03 — Not-found terminal state
**Action:** Keep the default array, set target `2`, build the trace, advance to completion.
**Expected:** Search interval eventually becomes empty; terminal decision is `not-found`; no stale midpoint is shown as a match.
**Evidence:** `PASS`/`FAIL`; record final left/right values.
**Result:** `PENDING`

### HV-04 — Sorted-input guard
**Action:** Enter `1, 4, 3, 8` and build the trace.
**Expected:** UI rejects it with `Binary Search requires the array to be sorted in ascending order.` and preserves the previous valid trace.
**Evidence:** Record exact message and current visualization state.
**Result:** `PENDING`

### HV-05 — Progress persistence for the new lab
**Action:** Set Lab 004 mastery to `practicing`, mark it complete, log one review, reload.
**Expected:** Lab 004 remains selected and its mastery/completion/review metadata persist; overall completion denominator is four labs.
**Evidence:** Record status before and after reload.
**Result:** `PENDING`

### HV-06 — Responsive interval visualization
**Action:** Validate around `390px` and `>= 1280px`, including a long sorted array requiring horizontal scrolling.
**Expected:** Search boxes remain readable, horizontal scrolling stays local, state/actions remain reachable, no implementation panel clipping.
**Evidence:** One mobile and one desktop screenshot.
**Result:** `PENDING`

## Optional exploratory checks

- Start with browser progress created before Lab 004 existed and confirm old Lab 001–003 state survives while Lab 004 begins at defaults.
- Try target at first/last array index and duplicate sorted values.
- Repeat on Expo Android/iOS.

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Any functional change after `e3b7b2efa511ece384376233cd81614a96e9aad3` requires this packet to be marked `SUPERSEDED` and regenerated.

## Continuation Prompt

```text
Continue work on leetz1nn.
Repository: az1nn/leetz1nn
Branch: feat/005-binary-search
PR/stack: PR #5 on PR #4 on PR #3 on PR #2 on PR #1. Continue independently of pending merges and Human Validation. Retarget affected child PRs after parent merges and re-run gates.
Frozen implementation SHA: e3b7b2efa511ece384376233cd81614a96e9aad3

Completed:
- Lab 001 Two Sum / Arrays & Hashing.
- Lab 002 Container With Most Water / Two Pointers.
- Lab 003 Longest Substring Without Repeating Characters / Sliding Window.
- Study catalog and AsyncStorage-backed progress.
- Lab 004 Binary Search with left/mid/right interval visualization.
- Binary Search found/not-found tests.
- Backward-compatible progress hydration when Lab 004 is absent from older persisted state.
- Async Human Validation skill and packet for every wave.

Automated gates:
- Re-check PR #5 CI; do not rely on parent green status for this new code.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/005-binary-search.md
- Target: e3b7b2efa511ece384376233cd81614a96e9aad3
- Pending: HV-01..HV-06.

Next boundary:
1. Re-check PR #1–#5 state, review threads and CI; fix machine failures first.
2. Keep Human Validation asynchronous and SHA-bound.
3. Once Lab 004 is machine-green, build a Review Queue / spaced-practice surface from persisted completion, mastery and review metadata.
4. Then continue pattern coverage with Stack / Valid Parentheses or Prefix Sum, in a new stacked wave.

Constraints:
- Never infer Human Validation from CI.
- Mark packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve pure algorithm → trace → hook/player → visualizer.
- Keep progress/storage outside algorithm labs.
```
