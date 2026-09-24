# Spec 007 — Stack / Valid Parentheses Lab

## Intent

Add the first Stack-pattern lab to the study workspace while preserving the existing stacked delivery model and asynchronous Human Validation.

## Product slice

Lab 005 — Valid Parentheses teaches the invariant:

> The next closing bracket must match the most recent unmatched opening bracket.

The learner can:

- enter a non-empty sequence made only of `()[]{}`;
- watch the input cursor advance;
- see openings pushed onto a LIFO stack;
- see matching closings pop the stack;
- fail immediately when a closing bracket does not match the current stack top;
- observe the final valid/invalid verdict;
- replay the deterministic trace with the shared player controls;
- observe `O(n)` time and `O(n)` worst-case space.

## Engineering requirements

- Keep Valid Parentheses framework-independent and deterministic.
- Reuse `useAlgorithmPlayer` unchanged.
- Register Lab 005 in the existing catalog/progress/review-queue system.
- Existing persisted v1 progress without `valid-parentheses` must hydrate safely with a default entry.
- Preserve Labs 001–004 and Review Queue behavior unchanged.

## Acceptance

- `({[]})` terminates valid with an empty stack.
- `([)]` terminates immediately on the mismatched `)`.
- `(([]` consumes the input and terminates invalid because openings remain.
- UI rejects empty input and non-bracket characters without replacing the current valid trace.
- Catalog total becomes five labs and Lab 005 participates in selection, mastery, completion, reviews and Review Queue scheduling.
- Automated tests cover valid nesting, mismatch, unfinished openings and progress migration.
- A SHA-bound Human Validation packet and continuation prompt are produced after machine gates pass.

## Stack strategy

PR #7 is stacked on PR #6. Continue independently of parent merges and asynchronous Human Validation. Retarget after a parent merges and re-run relevant gates. Never infer Human Validation from CI.
