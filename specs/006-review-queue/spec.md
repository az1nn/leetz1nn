# SPEC-006 — Review Queue / Spaced Practice

## Goal

Turn the persisted study metadata introduced in SPEC-004 into a deterministic review queue without changing the stored progress schema.

## Inputs

The queue derives only from existing per-lab state:

- `completed`
- `mastery`
- `reviewCount`
- `lastReviewedAt`

## Scheduling policy

Only completed labs enter the queue.

A completed lab that has never been reviewed is due immediately.

Base intervals:

- `learning`: 1 day
- `practicing`: 3 days
- `mastered`: 7 days

The current `reviewCount` multiplies the base interval, clamped to `1..4`. This gives bounded spacing while keeping the model understandable for study purposes.

The queue is sorted by earliest due time, then by stable lab catalog order.

## UX

The study workspace shows:

- number of reviews due now;
- completed labs currently scheduled;
- top queue entries with due/upcoming state;
- interval length;
- a direct action to open the selected lab.

Opening a queued lab does not automatically record a review. The learner must still use the existing **Log review** action after actually completing the review.

## Architecture

`StudyProgressState → buildReviewQueue() → Review Queue UI → selectLab()`

The scheduling function is pure when supplied an explicit `now`, making it deterministic in tests.

## Compatibility

No AsyncStorage schema migration is required. Existing v1 payloads remain valid.

## Acceptance

1. Incomplete labs are absent from the queue.
2. Completed labs with no review history are due immediately.
3. Mastery level changes the base interval.
4. Review count extends spacing but never beyond 4× the mastery base interval.
5. Due items sort before future items.
6. Opening a queue item selects the correct lab and does not increment review history.
7. Existing catalog, progress persistence and lab visualizers continue to work.
