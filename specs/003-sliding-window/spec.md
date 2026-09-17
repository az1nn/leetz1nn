# Spec 003 — Sliding Window Lab

## Intent

Continue leetz1nn while PR #2 Human Validation remains asynchronous. This wave is stacked on `feat/002-two-pointers-human-validation` and adds the third pattern lab without waiting for merges.

## Product slice

### Lab 003 — Longest Substring Without Repeating Characters

The learner can:

- edit the input string, including the empty-string edge case;
- build and replay a deterministic sliding-window trace;
- see `left` and `right` boundaries move through the string;
- inspect the active unique-character window;
- inspect the character → last-index map;
- see why `left` jumps past a duplicate that remains inside the current window;
- observe the best length and best substring;
- understand `O(n)` time and `O(k)` space.

## Invariant

At the end of every trace step, the active substring `s[left..right]` contains no repeated character. `left` never moves backward.

## Engineering requirements

- Keep the sliding-window algorithm framework-independent.
- Reuse `useAlgorithmPlayer` unchanged.
- Preserve Labs 001 and 002.
- Expand pure trace tests for canonical, duplicate-heavy and empty-string cases.
- Continue using the async Human Validation skill from `.github/skills/async-human-validation/SKILL.md`.

## Acceptance

- `abcabcbb` resolves to length `3`, first best substring `abc`.
- `bbbbb` resolves to length `1`.
- `abba` moves `left` to `2` when the second `b` is read.
- Empty string resolves to length `0` without UI failure.
- The new lab renders after the first two labs and shares their playback interaction model.
- This wave receives its own immutable Human Validation packet and continuation prompt.

## Stack strategy

- PR #1: playground foundation.
- PR #2: Two Pointers + Human Validation skill.
- PR #3: Sliding Window, based on PR #2 branch.
- Do not merge automatically. Retarget stacked PRs only after their parent PR merges and re-run gates.
