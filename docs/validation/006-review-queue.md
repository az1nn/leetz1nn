# Human Validation — 006 Review Queue / Spaced Practice

Status: `PENDING_HUMAN`
Target implementation SHA: `bd8b5e28a2cee5725286a362b06b6fa1ae40bc59`
Branch: `feat/006-review-queue`
PR: #6, stacked on PR #5 / `feat/005-binary-search`
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] `npm install`
- [x] 16 Vitest tests
- [x] TypeScript strict check
- [x] Expo Doctor
- [x] quality run #32 completed successfully

The green machine gate targets the frozen implementation SHA above. It does not imply Human Validation passed.

## Prerequisites

1. Check out `bd8b5e28a2cee5725286a362b06b6fa1ae40bc59`.
2. Run `npm install` and `npm run web`.
3. Open the study workspace in a modern browser with local storage enabled.
4. Use **Reset progress** before HV-01 so the starting state is deterministic.

## Required steps

### HV-01 — Empty queue baseline

**Action:** Reset progress and inspect the Review Queue card before completing any lab.

**Expected result:**
- summary shows `0 due now · 0 completed labs scheduled`;
- the empty-state message asks the learner to complete a lab;
- catalog and active Lab 001 remain usable.

**Evidence:** Record `PASS` or `FAIL`; screenshot only on failure.

**Result:** `PENDING`

### HV-02 — Immediate first review

**Action:** Keep Lab 001 selected and press **Mark complete** without logging a review.

**Expected result:**
- Lab 001 appears at queue position #1;
- status is `due now`;
- queue shows one completed lab scheduled;
- the queue does not increment the lab's review count by itself.

**Evidence:** Record the queue row and Lab 001 review count.

**Result:** `PENDING`

### HV-03 — First spaced interval

**Action:** With Lab 001 at `practicing`, press **Log review** once.

**Expected result:**
- Lab 001 remains in the queue;
- it changes from `due now` to approximately `in 3 days`;
- displayed interval is `3d`;
- review count becomes 1.

**Evidence:** Record the queue status and current-study review count.

**Result:** `PENDING`

### HV-04 — Mastery and repeated-review spacing

**Action:** Cycle Lab 001 mastery to `mastered`, log a second review, then inspect its queue row.

**Expected result:**
- the lab stays completed;
- review count becomes 2;
- interval becomes `14d` (7-day mastered base × 2 reviews);
- the queue remains ordered by due date.

**Evidence:** Record mastery, review count and interval.

**Result:** `PENDING`

### HV-05 — Queue navigation does not fabricate a review

**Action:** Complete another lab without reviewing it, then press **Study now** on its due queue row.

**Expected result:**
- the selected lab changes to the queue item;
- its visualizer becomes the active lab;
- review count remains unchanged until **Log review** is explicitly pressed.

**Evidence:** Record selected lab and review count before/after the queue action.

**Result:** `PENDING`

### HV-06 — Persistence and responsive layout

**Action:** With at least two scheduled labs, reload the page. Then validate the Review Queue around `390px` width and again at desktop width `>= 1280px`.

**Expected result:**
- completed/mastery/review metadata survive reload;
- queue ordering and intervals reconstruct from persisted state;
- rows remain readable with no overlap or clipping;
- queue action buttons remain reachable at both widths.

**Evidence:** One mobile-width screenshot and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Build four completed labs with different mastery/review histories and confirm earliest due dates sort first.
- Log more than four reviews and confirm the interval multiplier remains capped at 4×.
- Repeat the queue navigation flow on Expo Android/iOS.

## Validation result

Status: `PENDING_HUMAN`

Validator: —
Date: —
Device/browser: —
Notes: No human evidence has been supplied yet.

Any functional change after `bd8b5e28a2cee5725286a362b06b6fa1ae40bc59` requires this packet to be marked `SUPERSEDED` and regenerated.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/006-review-queue
PR/stack: PR #6 on PR #5 on PR #4 on PR #3 on PR #2 on PR #1. Continue independently of pending parent merges and Human Validation. Retarget affected child PRs after a parent merges and re-run gates.
Frozen implementation SHA: bd8b5e28a2cee5725286a362b06b6fa1ae40bc59

Completed:
- Labs 001–004: Two Sum, Container With Most Water, Longest Substring, Binary Search.
- Catalog and AsyncStorage-backed study progress.
- Review Queue derived from completion, mastery, review count and last-reviewed timestamp.
- Deterministic pure scheduling with bounded spaced intervals.
- Queue UI with due/upcoming state and direct lab navigation.
- Repository-local SIGA procedure at .github/skills/siga/SKILL.md.
- Spec 006 and automated scheduling tests.

Automated gates:
- quality run #32: SUCCESS.
- 16 tests passed.
- TypeScript passed.
- Expo Doctor passed.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/006-review-queue.md
- Target: bd8b5e28a2cee5725286a362b06b6fa1ae40bc59
- Pending: HV-01 through HV-06.

Next boundary:
1. Re-check PR #1–#6, branch heads, reviews and CI before changing code.
2. Keep Human Validation asynchronous and SHA-bound.
3. If machine state remains green, continue pattern coverage with Lab 005 — Stack / Valid Parentheses — in a new branch stacked on PR #6.
4. Preserve the Review Queue schema compatibility; do not add storage migration unless a later requirement needs new persisted fields.

Constraints:
- Use .github/skills/siga/SKILL.md and .github/skills/siga/HANDOFF.md as the repository-local continuation sources.
- Do not claim Human Validation passed without explicit human evidence.
- If functional code moves past the frozen SHA, mark this packet SUPERSEDED and regenerate it.
- Do not merge unless explicitly requested.
- Preserve pure algorithm → trace → hook/player → visualizer.
- Keep progress/storage outside algorithm implementations.

Proceed independently where safe and leave the next coherent repository handoff.
```
