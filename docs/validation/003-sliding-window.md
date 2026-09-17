# Human Validation — 003 Sliding Window

Status: `PENDING_HUMAN`

Target implementation SHA: `efff175006be9bdd35380151b55779a528d6c68f`
Branch: `feat/003-sliding-window`
PR: #3, stacked on PR #2 / `feat/002-two-pointers-human-validation`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run doctor`
- [ ] PR CI completed successfully

This target contains the Sliding Window lab and the Expo SDK 57 package matrix aligned from Doctor feedback. Update these boxes only from actual CI/command evidence.

## Prerequisites

1. Check out `efff175006be9bdd35380151b55779a528d6c68f`.
2. Run `npm install`.
3. Run `npm run web`.
4. Open the playground in a modern browser.

## Required steps

### HV-01 — Previous labs regression

**Action:** Confirm Lab 001 and Lab 002 render before Lab 003 and execute at least one **Next** step in each.

**Expected:** Both previous labs remain interactive and their state is isolated from Lab 003.

**Evidence:** `PASS`/`FAIL`; screenshot only on failure.

**Result:** `PENDING`

### HV-02 — Canonical sliding-window trace

**Action:** Use `abcabcbb`, press **Build trace**, and advance to the end.

**Expected:** The right pointer expands one character at a time; the active window remains unique; the second `a` moves `left` past the previous `a`; final best length is `3`; first best substring is `abc`; complexity shows `O(n) time · O(k) space`.

**Evidence:** One screenshot before the first duplicate and one after the left-pointer jump, or equivalent written observations.

**Result:** `PENDING`

### HV-03 — Duplicate-heavy input

**Action:** Use `bbbbb` and advance to completion.

**Expected:** Every new `b` moves `left` forward so the active window contains one `b`; final best length is `1`.

**Evidence:** `PASS`/`FAIL`.

**Result:** `PENDING`

### HV-04 — Non-trivial duplicate boundary

**Action:** Use `abba` and advance until the second `b` at index `2` is processed.

**Expected:** `left` jumps from `0` to `2`, then never moves backward.

**Evidence:** Record displayed `left`, `right`, and active window at index `2`.

**Result:** `PENDING`

### HV-05 — Empty input edge case

**Action:** Clear the string, press **Build trace**, then try playback controls.

**Expected:** `Empty string → answer 0`; stable terminal state; best length `0`; no invalid index UI.

**Evidence:** `PASS`/`FAIL`.

**Result:** `PENDING`

### HV-06 — Responsive layout

**Action:** At approximately `390px`, test `pwwkew`, scroll through the character row, and use playback. Repeat at desktop width `>= 1280px`.

**Expected:** Character boxes remain readable; scrolling stays local to the row; last-seen chips wrap cleanly; desktop implementation panel is not clipped.

**Evidence:** One mobile-width and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Unicode/emoji input; note UTF-16 behavior without making it a Spec 003 requirement.
- Spaces (`a b a`) and the visible `␠` marker.
- Rapid Play/Pause/Next/Previous near completion.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

Previous targets are `SUPERSEDED`. Any functional change after `efff175006be9bdd35380151b55779a528d6c68f` requires a new target.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/003-sliding-window
PR/stack: PR #3 is stacked on PR #2, which is stacked on PR #1. Continue independently of pending merges and Human Validation. If a parent PR merges, retarget the child PR and re-run gates.
Frozen implementation SHA: efff175006be9bdd35380151b55779a528d6c68f

Completed:
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers.
- Async Human Validation skill at `.github/skills/async-human-validation/SKILL.md`.
- Expo Web and Expo Doctor dependency baseline aligned for SDK 57.
- Lab 003: Longest Substring Without Repeating Characters / Sliding Window.
- Sliding Window visualization includes active window, last-seen map, duplicate-triggered `left` jumps, best window and complexity.
- Pure trace tests cover `abcabcbb`, `bbbbb`, `abba`, and empty input.
- Spec 003 and this Human Validation packet.

Automated gates:
- Re-check latest PR #2 and PR #3 CI before relying on results.
- Do not infer Human Validation from CI.

Human Validation:
- PR #2 packet: docs/validation/002-two-pointers-human-validation.md — PENDING_HUMAN.
- PR #3 packet: docs/validation/003-sliding-window.md — PENDING_HUMAN.
- PR #3 target: efff175006be9bdd35380151b55779a528d6c68f.
- HV-01 through HV-06 require explicit human evidence.

Next boundary:
1. Re-check PR #1/#2/#3 state, review threads and CI; repair machine-gate failures first.
2. Keep Human Validation asynchronous and immutable by target SHA.
3. With three pattern labs established, create catalog/lab navigation instead of one long page.
4. Add local progress persistence for completed labs, last visited lab, mastery and review state through a React Native/Web storage abstraction.
5. Then add Lab 004 — Binary Search — in a new stacked branch/PR.

Constraints:
- Never claim Human Validation passed without explicit human evidence.
- Mark a packet SUPERSEDED after functional changes and regenerate it.
- Do not merge unless explicitly requested.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep React Native + Web, hooks-first patterns and NativeWind styling.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
