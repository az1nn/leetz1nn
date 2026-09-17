# Human Validation — 004 Study Navigation + Persistent Progress

Status: `PENDING_HUMAN`

Target implementation SHA: `23b9f8f381687088f3f95a2bc24bab5e353fdfdd`
Branch: `feat/004-study-navigation-progress`
PR: #4, stacked on PR #3 / `feat/003-sliding-window`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [ ] algorithm trace tests
- [ ] progress-domain tests
- [ ] TypeScript
- [ ] Expo Doctor
- [ ] PR CI completed successfully

Update these only from actual CI evidence. Never infer a Human Validation pass from automated gates.

## Prerequisites

1. Check out `23b9f8f381687088f3f95a2bc24bab5e353fdfdd`.
2. Run `npm install`.
3. Start with `npm run web`.
4. Use a modern browser with local storage enabled.

## Required steps

### HV-01 — Catalog focus

**Action:** Open the workspace. Select Lab 001, then Lab 002, then Lab 003 from the catalog.

**Expected:** Exactly one algorithm visualizer is rendered at a time. The selected card is visually active and the current-study-state panel follows the selected lab. Existing playback state from another unmounted lab must not remain visible.

**Evidence:** `PASS`/`FAIL`; on failure capture the catalog plus the incorrectly rendered lab area.

**Result:** `PENDING`

### HV-02 — Last lab persistence

**Action:** Select Lab 003, reload the page completely, and allow local progress to hydrate.

**Expected:** Lab 003 is restored as the selected lab after reload and the header changes from `loading local progress` to `synced locally`.

**Evidence:** Record selected lab before and after reload; screenshot on failure.

**Result:** `PENDING`

### HV-03 — Mastery and completion persistence

**Action:** On Lab 002, press the mastery action until `mastered`, reload, then verify its catalog/status state. Next use **Reopen lab** and reload again.

**Expected:** Reaching `mastered` automatically marks the lab completed. That state survives reload. Reopening clears explicit completion without corrupting the mastery value and also survives reload.

**Evidence:** Record mastery/completion before and after each reload.

**Result:** `PENDING`

### HV-04 — Review history

**Action:** On Lab 001 press **Log review** twice, note the review count and last-review timestamp, then reload.

**Expected:** Review count increases by two, a last-review timestamp appears, and both values survive reload.

**Evidence:** Record count before, after, and after reload.

**Result:** `PENDING`

### HV-05 — Reset progress

**Action:** Ensure at least one lab is completed and another has reviews. Press **Reset progress**, then reload.

**Expected:** The workspace returns to Lab 001, all labs return to `learning`, completion count is `0/3`, review counts are zero, and reset state survives reload.

**Evidence:** One screenshot before reset and one after reload.

**Result:** `PENDING`

### HV-06 — Responsive catalog/workspace

**Action:** Validate at approximately `390px` width and again at `>= 1280px`. Scroll horizontally through the catalog, switch labs, and use the study-state actions.

**Expected:** Catalog scrolling remains horizontal and local; study-state actions stay reachable; no card/header/visualizer overlap occurs; desktop layout remains readable.

**Evidence:** One mobile-width and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Repeat HV-02/HV-03 on Expo Android or iOS.
- Deny or clear browser storage and confirm the app still starts with in-memory defaults.
- Rapidly switch among labs while changing mastery and logging reviews.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

Any functional change after `23b9f8f381687088f3f95a2bc24bab5e353fdfdd` requires this packet to be marked `SUPERSEDED` and regenerated against a new immutable target.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/004-study-navigation-progress
PR/stack: PR #4 is stacked on PR #3, which is stacked on PR #2, which is stacked on PR #1. Continue independently of pending merges and Human Validation. If a parent PR merges, retarget each affected child PR to the correct base and re-run gates.
Frozen implementation SHA: 23b9f8f381687088f3f95a2bc24bab5e353fdfdd

Completed:
- Lab 001: Two Sum / Arrays & Hashing.
- Lab 002: Container With Most Water / Two Pointers.
- Lab 003: Longest Substring Without Repeating Characters / Sliding Window.
- Async Human Validation skill and per-wave validation packets.
- Expo SDK 57 Web/dependency baseline alignment inherited from parent stack.
- Study catalog with one active visualizer at a time.
- AsyncStorage-backed progress persistence across React Native and Web.
- Persisted last lab, mastery, completion, review count and review timestamp.
- Pure progress-domain transitions and tests.
- Spec 004 and Human Validation packet.

Automated gates:
- Re-check PR #2, #3 and #4 CI before relying on prior results.
- Fix any machine-gate failure before expanding the platform.
- Do not infer Human Validation from CI.

Human Validation:
- PR #2 packet: docs/validation/002-two-pointers-human-validation.md — PENDING_HUMAN.
- PR #3 packet: docs/validation/003-sliding-window.md — PENDING_HUMAN.
- PR #4 packet: docs/validation/004-study-navigation-progress.md — PENDING_HUMAN.
- PR #4 target: 23b9f8f381687088f3f95a2bc24bab5e353fdfdd.
- HV-01 through HV-06 require explicit human evidence.

Next boundary:
1. Re-check PR #1–#4 state, review threads and CI; repair machine failures first.
2. Keep Human Validation asynchronous and immutable by SHA.
3. Add Lab 004 — Binary Search — as a new stacked wave using the existing catalog/progress architecture.
4. Visualize a monotonic search invariant and use Binary Search as the first lab that exercises logarithmic state reduction.
5. After Lab 004, introduce a review queue/spaced-practice surface driven by the persisted review metadata.

Constraints:
- Never claim Human Validation passed without explicit human evidence.
- Mark validation packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep progress/storage concerns outside algorithm labs.
- Keep React Native + Web, hooks-first patterns and NativeWind styling.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
