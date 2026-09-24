# Spec 004 — Study Navigation + Persistent Progress

## Intent

With three visual algorithm labs available, replace the growing single-page stack with a focused study workspace: one active lab, a navigable catalog and locally persisted learning state.

This wave is stacked on PR #3 and proceeds independently of pending merges and asynchronous Human Validation.

## Product behavior

- Show a catalog for Labs 001–003.
- Selecting a card makes that lab the only active visualizer.
- Persist the last selected lab.
- Persist per-lab mastery: `learning`, `practicing`, `mastered`.
- Persist explicit completion, review count and last-review timestamp.
- Show completed/total summary.
- Allow resetting local progress.
- Preserve every existing algorithm trace and playback interaction.

## Architecture

Progress is a separate feature boundary:

`pure progress transitions → StudyProgressProvider/hook → AsyncStorage adapter → catalog/workspace UI`

Algorithm labs do not import storage or progress logic.

Storage key: `leetz1nn.study-progress.v1`.

Use `@react-native-async-storage/async-storage@2.2.0`, the Expo-recommended version for the current SDK, supporting Android, iOS and Web.

## Acceptance

- Last selected lab survives reload/restart after storage hydration.
- Mastery, completion and review metadata survive reload/restart.
- Invalid/corrupt stored JSON falls back to defaults without blocking the app.
- A mastered lab is automatically considered completed.
- Reset returns all progress to defaults.
- Only the selected lab visualizer is rendered.
- Labs 001–003 remain behaviorally unchanged.
- Pure progress transitions have automated tests.
- Human Validation receives a new immutable target and continuation prompt.

## Stack strategy

- PR #1: foundation.
- PR #2: Two Pointers + async Human Validation skill.
- PR #3: Sliding Window.
- PR #4: this navigation/progress wave, based on PR #3.
- Do not merge automatically; retarget only after parent merge and re-run gates.
