# Human Validation — 008 Prefix Sum / Range Sum

Status: `PENDING_HUMAN`
Target implementation SHA: `18138879af222553656678bd2470fecee071c9e6`
Branch: `feat/008-prefix-sum-range-sum`
PR: #8, stacked on PR #7
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] algorithm + progress tests — quality #37
- [x] TypeScript — quality #37
- [x] Expo Doctor — quality #37
- [x] PR CI completed successfully — quality #37

## Prerequisites

1. Check out `18138879af222553656678bd2470fecee071c9e6`.
2. Run `npm install` and `npm run web`.
3. Open the study workspace in a modern browser.

## Required steps

### HV-01 — Catalog integration

**Action:** Open the catalog and select Lab 006 — Range Sum Query.

**Expected:** Catalog contains six labs, Lab 006 is labeled Prefix Sum, only the Range Sum visualizer is mounted, and current-study state follows Lab 006.

**Evidence:** `PASS`/`FAIL`; screenshot on failure.

**Result:** `PENDING`

### HV-02 — Prefix construction

**Action:** Keep the default array `2, -1, 3, 5, -2`, left `1`, right `3`, build the trace, and advance through preprocessing.

**Expected:** Prefix starts at `[0]` and finishes as `[0, 2, 1, 4, 9, 7]`; each step adds exactly the current array value to the previous prefix value.

**Evidence:** Record the final prefix array and one intermediate accumulation step.

**Result:** `PENDING`

### HV-03 — Inclusive range subtraction

**Action:** Continue the default trace to the query step.

**Expected:** The UI highlights `p[1]` and `p[4]`; the final range result is `9 - 2 = 7`; complexity distinguishes O(n) build from O(1) query.

**Evidence:** Record the two prefix boundaries and final sum.

**Result:** `PENDING`

### HV-04 — Single-element range

**Action:** Enter `4, -6, 9`, left `2`, right `2`, build the trace, and advance to the query.

**Expected:** No special-case behavior is required; the result is `9` from `prefix[3] - prefix[2]`.

**Evidence:** `PASS`/`FAIL`; record the subtraction shown.

**Result:** `PENDING`

### HV-05 — Input guards preserve the active trace

**Action:** Start from a valid trace. Then try an empty/invalid array token, more than 12 values, `left > right`, a negative left index, and `right >= array length`.

**Expected:** The UI shows either `Use 1–12 finite numbers separated by commas.` or `Range must satisfy 0 <= left <= right < array length.`; the previously built valid trace remains active and unchanged.

**Evidence:** Record each invalid case, message and whether the previous visualization stayed intact.

**Result:** `PENDING`

### HV-06 — Progress and Review Queue integration

**Action:** Select Lab 006, cycle mastery to `practicing`, mark it complete, log one review, reload, then inspect the Review Queue.

**Expected:** Lab 006 remains selected; mastery/completion/review metadata persist; overall completion denominator is six labs; the completed lab participates in Review Queue scheduling using the existing v1 state.

**Evidence:** Record state before reload, after reload and queue entry.

**Result:** `PENDING`

### HV-07 — Responsive visualization

**Action:** Validate around `390px` and `>= 1280px` with a 12-value array, then step through preprocessing and query.

**Expected:** Array/prefix rows scroll locally when needed; prefix cells stay readable; controls remain reachable; code panel does not clip or overlap the visualizer.

**Evidence:** One mobile-width and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Try negative-heavy arrays and decimal values.
- Query the full range `[0, n - 1]` and both edge singletons.
- Complete Lab 006 without a review and confirm it becomes due immediately in the Review Queue.
- Repeat responsive checks on Expo Android/iOS.

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Any functional change after `18138879af222553656678bd2470fecee071c9e6` requires this packet to be marked `SUPERSEDED` and regenerated.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/008-prefix-sum-range-sum
PR/stack: PR #8 on PR #7 on PR #6 on PR #5 on PR #4 on PR #3 on PR #2 on PR #1. Continue independently of pending parent merges and Human Validation. Retarget affected child PRs after parent merges and re-run relevant gates.
Frozen implementation SHA: 18138879af222553656678bd2470fecee071c9e6

Completed:
- Labs 001–005 remain intact.
- Review Queue / spaced-practice surface remains intact.
- Lab 006 Range Sum Query / Prefix Sum with deterministic preprocessing and query trace.
- Array and prefix visualization with query-boundary highlighting.
- O(n) preprocessing / O(1) query model.
- Input and bounds guards that preserve the active trace.
- Backward-compatible v1 progress hydration for range-sum.
- Lab 006 integration with selection, mastery, completion, reviews and Review Queue.
- SPEC-008 and automated regression coverage.

Automated gates:
- quality #37: SUCCESS on 18138879af222553656678bd2470fecee071c9e6.
- Tests: PASS.
- TypeScript: PASS.
- Expo Doctor: PASS.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/008-prefix-sum-range-sum.md
- Pending: HV-01..HV-07.

Next boundary:
1. Re-check PR #1–#8 state, review threads and latest CI.
2. Keep Human Validation asynchronous and SHA-bound.
3. If Wave 008 remains machine-green, advance to the next coherent pattern lab on a new branch stacked on PR #8; preferred next slice: Lab 007 — Linked List / Reverse Linked List.
4. Keep persisted progress schema at v1 unless a future spec requires new persisted fields.

Constraints:
- Re-check branch/PR/CI state before making changes.
- Do not claim Human Validation passed without explicit human evidence.
- If functional code has moved past the frozen SHA, mark this packet SUPERSEDED and regenerate it.
- Do not merge unless the user explicitly requests it.
- Preserve pure algorithm → trace → hook/player → visualizer.
- Keep progress/storage outside algorithm implementations.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
