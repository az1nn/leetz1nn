# Human Validation — 002 Two Pointers + Async Validation

Status: `PENDING_HUMAN`

Target implementation SHA: `e08d050f466d0b38b4f4686481ce12b7d3452cea`
Branch: `feat/002-two-pointers-human-validation`
PR: #2, stacked on PR #1 / `feat/001-playground-foundation`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

These gates are independent from Human Validation.

- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run doctor`
- [ ] PR CI completed successfully

The boxes above must only be updated from actual command/CI evidence. A green automated gate does not change the Human Validation status.

## Prerequisites

1. Check out target SHA `e08d050f466d0b38b4f4686481ce12b7d3452cea`.
2. Install dependencies with `npm install`.
3. Start the web playground with `npm run web`.
4. Use a modern Chromium/Firefox/Safari browser.

## Required steps

### HV-01 — Foundation regression

**Action**

Open the playground and use Lab 001 — Two Sum with the default fixture `2, 7, 11, 15`, target `9`. Advance until completion using **Next**.

**Expected result**

- Lab 001 renders before Lab 002.
- The trace resolves indices `[0, 1]`.
- Hash-map state and highlighted pseudocode update as the trace advances.
- Previous, Next, Play/Pause and Reset remain usable.

**Evidence**

Record `PASS` or `FAIL`. On failure, attach one screenshot and the observed incorrect state.

**Result**: `PENDING`

### HV-02 — Default Two Pointers trace

**Action**

In Lab 002, keep the default heights `1, 8, 6, 2, 5, 4, 8, 3, 7`. Press **Build trace**, then use **Next** until the final step.

**Expected result**

- Both pointers are visible and move inward.
- Each step shows width, current area, best area and which pointer moves.
- The explanation states that the shorter wall is the limiting wall.
- Final maximum area is `49`.
- Final best pair is indices `1` and `8`.
- Complexity is shown as `O(n) time · O(1) space`.

**Evidence**

Capture one screenshot during a middle trace step and one at the final `49` result, or record equivalent written observations.

**Result**: `PENDING`

### HV-03 — Minimal valid fixture

**Action**

Replace heights with `1, 1`, press **Build trace**, and advance to completion.

**Expected result**

The final best area is `1` and the UI remains stable with only two bars.

**Evidence**

Record `PASS` or `FAIL`; screenshot only if failed.

**Result**: `PENDING`

### HV-04 — Invalid input guard

**Action**

Try each input separately:

- `1`
- `1, -2, 3`
- `1, nope, 3`

Press **Build trace** after each value.

**Expected result**

The lab rejects each fixture with `Use at least two comma-separated, non-negative heights.` and does not replace the currently valid visualization with invalid state.

**Evidence**

Record `PASS` or `FAIL`. On failure, copy the exact input and observed behavior.

**Result**: `PENDING`

### HV-05 — Responsive web behavior

**Action**

Validate Lab 002 at approximately `390px` viewport width and again at desktop width `>= 1280px`. At mobile width, scroll horizontally through the height bars and use all playback controls.

**Expected result**

- No text or controls overlap.
- Horizontal scrolling is confined to the visualization where needed.
- Playback controls remain reachable.
- Desktop layout places reasoning and implementation model without clipping.

**Evidence**

Capture one mobile-width screenshot and one desktop-width screenshot.

**Result**: `PENDING`

## Optional exploratory checks

- Run the same target SHA with Expo on Android and confirm touch controls work.
- Try duplicate maximum walls, zero-height walls and arrays longer than 20 items.
- Rapidly alternate Play/Pause/Next and confirm the player never advances beyond the last trace step.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

If any functional code changes after target SHA `e08d050f466d0b38b4f4686481ce12b7d3452cea`, mark this packet `SUPERSEDED` and generate a new packet against the new implementation SHA.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/002-two-pointers-human-validation
PR/stack: PR #2 is stacked on PR #1 (`feat/001-playground-foundation`). Continue independently of PR #1 merge. If PR #1 has merged, retarget PR #2 to master and re-run gates before further work.
Frozen implementation SHA: e08d050f466d0b38b4f4686481ce12b7d3452cea

Completed:
- React Native + Web algorithm playground foundation from PR #1.
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers with deterministic trace visualization.
- Pure algorithm → execution trace → useAlgorithmPlayer → visualizer architecture preserved.
- Vitest trace tests added for Two Sum and Container With Most Water.
- CI expanded to run tests, TypeScript and Expo Doctor.
- Reusable async Human Validation skill added at `.github/skills/async-human-validation/SKILL.md`.
- Spec 002 added.

Automated gates:
- Check the latest PR #2 CI before relying on any previous result.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/002-two-pointers-human-validation.md
- Target SHA: e08d050f466d0b38b4f4686481ce12b7d3452cea
- Pending items: HV-01 through HV-05 require explicit human evidence.

Next boundary:
1. Re-check PR #1/#2 state and CI.
2. If the frozen SHA has not changed, preserve this Human Validation packet; if functional code changed, mark it SUPERSEDED and regenerate.
3. Fix any automated or human-validation failures before adding a new algorithm.
4. After gates are clean, start the next independent wave for Sliding Window, preferably Longest Substring Without Repeating Characters, in a new stacked branch/PR with its own spec and validation packet.
5. Add progress persistence only after the third pattern lab establishes the navigation/progress model.

Constraints:
- Re-check branch, PR, review threads and CI state before making changes.
- Do not claim Human Validation passed without explicit human evidence.
- Do not merge unless the user explicitly requests it.
- Preserve algorithm purity; React/React Native remains the visualization layer.
- Keep new work pattern-first and learning-oriented rather than accumulating answer snippets.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
