# Human Validation — 004 Study Navigation + Persistent Progress

Status: `PENDING_HUMAN`
Target implementation SHA: `2de4070c242f78d4fe709076f8c7bbed398c7db5`
Branch: `feat/004-study-navigation-progress`
PR: #4, stacked on PR #3
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] `npm install`
- [x] algorithm trace tests
- [x] progress-domain tests
- [x] TypeScript
- [x] Expo Doctor
- [x] quality run #25 completed successfully

This target contains the study workspace, AsyncStorage progress layer and the green Expo SDK 57 / TypeScript 6 baseline. CI success is not Human Validation.

## Prerequisites

1. Check out `2de4070c242f78d4fe709076f8c7bbed398c7db5`.
2. Run `npm install` and `npm run web`.
3. Use a modern browser with local storage enabled.

## Required steps

### HV-01 — Catalog focus
**Action:** Select Lab 001, Lab 002, then Lab 003.
**Expected:** Exactly one visualizer is rendered; selected card and current-study panel follow selection.
**Evidence:** `PASS`/`FAIL`; screenshot on failure.
**Result:** `PENDING`

### HV-02 — Last lab persistence
**Action:** Select Lab 003, fully reload, allow hydration.
**Expected:** Lab 003 is restored and status changes from loading to locally synced.
**Evidence:** Record selected lab before/after reload.
**Result:** `PENDING`

### HV-03 — Mastery and completion
**Action:** Set Lab 002 to `mastered`, reload, then **Reopen lab** and reload again.
**Expected:** Mastered auto-completes; state persists; reopening clears completion without corrupting mastery.
**Evidence:** Record mastery/completion before and after reloads.
**Result:** `PENDING`

### HV-04 — Review history
**Action:** Log two reviews for Lab 001, note count/timestamp, reload.
**Expected:** Count and timestamp persist.
**Evidence:** Record before, after, and after reload.
**Result:** `PENDING`

### HV-05 — Reset progress
**Action:** With non-default progress, press **Reset progress**, reload.
**Expected:** Lab 001 selected, all mastery `learning`, `0/3` completed, zero reviews; reset persists.
**Evidence:** Screenshot before reset and after reload.
**Result:** `PENDING`

### HV-06 — Responsive workspace
**Action:** Validate around `390px` and `>= 1280px`, including catalog scrolling and study-state actions.
**Expected:** No overlap/clipping; catalog scrolling stays local; actions remain reachable.
**Evidence:** One mobile and one desktop screenshot.
**Result:** `PENDING`

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Earlier targets are `SUPERSEDED`. Any functional change after `2de4070c242f78d4fe709076f8c7bbed398c7db5` requires regeneration.

## Continuation Prompt

```text
Continue work on leetz1nn.
Repository: az1nn/leetz1nn
Branch: feat/004-study-navigation-progress
PR/stack: PR #4 on PR #3 on PR #2 on PR #1. Continue independently of pending merges; retarget child PRs after parent merges and re-run gates.
Frozen implementation SHA: 2de4070c242f78d4fe709076f8c7bbed398c7db5

Completed:
- Labs 001–003: Arrays & Hashing, Two Pointers, Sliding Window.
- Async Human Validation skill and per-wave packets.
- Expo SDK 57 / TypeScript 6 compatibility baseline.
- Catalog with one active lab at a time.
- AsyncStorage-backed last lab, mastery, completion and review metadata.
- Progress-domain tests.
- Quality run #25 green: install, all tests, typecheck, Expo Doctor.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/004-study-navigation-progress.md
- Target: 2de4070c242f78d4fe709076f8c7bbed398c7db5
- Pending: HV-01..HV-06.

Next boundary:
1. Re-check PR #1–#4 state, reviews and CI.
2. Keep Human Validation asynchronous and SHA-bound.
3. Add Lab 004 — Binary Search in a new stacked branch/PR using the catalog/progress architecture.
4. After Binary Search, add a spaced-review queue driven by persisted review metadata.

Constraints:
- Never infer Human Validation from CI.
- Mark packets SUPERSEDED after functional changes.
- Do not merge unless explicitly requested.
- Preserve pure algorithm → trace → hook/player → visualizer.
- Keep storage/progress outside algorithm labs.
```
