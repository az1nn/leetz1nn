---
name: async-human-validation
description: Produce immutable, asynchronous human-validation packets for UI, device, integration, and behavior checks, then generate a continuation prompt so engineering can proceed without losing context.
---

# Async Human Validation

Use this skill whenever a change requires a person to validate behavior that automated gates cannot fully prove: visual quality, responsive behavior, device interaction, UX, external integrations, credentials, or subjective acceptance.

## Core rule

Automated validation and Human Validation are separate gates. Never infer a human pass from CI, tests, typecheck, screenshots, mergeability, or your own inspection.

Human Validation must target an immutable implementation commit SHA. If functional code changes after the packet is created, mark the old packet `SUPERSEDED` and generate a new packet for the new SHA.

## Allowed statuses

- `PENDING_HUMAN` — packet is ready and no result has been supplied.
- `PASSED` — a human explicitly confirmed every required step or supplied equivalent evidence.
- `FAILED` — at least one required expectation failed.
- `BLOCKED` — validation cannot currently be executed because a prerequisite is unavailable.
- `SUPERSEDED` — the target SHA is no longer the implementation being evaluated.

Do not invent other terminal states.

## Required workflow

1. Finish the implementation and automated gates first.
2. Freeze the implementation SHA.
3. Create `docs/validation/<work-id>-<slug>.md`.
4. Record repository, branch, PR/stack relationship, target SHA, environment, prerequisites and automated gate status.
5. Write numbered human steps. Every step must include: **Action**, **Expected result**, and **Evidence**.
6. Separate required checks from optional exploratory checks.
7. Keep the packet executable asynchronously by a person who was not present during implementation.
8. Record the overall status. Default is `PENDING_HUMAN`.
9. End the packet with a generated **Continuation Prompt**.
10. Surface the same validation target and status in the PR description or handoff.

## Step quality bar

A valid step is deterministic and observable.

Bad: `Check that the page looks good.`

Good: `At 390px width, open Lab 002, scroll horizontally through the height bars, and confirm no controls overlap or leave the viewport. Capture one screenshot of the lab and one after advancing a trace step.`

Prefer exact fixtures, inputs, routes, expected values, viewport/device conditions, and failure criteria.

## Evidence policy

Evidence can be a short written observation, screenshot, screen recording, device/build identifier, console excerpt, or linked issue. Require only evidence that helps diagnose a failure; do not create ceremony for its own sake.

When validation fails, preserve the failing evidence and create a focused engineering follow-up. Do not overwrite the failure with a later pass; append a new validation attempt with its own SHA when code changes.

## Validation packet template

```md
# Human Validation — <work id> <title>

Status: PENDING_HUMAN
Target SHA: <immutable implementation sha>
Branch: <branch>
PR: <pr or stacked-pr relationship>
Environment: <web/android/ios/etc>

## Automated gates
- [ ] tests
- [ ] typecheck
- [ ] platform/doctor/build checks

## Prerequisites
- ...

## Required steps
### HV-01 — <name>
Action: ...
Expected: ...
Evidence: ...
Result: PENDING

## Exploratory checks
- ...

## Validation result
Status: PENDING_HUMAN
Notes: ...

## Continuation Prompt
<generated prompt>
```

## Continuation Prompt contract

Always generate this at the end of the packet and at the end of the handoff message. It must be directly reusable in a new chat/session and contain:

- repository and project name;
- current branch and PR/stack relationship;
- frozen implementation SHA;
- what was completed;
- automated gate results known at generation time;
- exact Human Validation status and packet path;
- failures or open questions without hiding uncertainty;
- next implementation boundary in priority order;
- explicit non-goals or authority boundaries (for example: do not merge unless requested);
- instruction to re-check repository state before changing code.

Use this form:

```text
Continue work on <repo>.

Repository: <owner/repo>
Current branch: <branch>
PR/stack: <relationship>
Frozen implementation SHA: <sha>

Completed:
- ...

Automated gates:
- ...

Human Validation:
- Status: <status>
- Packet: <path>
- Pending/failing items: ...

Next boundary:
1. ...
2. ...

Constraints:
- Re-check branch/PR/CI state before making changes.
- Do not claim Human Validation passed without explicit human evidence.
- If functional code has moved past the frozen SHA, mark the packet SUPERSEDED and regenerate it.
- Do not merge unless the user explicitly requests it.

Proceed independently where safe and leave the next coherent handoff with an updated continuation prompt.
```
