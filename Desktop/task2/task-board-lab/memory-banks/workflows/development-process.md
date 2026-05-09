# Development Workflow: Task Management Board

## Document Purpose
This file tells AI assistants how work moves from idea to production in this project.

## Development Process

### From Idea To Production
1. Select target story from specs/stories/task-management-stories.md.
2. Map each acceptance criterion to at least one test case.
3. Implement tests first for validation, authorization, and success paths.
4. Implement minimum code to satisfy tests and acceptance criteria.
5. Refactor for clarity while preserving deterministic behavior.
6. Verify all mutating endpoints write audit records with actorId and timestamp.
7. Open pull request with acceptance-criteria coverage checklist.

## Work Intake Rules
- Every implementation item must map to a story, task, or defect.
- Acceptance criteria must be testable.
- Unclear requirements must be clarified before implementation.
- Architecture changes require explicit review.
- Out-of-scope MVP requests (mobile apps, subtasks, dependencies, AI text generation, calendar integration, multi-tenant support) require product approval before coding.

## Branching Strategy
- Pattern: GitHub flow
- Branch naming: feature/, bugfix/, hotfix/, chore/
- Primary branches: main
- Protection rules: pull request required, passing checks required, at least one approval required

## Pull Request Process

### Before Creating A PR
- [ ] Tests passing locally
- [ ] Linting and formatting complete
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Scope limited to the intended change

### PR Requirements
- Reviewers: minimum 1 reviewer; Team Lead review required for assignment, authorization, and reminder workflows
- Required checks: lint, unit tests, integration tests, contract tests, coverage thresholds
- Description must include: target story IDs, acceptance criteria mapping, risk notes, and test evidence
- Linked work item: required

### Code Review Checklist
- [ ] Requirements are implemented as written
- [ ] Conventions are followed
- [ ] Tests prove the change
- [ ] Security/privacy concerns are addressed
- [ ] Rollback risk is understood

## Testing Strategy

### Test Types
- Unit tests: validators, status transition rules, authorization guards
- Integration tests: all mutating endpoints including task create, update, assign, reassign, and transition
- E2E tests: optional for MVP and not yet defined in source artifacts

### Coverage Rules
- Minimum coverage: 85% lines and 85% branches for backend modules
- Critical-path coverage: deterministic transition logic, reminder scheduling, and role authorization
- Regression tests required when: bug fixes, rule changes, and all conflict or validation error code changes

### Test Timing
- Preferred approach: TDD for acceptance-criteria-backed stories
- Bug fixes must include: failing test first, then fix, then green suite

## Deployment Process

### Automated Steps
1. Pull request triggers CI pipeline.
2. Linting and full test matrix executes.
3. Coverage gates enforce 85% minimum.
4. Build artifacts prepared for deployment target.
5. Post-merge deployment executes based on environment policy.

### Manual Steps
1. Reviewer confirms acceptance-criteria mapping is complete.
2. Team Lead verifies authorization and audit behavior for mutating endpoints.
3. QA or story owner validates deterministic error codes and sort order behavior.

### Verification
- Health checks: API readiness, database connectivity, and scheduler execution status
- Logs/metrics: structured JSON logs for error spikes and reminder dispatch outcomes
- Functional checks: create task with required fields, valid and invalid transitions, assignment authorization, overdue dashboard visibility

### Rollback Procedure
1. Incident owner declares rollback when acceptance criteria or health checks fail.
2. Revert application version and reverse non-production migrations when needed.
3. Communicate rollback reason and impact to Team Lead and Project Manager.
4. Record root cause and corrective action in ADR or incident note.

## AI Usage Guidance
- AI should not skip approval, testing, or review steps.
- AI-generated code must satisfy the same standards as human-written code.
- AI should reference this workflow when suggesting implementation or release steps.
- AI should preserve exact error-code contracts and domain terms from stories and glossary.