# Human Validation — 003 Sliding Window

Status: `PENDING_HUMAN`
Target implementation SHA: `d0bf507cab4bb1d36b5efa8bf05fb126f02414a6`
Branch: `feat/003-sliding-window`
PR: #3, stacked on PR #2
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] `npm install`
- [x] `npm test` — algorithm trace suite passed
- [x] `npm run typecheck`
- [x] `npm run doctor`
- [x] quality run #24 completed successfully

This target includes Sliding Window plus the green Expo SDK 57 / TypeScript 6 baseline. CI success is not Human Validation.

## Prerequisites

1. Check out `d0bf507cab4bb1d36b5efa8bf05fb126f02414a6`.
2. Run `npm install` and `npm run web`.
3. Open the playground in a modern browser.

## Required steps

### HV-01 — Previous labs regression
**Action:** Exercise at least one **Next** step in Labs 001 and 002 before opening Lab 003.
**Expected:** Both older labs remain interactive and isolated from Lab 003.
**Evidence:** `PASS`/`FAIL`; screenshot on failure.
**Result:** `PENDING`

### HV-02 — Canonical window
**Action:** Run `abcabcbb` to completion.
**Expected:** Active window stays unique; duplicate `a` moves `left` past its prior index; final best length `3`, first best substring `abc`, `O(n)` time / `O(k)` space.
**Evidence:** Screenshot before first duplicate and after the left-pointer jump, or equivalent observations.
**Result:** `PENDING`

### HV-03 — Duplicate-heavy input
**Action:** Run `bbbbb`.
**Expected:** Each new `b` advances `left`; final best length `1`.
**Evidence:** `PASS`/`FAIL`.
**Result:** `PENDING`

### HV-04 — Boundary duplicate
**Action:** Run `abba` until index `2`.
**Expected:** `left` jumps from `0` to `2` and never moves backward.
**Evidence:** Record displayed `left`, `right`, and active window.
**Result:** `PENDING`

### HV-05 — Empty string
**Action:** Clear the input and build the trace.
**Expected:** Stable terminal state, answer `0`, no invalid-index UI.
**Evidence:** `PASS`/`FAIL`.
**Result:** `PENDING`

### HV-06 — Responsive layout
**Action:** Test `pwwkew` around `390px` and at `>= 1280px`.
**Expected:** Character row scrolls locally, last-seen chips wrap, controls remain reachable, implementation panel is not clipped.
**Evidence:** One mobile and one desktop screenshot.
**Result:** `PENDING`

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Earlier targets are `SUPERSEDED`. Any functional change after `d0bf507cab4bb1d36b5efa8bf05fb126f02414a6` requires regeneration.

## Continuation Prompt

```text
Continue work on leetz1nn.
Repository: az1nn/leetz1nn
Branch: feat/003-sliding-window
PR/stack: PR #3 on PR #2 on PR #1; PR #4 is already stacked above PR #3. Continue independently of merges; retarget children after parent merges and re-run gates.
Frozen implementation SHA: d0bf507cab4bb1d36b5efa8bf05fb126f02414a6

Completed:
- Labs 001–003: Arrays & Hashing, Two Pointers, Sliding Window.
- Async Human Validation skill and validation packets.
- Expo SDK 57 / TypeScript 6 compatibility baseline.
- Quality run #24 green: install, tests, typecheck, Expo Doctor.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/003-sliding-window.md
- Pending: HV-01..HV-06.

Next boundary:
1. Re-check PR #1–#4 state, reviews and CI.
2. Continue from PR #4 study-navigation/progress when machine-green.
3. Keep Human Validation asynchronous and SHA-bound.

Constraints:
- Never infer Human Validation from CI.
- Mark packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve pure algorithm → trace → hook/player → visualizer.
```
