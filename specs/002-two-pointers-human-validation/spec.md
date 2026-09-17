# Spec 002 — Two Pointers + Async Human Validation

## Intent

Extend leetz1nn without waiting for PR #1 to merge. The work is stacked on the foundation branch and adds a second interactive algorithm lab plus a reusable asynchronous Human Validation protocol.

## Product slice

### Lab 002 — Container With Most Water

The learner can:

- edit the height array;
- build a deterministic execution trace;
- see left/right pointers and wall heights;
- inspect current width, area, best area and pointer movement;
- use Play, Pause, Previous, Next and Reset;
- see the O(n) time / O(1) space implementation model;
- understand the invariant: only moving the shorter limiting wall can potentially improve the area.

## Engineering requirements

- Algorithm logic remains framework-independent.
- UI consumes an immutable trace through `useAlgorithmPlayer`.
- Existing Two Sum behavior remains intact.
- Pure trace behavior is covered by automated tests.
- CI runs tests, TypeScript validation and Expo Doctor.

## Human Validation protocol

Add `.github/skills/async-human-validation/SKILL.md` defining:

- immutable SHA targeting;
- `PENDING_HUMAN`, `PASSED`, `FAILED`, `BLOCKED`, `SUPERSEDED` states;
- deterministic Action / Expected / Evidence steps;
- separation between automated and human gates;
- a reusable continuation prompt at every handoff.

The current implementation must ship with its own packet under `docs/validation/`.

## Acceptance

- Default Container With Most Water fixture resolves to area `49` using indices `[1, 8]`.
- `[1, 1]` resolves to area `1`.
- Invalid or negative input is rejected by the UI.
- The second lab is usable on web and React Native layouts without changing the pure algorithm layer.
- Automated trace tests run in CI.
- Human Validation is never implicitly marked passed.
- A continuation prompt can restart the work without relying on chat history.

## Stack strategy

- Base implementation: `feat/001-playground-foundation` / PR #1.
- This wave: `feat/002-two-pointers-human-validation`.
- Open a stacked PR against the foundation branch so work proceeds independently of PR #1 merge.
- After PR #1 merges, retarget this PR to `master` and re-run gates; do not silently merge.
