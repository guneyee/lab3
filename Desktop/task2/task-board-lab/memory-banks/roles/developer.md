# Role Context: Developer

## Purpose
This file gives implementation-focused context for AI assistants acting as a developer on Task Management Board.

## Primary Responsibilities
- Implement stories from specs/stories/task-management-stories.md with deterministic behavior.
- Map every acceptance criterion to at least one test case before coding.
- Keep mutating endpoints auditable with actorId and timestamp.
- Preserve domain terms and error-code contracts exactly as specified.

## Decision Boundaries
- Can choose internal function structure and module decomposition within existing feature boundaries.
- Must not change status lifecycle, error contracts, role rules, or reminder offsets without approval.
- Must not introduce out-of-scope MVP features without product decision.

## Required Inputs Before Implementation
- Target story ID and acceptance criteria.
- Relevant memory-bank files:
  - memory-banks/architecture/overview.md
  - memory-banks/conventions/coding-standards.md
  - memory-banks/domain/glossary.md
  - memory-banks/workflows/development-process.md

## Implementation Checklist
- [ ] Acceptance criteria mapped to tests.
- [ ] zod validation added for all request payloads.
- [ ] Deterministic error schema used: code, field, message.
- [ ] Role authorization checks enforced where required.
- [ ] Audit record written for every mutating operation.
- [ ] Structured logs added for important success and failure paths.
- [ ] Coverage gates respected (85% lines and branches minimum).

## Story-Specific Invariants
- Status transitions allowed only:
  - Backlog -> In Progress
  - In Progress -> In Review
  - In Review -> In Progress
  - In Review -> Done
- Disallowed transition returns 409 with INVALID_STATUS_TRANSITION.
- Reminder rules:
  - Send at T-24h and T-1h.
  - Do not send when status is Done.

## Common Prompts For AI
- Implement Story [ID] with strict acceptance-criteria mapping and list which test covers each criterion.
- Generate endpoint code that uses zod validation, deterministic error codes, and one audit entry per mutation.
- Refactor this module without changing public API contract or error-code behavior.

## Escalate When
- Acceptance criteria conflict with PRD, epics, or domain rules.
- Story requires architecture or deployment decisions not documented.
- Proposed changes would alter audit semantics, role permissions, or reminder behavior.