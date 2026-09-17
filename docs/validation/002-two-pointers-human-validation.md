# Human Validation — 002 Two Pointers + Async Validation

Status: `PENDING_HUMAN`

Target implementation SHA: `26ebb296e42f1deabbb8d7c7f7557450d2624fc7`
Branch: `feat/002-two-pointers-human-validation`
PR: #2, stacked on PR #1 / `feat/001-playground-foundation`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run doctor`
- [ ] PR CI completed successfully

Known CI history:

- Attempt 1 failed before install because npm caching was configured without a lockfile.
- Attempt 2 exposed an unpinned React DOM conflict against React 19.2.3.
- Attempt 3 installed successfully and passed Vitest + TypeScript, then Expo Doctor identified five SDK-version mismatches.
- Target `26ebb29` aligns those packages with Expo Doctor: TypeScript `~6.0.3`, Safe Area `~5.7.0`, React types `~19.2.4`, React Native Web `^0.21.2`, and Worklets `0.10.1`.

Do not convert an automated result into Human Validation evidence.

## Prerequisites

1. Check out `26ebb296e42f1deabbb8d7c7f7557450d2624fc7`.
2. Run `npm install`.
3. Run `npm run web`.
4. Open the playground in a modern browser.

## Required steps

### HV-01 — Foundation regression

**Action:** Run Lab 001 with `2, 7, 11, 15`, target `9`, and advance to completion.

**Expected:** Pair `[0, 1]`, hash-map state and pseudocode highlighting update correctly, and all playback controls work.

**Evidence:** `PASS`/`FAIL`; screenshot only on failure.

**Result:** `PENDING`

### HV-02 — Default Two Pointers trace

**Action:** In Lab 002 use `1, 8, 6, 2, 5, 4, 8, 3, 7`, press **Build trace**, and advance to the final step.

**Expected:** Pointers move inward, the shorter wall is identified as limiting, final maximum area is `49`, best pair is `[1, 8]`, and complexity shows `O(n) time · O(1) space`.

**Evidence:** One middle-step and one final-state screenshot, or equivalent written observations.

**Result:** `PENDING`

### HV-03 — Minimal valid fixture

**Action:** Use `1, 1`.

**Expected:** Final best area `1`; UI remains stable with two bars.

**Evidence:** `PASS`/`FAIL`.

**Result:** `PENDING`

### HV-04 — Invalid input guard

**Action:** Test `1`, `1, -2, 3`, and `1, nope, 3` separately.

**Expected:** Each is rejected with `Use at least two comma-separated, non-negative heights.` and the previous valid visualization remains intact.

**Evidence:** Exact failing input and observation if any case fails.

**Result:** `PENDING`

### HV-05 — Responsive web behavior

**Action:** Validate Lab 002 at approximately `390px` and at `>= 1280px`; at mobile width scroll the height visualization and use every playback control.

**Expected:** No overlap or clipping; controls remain reachable; horizontal scrolling stays inside the visualization; desktop implementation panel remains readable.

**Evidence:** One mobile-width and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Expo Android touch controls.
- Zero-height walls, duplicate maxima, arrays longer than 20 values.
- Rapid Play/Pause/Next transitions near the final step.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

Previous targets are `SUPERSEDED`. Any functional change after `26ebb296e42f1deabbb8d7c7f7557450d2624fc7` requires a new target.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/002-two-pointers-human-validation
PR/stack: PR #2 is stacked on PR #1. PR #3 is stacked on PR #2. Continue independently of pending merges. If a parent merges, retarget the child PR and re-run gates.
Frozen implementation SHA: 26ebb296e42f1deabbb8d7c7f7557450d2624fc7

Completed:
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers.
- Pure trace tests and quality workflow.
- Async Human Validation skill at `.github/skills/async-human-validation/SKILL.md`.
- Expo Web runtime dependencies aligned for SDK 57.
- Expo Doctor version mismatches aligned in package.json.
- Spec 002 and Human Validation packet.

Automated gates:
- Re-check latest PR #2 CI for target 26ebb29 and later doc-only commits.
- Prior run already proved npm install, Vitest and TypeScript pass before the package-alignment change; Doctor was the remaining failing step.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/002-two-pointers-human-validation.md
- Target: 26ebb296e42f1deabbb8d7c7f7557450d2624fc7
- Pending: HV-01 through HV-05.

Next boundary:
1. Re-check PR #1/#2/#3 state, reviews and CI; fix machine-gate failures first.
2. Keep Human Validation asynchronous and immutable by SHA.
3. After three labs are machine-green, add catalog/navigation and local progress persistence in a new stacked branch.
4. Then add Lab 004 — Binary Search.

Constraints:
- Never claim Human Validation passed without explicit human evidence.
- Mark validation packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep React Native + Web, hooks-first patterns and NativeWind styling.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
