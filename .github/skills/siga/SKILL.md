---
name: siga
description: Verify-first continuation protocol for this repository. Reconstruct real persistent state before deciding whether to resume, watch, or advance work.
---

# SIGA

This file is the canonical SIGA procedure for `az1nn/leetz1nn`.

The canonical persisted state is `.github/skills/siga/HANDOFF.md`.

Do not treat ChatGPT memory or chat history as canonical project state.

## Trust order

REAL STATE > HANDOFF > MEMORY > CHAT

## Trigger

When the user says only `Siga`, start in VERIFY-FIRST mode.

## 1. RECONCILE

Inspect the real repository state before changing code:

- default branch and current feature branches;
- open PRs and their base/head relationships;
- mergeability and review state;
- current commit SHAs;
- CI/workflow results for the relevant head;
- repository specs, validation packets and this handoff;
- pending Human Validation;
- implementation already dispatched or completed.

Do not assume a prior chat correctly reflects current state.

## 2. DECIDE

Choose exactly one execution class.

### RESUME

Use when the current unit is unfinished, failed, partially implemented, or blocked by a machine-fixable issue.

Continue the same unit. Do not open a competing workstream.

### WATCH

Use when work has already been dispatched and an active gate is still running or awaiting explicit external evidence, and starting the next unit would violate the current handoff or an authority boundary.

Observe/reconcile the gate. Do not duplicate the work.

### ADVANCE

Use when the prior implementation is verifiably complete for its machine gates and the repository handoff explicitly permits independent continuation.

Open the next coherent unit on the correct base and preserve the existing stack.

Pending Human Validation does not automatically block safe independent engineering when the repository's validation packet explicitly says continuation may proceed asynchronously.

## 3. EXECUTE

For RESUME or ADVANCE:

1. implement the smallest coherent unit;
2. verify automated gates;
3. preserve immutable Human Validation targets;
4. create or update the PR without merging unless explicitly authorized;
5. persist the resulting state in `.github/skills/siga/HANDOFF.md`.

For WATCH, persist only materially changed state.

## Invariants

- Never claim Human Validation passed without explicit human evidence.
- Never infer a human pass from CI, screenshots, mergeability, or agent inspection.
- Never merge unless the user explicitly requests it.
- Never duplicate an already active workstream.
- Retarget stacked PRs only after parent merge is verified.
- Re-run relevant gates after retargeting or functional mutation.
- Preserve `pure algorithm → trace → hook/player → visualizer`.
- Keep progress/storage concerns outside algorithm implementations.
- Keep SIGA procedure/state only in this repository.
