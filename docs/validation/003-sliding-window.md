# Human Validation — 003 Sliding Window

Status: `PENDING_HUMAN`

Target implementation SHA: `a1c03e262dd5f53b09242bdd489f82cec5b0f057`
Branch: `feat/003-sliding-window`
PR: #3, stacked on PR #2 / `feat/002-two-pointers-human-validation`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

These gates are independent from Human Validation.

- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run doctor`
- [ ] PR CI completed successfully

Update these boxes only from actual CI/command evidence. Never infer Human Validation from automated results.

## Prerequisites

1. Check out target SHA `a1c03e262dd5f53b09242bdd489f82cec5b0f057`.
2. Install dependencies with `npm install`.
3. Start the web app with `npm run web`.
4. Open the playground in a modern browser.

## Required steps

### HV-01 — Previous labs regression

**Action**

Confirm Lab 001 (Two Sum) and Lab 002 (Container With Most Water) render before Lab 003. Execute at least one Next step in each older lab.

**Expected result**

Both previous labs remain interactive and their state changes do not affect Lab 003.

**Evidence**

Record `PASS` or `FAIL`. Capture a screenshot only on failure.

**Result**: `PENDING`

### HV-02 — Canonical sliding-window trace

**Action**

In Lab 003 use the default string `abcabcbb`. Press **Build trace** and advance to the end.

**Expected result**

- The right pointer expands one character at a time.
- The active window contains unique characters after every step.
- When the second `a` is read, `left` moves past the previous `a`.
- The final best length is `3`.
- The first best substring is `abc`.
- Complexity is shown as `O(n) time · O(k) space`.

**Evidence**

Capture one screenshot before the first duplicate and one after the left-pointer jump, or record equivalent written observations.

**Result**: `PENDING`

### HV-03 — Duplicate-heavy input

**Action**

Set the string to `bbbbb`, press **Build trace**, and advance to completion.

**Expected result**

- Every new `b` moves `left` forward so the active window contains one `b`.
- Final best length is `1`.
- Playback controls remain consistent through repeated shrink decisions.

**Evidence**

Record `PASS` or `FAIL`; screenshot only on failure.

**Result**: `PENDING`

### HV-04 — Non-trivial duplicate boundary

**Action**

Set the string to `abba`. Advance until the second `b` at index `2` is processed.

**Expected result**

`left` jumps from `0` to `2`; it must not move only one position and it must never move backward later in the trace.

**Evidence**

Record the displayed `left`, `right`, and active window at index `2`.

**Result**: `PENDING`

### HV-05 — Empty input edge case

**Action**

Clear the string completely, press **Build trace**, then use the playback controls.

**Expected result**

- The lab displays `Empty string → answer 0`.
- The trace has a stable terminal state rather than crashing or rendering invalid indices.
- Best length is `0`.

**Evidence**

Record `PASS` or `FAIL`.

**Result**: `PENDING`

### HV-06 — Responsive layout

**Action**

At approximately `390px` viewport width, test `pwwkew` and scroll through the character row. Repeat at desktop width `>= 1280px`.

**Expected result**

- Character boxes remain readable.
- Horizontal scrolling does not push playback controls off-screen.
- The last-seen map wraps without overlapping other content.
- Desktop view does not clip the implementation model.

**Evidence**

Capture one mobile-width and one desktop-width screenshot.

**Result**: `PENDING`

## Optional exploratory checks

- Validate Unicode/emoji input and note that JavaScript string indexing may expose UTF-16 code-unit behavior; do not mark this required for Spec 003.
- Try spaces (`a b a`) and confirm the visible `␠` marker for space characters.
- Rapidly switch Play/Pause/Next/Previous near the final step.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

If functional code changes after target SHA `a1c03e262dd5f53b09242bdd489f82cec5b0f057`, mark this packet `SUPERSEDED` and generate a new one.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/003-sliding-window
PR/stack: PR #3 is stacked on PR #2, which is stacked on PR #1. Continue independently of pending merges and Human Validation. If any parent PR has merged, retarget the child PR to the correct new base and re-run gates before changing code.
Frozen implementation SHA: a1c03e262dd5f53b09242bdd489f82cec5b0f057

Completed:
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers.
- Async Human Validation skill at `.github/skills/async-human-validation/SKILL.md`.
- Lab 003: Longest Substring Without Repeating Characters / Sliding Window.
- Lab 003 visualizes active window, last-seen map, duplicate-triggered left jumps, best window and complexity.
- Pure trace tests cover canonical, duplicate-heavy, non-trivial duplicate boundary and empty-string cases.
- Spec 003 added.

Automated gates:
- Re-check PR #2 and PR #3 CI before relying on prior results.
- PR #2 previously had a setup-node cache failure that was corrected in commit `96dd6d9`.
- Do not infer Human Validation from CI.

Human Validation:
- PR #2 packet: docs/validation/002-two-pointers-human-validation.md — PENDING_HUMAN.
- PR #3 packet: docs/validation/003-sliding-window.md — PENDING_HUMAN.
- PR #3 target SHA: a1c03e262dd5f53b09242bdd489f82cec5b0f057.
- HV-01 through HV-06 require explicit human evidence.

Next boundary:
1. Re-check PR #1/#2/#3 state, reviews and CI; fix any machine-gate failure first.
2. Keep Human Validation asynchronous and preserve immutable validation targets.
3. With three pattern labs established, introduce lab navigation/catalog selection instead of rendering every lab in one long page.
4. Add local progress persistence: completed labs, last visited lab and mastery/review state, using a hook/storage abstraction that works on React Native and Web.
5. After navigation/progress foundation, add Binary Search as Lab 004 in a new stacked branch/PR.

Constraints:
- Do not claim Human Validation passed without explicit human evidence.
- If functional code changes past a frozen validation SHA, mark its packet SUPERSEDED and regenerate it.
- Do not merge unless the user explicitly requests it.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep React Native + Web, hooks-first architecture and NativeWind styling.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
