# Spec 005 — Binary Search Lab

## Intent

Add the first logarithmic algorithm lab to the study workspace without waiting for parent merges or asynchronous Human Validation.

## Product slice

Lab 004 — Binary Search teaches the invariant:

> If the target exists, it remains inside the inclusive search interval `[left, right]`.

The learner can:

- edit a sorted numeric array and target;
- reject unsorted or invalid fixtures before changing the active trace;
- visualize `left`, `mid`, `right` and the current candidate interval;
- watch discarded halves fade out;
- inspect the comparison and elimination decision;
- replay with the shared player controls;
- observe `O(log n)` time and `O(1)` space.

## Engineering requirements

- Binary Search stays framework-independent and emits a deterministic trace.
- Reuse `useAlgorithmPlayer` unchanged.
- Register Lab 004 in the existing catalog/progress system.
- Existing persisted v1 progress without `binary-search` must hydrate safely with a default Lab 004 progress entry.
- Preserve Labs 001–003 unchanged.

## Acceptance

- `[-1,0,3,5,9,12]`, target `9` returns index `4`.
- Same array, target `2` terminates with `not-found` and empty range.
- Unsorted UI input is rejected.
- Progress migration keeps old lab state while adding Lab 004 defaults.
- Catalog total becomes four labs and Binary Search can persist selection/mastery/reviews.
- Automated tests cover found, not-found and progress migration behavior.
- A SHA-bound Human Validation packet and continuation prompt are produced.

## Stack strategy

PR #5 is stacked on PR #4. Continue independently of parent merges; never merge automatically. Retarget after a parent merges and re-run gates.
