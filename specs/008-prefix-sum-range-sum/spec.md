# Spec 008 — Prefix Sum / Range Sum Lab

## Intent

Add the first Prefix Sum lab to the study workspace while preserving the existing stacked delivery model, progress schema v1 and asynchronous Human Validation.

## Product slice

Lab 006 — Range Sum Query teaches the invariant:

> prefix[k] stores the sum of values strictly before index k, so an inclusive range [left, right] is prefix[right + 1] - prefix[left].

The learner can:

- enter an array of 1–12 finite numbers;
- choose inclusive left/right indices;
- watch prefix[0] start at zero;
- watch each cumulative prefix value be built from the previous prefix plus the current array value;
- see the two prefix boundaries used for a query;
- observe the final range sum;
- replay the deterministic trace with the shared player controls;
- distinguish O(n) preprocessing from O(1) query time and O(n) auxiliary space.

## Engineering requirements

- Keep Prefix Sum computation framework-independent and deterministic.
- Reuse `useAlgorithmPlayer` unchanged.
- Register Lab 006 in the existing catalog/progress/review-queue system.
- Existing persisted v1 progress without `range-sum` must hydrate safely with a default entry.
- Preserve Labs 001–005 and Review Queue behavior unchanged.
- Invalid array or range input must not replace the current valid trace.

## Acceptance

- `[2, -1, 3, 5, -2]` builds prefix `[0, 2, 1, 4, 9, 7]`.
- Query `left=1`, `right=3` returns `7` from `prefix[4] - prefix[1]`.
- A single-element query works without a special-case branch.
- Invalid bounds such as `left > right`, negative indices or `right >= n` are rejected.
- Catalog total becomes six labs and Lab 006 participates in selection, mastery, completion, reviews and Review Queue scheduling.
- Automated tests cover prefix construction, range subtraction, single-element range, invalid bounds and progress migration.
- A SHA-bound Human Validation packet and continuation prompt are produced after machine gates pass.

## Stack strategy

PR #8 is stacked on PR #7. Continue independently of parent merges and asynchronous Human Validation. Retarget after a parent merges and re-run relevant gates. Never infer Human Validation from CI.
