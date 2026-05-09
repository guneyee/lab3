# Coding Standards: Task Management Board

## Document Purpose
This file defines the conventions AI assistants must follow when generating or modifying code.

## Naming Conventions
- Files: kebab-case
- Directories: feature-based folders in lowercase
- Classes/types: PascalCase
- Functions/variables: camelCase
- Constants/env vars: UPPER_SNAKE_CASE
- Database tables: snake_case plural nouns
- Database columns: snake_case

## File Structure
- Source root: src/
- Test root: tests/ plus module-level test files where needed
- Shared utilities location: src/shared/
- Configuration location: src/config/
- Feature/module layout: one module per feature folder: tasks, users, audit, notifications, reporting

## Code Organization
- Maximum function length: target 60 lines, hard review trigger at 100 lines
- Maximum file length: target 300 lines, hard review trigger at 450 lines
- One primary responsibility per file: yes
- Shared logic extraction rule: extract when logic is reused in 2 or more locations or exceeds one clear responsibility
- Side effects location: repository, scheduler, and notification layers only; validators and domain rules stay pure

## Language-Specific Rules
- Types: strict TypeScript typing; avoid any unless constrained by external library interfaces
- Null handling: explicit null and undefined checks; no implicit fallthrough
- Async behavior: async and await with explicit timeout and retry boundaries for external calls
- Validation: zod schemas for all API payloads
- Configuration: environment-driven config loaded once at startup and validated before boot completes

## Comments And Documentation
- Docstrings required for: all public exported functions, including params, return type, and thrown errors
- Inline comments allowed when: explaining non-obvious intent, invariants, or business-rule edge handling
- TODO format: disallowed in merged code
- ADR or design-note trigger: every accepted architectural decision must be recorded in specs/adrs

## Testing Requirements
- Required test types: unit tests, integration tests, and contract tests for error responses
- Coverage target: minimum 85% lines and 85% branches for backend modules
- Critical-path coverage: status transitions, authorization guards, and reminder scheduling must be fully covered by scenario tests
- Test file naming: feature-name.spec.ts for integration and unit suites
- Test organization: mirror feature modules and keep endpoint behavior tests near API layer
- Mocking policy: mock external providers (SMTP) but avoid mocking core domain rules

## Error Handling
- Error format: structured schema with code, field, message
- Error types: deterministic error codes required by stories, including VALIDATION_REQUIRED_FIELD, VALIDATION_ENUM, VALIDATION_PAST_DUE_DATE, VALIDATION_EMPTY_PATCH, INVALID_STATUS_TRANSITION, USER_NOT_FOUND, ASSIGNEE_UNCHANGED, INVALID_DATE_RANGE, PRESET_NAME_CONFLICT
- Logging requirements: structured JSON logs only; no console.log in production code
- User-facing messages: safe, actionable messages without internal stack traces
- Retry policy: scheduler dispatch retries up to 3 times with backoff of 1m, 2m, 4m

## Security And Data Rules
- Secrets handling: Never hardcode credentials, keys, or tokens.
- Input sanitization: all inbound API payloads validated by zod before domain logic execution
- Authorization: Team Lead role required for assign and reassign endpoints and overdue dashboard endpoint
- Sensitive data logging: never log raw credentials, tokens, or password hashes

## Performance Expectations
- API response target: to be defined after baseline profiling; deterministic behavior is mandatory for MVP
- Frontend performance target: not specified in source artifacts
- Query expectations: filtered board results sorted by dueDate ascending and createdAt ascending; include totalCount and appliedFilters
- Background job expectations: reminder jobs keyed as reminder:{taskId}:{offsetMinutes}; overdue recalculation runs every 5 minutes

## Definition Of Done
- [ ] Code follows naming and file-structure conventions
- [ ] Validation and error handling are implemented
- [ ] Required tests are added and passing
- [ ] Logging is present where needed
- [ ] Documentation is updated if behavior or contracts changed
- [ ] Security and performance expectations are met

## Code Review Checklist
- [ ] Uses the approved stack and patterns
- [ ] Keeps changes small and focused
- [ ] Avoids duplicate logic
- [ ] Handles errors and edge cases
- [ ] Includes sufficient tests
- [ ] Preserves backward compatibility where required

## Examples To Replace

### Example Function Naming
- Good: createTask
- Avoid: doStuff

### Example Test Naming
- Good: create-task.spec.ts
- Avoid: test1.ts

## Alignment Notes
This file is synchronized with AGENTS.md and stories acceptance criteria. If AGENTS.md changes, update this file in the same pull request.