# Human Validation — 007 Stack / Valid Parentheses

Status: `PENDING_HUMAN`
Target implementation SHA: `b293f93abee977a6dfbf351e177366c0aea59d7a`
Branch: `feat/007-stack-valid-parentheses`
PR: #7, stacked on PR #6
Environment: Web required; Android/iOS optional exploratory validation

## Automated gates

Automated gates and Human Validation are independent.

- [x] algorithm + progress tests — quality #35
- [x] TypeScript — quality #35
- [x] Expo Doctor — quality #35
- [x] PR CI completed successfully — quality #35

## Prerequisites

1. Check out `b293f93abee977a6dfbf351e177366c0aea59d7a`.
2. Run `npm install` and `npm run web`.
3. Open the study workspace in a modern browser.

## Required steps

### HV-01 — Catalog integration

**Action:** Open the catalog and select Lab 005 — Valid Parentheses.

**Expected:** Catalog contains five labs, Lab 005 is labeled Stack, only the Valid Parentheses visualizer is mounted, and current-study state follows Lab 005.

**Evidence:** `PASS`/`FAIL`; screenshot on failure.

**Result:** `PENDING`

### HV-02 — Valid nested sequence

**Action:** Keep the default `({[]})`, build the trace, and advance to completion.

**Expected:** Opening brackets are pushed; matching closings pop in LIFO order; the final step reports `valid = true`; the stack is empty; complexity shows `O(n)` time / `O(n)` space.

**Evidence:** Screenshot one push state and the final valid state, or equivalent written observations.

**Result:** `PENDING`

### HV-03 — Immediate mismatch

**Action:** Enter `([)]`, build the trace, and advance until it stops.

**Expected:** The trace terminates at index `2` on `)`; expected opening is `(`; actual stack top is `[`; verdict is invalid; no later input is consumed.

**Evidence:** Record index, expected opening, actual top and verdict.

**Result:** `PENDING`

### HV-04 — Unmatched openings at end

**Action:** Enter `(([]`, build the trace, and advance to completion.

**Expected:** All input is consumed; the final step is invalid because two `(` openings remain unmatched on the stack.

**Evidence:** `PASS`/`FAIL`; record final stack.

**Result:** `PENDING`

### HV-05 — Input guard preserves the active trace

**Action:** Start from a valid trace, then enter `abc` and press Build trace. Repeat with an empty value.

**Expected:** UI shows `Use a non-empty sequence containing only (), [] and {}.`; the previously built trace remains active and unchanged.

**Evidence:** Record exact message and whether the previous visualization remained intact.

**Result:** `PENDING`

### HV-06 — Progress and Review Queue integration

**Action:** Select Lab 005, cycle mastery to `practicing`, mark it complete, log one review, reload, then inspect the Review Queue.

**Expected:** Lab 005 remains selected; mastery/completion/review metadata persist; overall completion denominator is five labs; the completed lab participates in Review Queue scheduling using the existing v1 state.

**Evidence:** Record state before reload, after reload and queue entry.

**Result:** `PENDING`

### HV-07 — Responsive stack visualization

**Action:** Validate around `390px` and `>= 1280px` using a longer sequence such as `(({{[[()]]}}))`, then step through the trace.

**Expected:** Input scrolling remains local; stack frames stay readable; controls remain reachable; code panel does not clip or overlap the visualizer.

**Evidence:** One mobile-width and one desktop-width screenshot.

**Result:** `PENDING`

## Optional exploratory checks

- Try `()[]{}`, `{[()]}`, `]`, and `((((`.
- Complete Lab 005 without a review and confirm it becomes due immediately in the Review Queue.
- Repeat the responsive checks on Expo Android/iOS.

## Validation result

Status: `PENDING_HUMAN`
Validator: —
Date: —
Notes: No human evidence supplied yet.

Any functional change after `b293f93abee977a6dfbf351e177366c0aea59d7a` requires this packet to be marked `SUPERSEDED` and regenerated.

## Continuation Prompt

```text
Continue work on leetz1nn.

Repository: az1nn/leetz1nn
Current branch: feat/007-stack-valid-parentheses
PR/stack: PR #7 on PR #6 on PR #5 on PR #4 on PR #3 on PR #2 on PR #1. Continue independently of pending parent merges and Human Validation. Retarget affected child PRs after parent merges and re-run relevant gates.
Frozen implementation SHA: b293f93abee977a6dfbf351e177366c0aea59d7a

Completed:
- Labs 001–004 remain intact.
- Review Queue / spaced-practice surface remains intact.
- Lab 005 Valid Parentheses / Stack with deterministic LIFO trace.
- Input cursor, stack visualization, mismatch termination and final validity state.
- Backward-compatible progress hydration for valid-parentheses.
- Lab 005 integration with selection, mastery, completion, reviews and Review Queue.
- SPEC-007 and automated regression coverage.

Automated gates:
- quality #35: SUCCESS on b293f93abee977a6dfbf351e177366c0aea59d7a.
- Tests: PASS.
- TypeScript: PASS.
- Expo Doctor: PASS.
- Do not infer Human Validation from CI.

Human Validation:
- Status: PENDING_HUMAN
- Packet: docs/validation/007-stack-valid-parentheses.md
- Pending: HV-01..HV-07.

Next boundary:
1. Re-check PR #1–#7 state, review threads and latest CI.
2. Keep Human Validation asynchronous and SHA-bound.
3. If Wave 007 remains machine-green, add Lab 006 — Prefix Sum / Range Sum in a new branch stacked on PR #7.
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
