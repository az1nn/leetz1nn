# Human Validation — 002 Two Pointers + Async Validation

Status: `PENDING_HUMAN`

Target implementation SHA: `ab5e8e8d9d5ef05e7d050878c8793e263879034a`
Branch: `feat/002-two-pointers-human-validation`
PR: #2, stacked on PR #1 / `feat/001-playground-foundation`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

These gates are independent from Human Validation.

- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run doctor`
- [ ] PR CI completed successfully

Known CI history:

- Attempt 1 failed in `Setup Node` because npm caching required a lockfile that did not exist.
- Attempt 2 reached `npm install` and exposed a real Expo Web dependency conflict: unpinned `react-dom` resolved to `19.3.0` while Expo SDK 57 uses React `19.2.3`.
- Target `ab5e8e8` pins `react-dom` to `19.2.3`, adds SDK-57 `@expo/metro-runtime`, and imports the runtime from `App.tsx`.

Do not convert any automated result into Human Validation evidence.

## Prerequisites

1. Check out target SHA `ab5e8e8d9d5ef05e7d050878c8793e263879034a`.
2. Install dependencies with `npm install`.
3. Start the web playground with `npm run web`.
4. Use a modern Chromium/Firefox/Safari browser.

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

**Expected:** Each is rejected with `Use at least two comma-separated, non-negative heights.` and the previously valid visualization remains intact.

**Evidence:** Exact failing input and observation if any case fails.

**Result:** `PENDING`

### HV-05 — Responsive web behavior

**Action:** Validate Lab 002 at approximately `390px` and at `>= 1280px`. At mobile width, scroll the height visualization and use every playback control.

**Expected:** No overlap/clipping; controls remain reachable; horizontal scrolling stays inside the visualization; desktop implementation panel remains readable.

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

Previous targets `e08d050` and `96dd6d9` are superseded. If functional code changes after `ab5e8e8`, mark this packet `SUPERSEDED` and regenerate it.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/002-two-pointers-human-validation
PR/stack: PR #2 is stacked on PR #1. PR #3 (Sliding Window) is already stacked on PR #2 and may continue independently. If a parent PR has merged, retarget the child PR to the correct base and re-run all gates.
Frozen implementation SHA: ab5e8e8d9d5ef05e7d050878c8793e263879034a

Completed:
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers.
- Vitest trace tests and CI test/typecheck/Expo Doctor gate.
- Async Human Validation skill at `.github/skills/async-human-validation/SKILL.md`.
- Expo Web dependency correction: `react-dom@19.2.3` + `@expo/metro-runtime` for SDK 57.
- Spec 002 and this validation packet.

Automated gates:
- Re-check latest PR #2 CI; prior attempts exposed and drove fixes for cache configuration and React DOM resolution.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/002-two-pointers-human-validation.md
- Target SHA: ab5e8e8d9d5ef05e7d050878c8793e263879034a
- Pending: HV-01 through HV-05.

Next boundary:
1. Re-check PR #1/#2/#3 state, reviews and CI.
2. Fix machine-gate failures before expanding infrastructure further.
3. Keep Human Validation asynchronous; do not block safe work solely because manual evidence is pending.
4. Ensure PR #3 incorporates the corrected Expo Web dependency baseline and regenerate its validation target if necessary.
5. After three labs are stable, add catalog/navigation and local progress persistence before Lab 004 (Binary Search).

Constraints:
- Never claim Human Validation passed without explicit human evidence.
- Mark validation packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep React Native + Web, hooks-first patterns and NativeWind styling.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
