# Module 07 Lab Execution Checklist

Duration: 60 min
Goal: Configure Testing Principles, then generate tests and validate quality.

Assumed stack for this lab instance: TypeScript + Node.js + npm.

## Phase 1 (30 min): Configure Testing Principles

### Exercise 1 (10 min): Sections 1-2

1. Run `/speckit.constitution`.
2. Ask it to add Testing Principles with:
- Section 1: TDD, RED-GREEN-REFACTOR, test-first.
- Section 2: pyramid 70/20/10, static analysis, 80/75/75 thresholds.
3. Confirm output includes project-specific stack/tool customizations.

Checkpoint:
- Testing Principles header exists.
- Sections 1-2 complete.
- 70/20/10 defined.

### Exercise 2 (15 min): Sections 3-8

1. Add Sections 3-5:
- Organization paths.
- Naming conventions.
- AAA anatomy and isolation rules.
2. Add Sections 6-7:
- Mocking strategy and test data.
- Quality criteria, anti-patterns, mutation gate.
3. Add Section 8:
- Exact tools/versions and runnable commands.

Checkpoint:
- Sections 3-8 complete.
- Section 7 includes anti-patterns and oracle validation.
- Section 8 includes exact commands.

### Exercise 3 (5 min): Review and Commit

1. Run `/speckit.constitution` and ask for the full Testing Principles section.
2. Verify all eight sections are present.
3. Commit:

```bash
git add .specify/memory/constitution.md
git commit -m "feat(testing): add Testing Principles to constitution (8 sections)"
```

## Phase 2 (30 min): Generate and Validate

### Exercise 4 (5 min): Verify or Generate Test Tasks

1. Check whether tasks already exist:

```bash
Get-ChildItem -Path specs -Recurse -Filter tasks.md
```

2. If tasks missing or no test tasks, run:

- `/speckit.tasks`
- Feature: `specs/<feature>/spec.md`
- Instruction: generate test tasks following constitution Testing Principles.

Prompt to paste:

```text
Feature: specs/<feature>/spec.md

Generate test tasks following Testing Principles from constitution.
Order by testing pyramid: unit first, then integration, then E2E.
Target distribution: ~70% unit, ~20% integration, ~10% E2E.
Use paths:
- tests/unit/**/*.test.ts
- tests/integration/**/*.test.ts
- tests/e2e/**/*.spec.ts
```

3. Validate ordering and distribution:
- Unit first, then integration, then E2E.
- Approximately 70/20/10 test task ratio.

### Exercise 5 (20 min): Run /speckit.implement

1. Run `/speckit.implement` for one feature.
2. Observe TDD loop for tasks: RED -> GREEN -> REFACTOR.
3. Validate generated tests against constitution Sections 3, 4, 5, 7, and 8.
4. Run test commands from Section 8 and confirm all pass.
5. Repeat for 1-2 more features if time allows.

Prompt to paste:

```text
Implement all test tasks from tasks.md using strict TDD:
- RED: write failing test first
- GREEN: minimum implementation to pass
- REFACTOR: improve while keeping tests green

Must follow constitution Testing Principles sections 1-8.
```

Command set for this workspace run:
- npm run typecheck
- npm run lint
- npm run test:unit
- npm run test:integration
- npm run test:e2e
- npm run test:coverage
- npm run test:mutation

### Exercise 6 (5 min): Quality Validation

1. Anti-pattern check:
- No tautological assertions.
- No private/internal implementation testing.
- No order-dependent tests.
- No assertion-less tests.
2. Spot-check oracles for 2-3 tests.
3. Record current coverage vs targets.

PowerShell quick checks:

```bash
# Find tautological style assertions quickly
Get-ChildItem tests -Recurse -Include *.test.ts,*.spec.ts | Select-String -Pattern "expect\((.+)\)\.toBe\(\1\)"

# Find tests that may have no assertions
Get-ChildItem tests -Recurse -Include *.test.ts,*.spec.ts | Select-String -Pattern "test\(|it\(" | Measure-Object
Get-ChildItem tests -Recurse -Include *.test.ts,*.spec.ts | Select-String -Pattern "expect\(" | Measure-Object
```

Interpretation:
- If tautological matches are non-zero, inspect and fix manually.
- If test count is much higher than expect count, inspect for assertion-less tests.

## Done Criteria

- Constitution has all 8 Testing Principles sections.
- Test tasks generated and pyramid-ordered.
- `/speckit.implement` generated tests with observed TDD flow.
- Tests pass and conform to quality criteria.
- Anti-pattern review completed.

## Fast Stack Fill-In (for constitution Section 8)

Current selection applied: TypeScript + npm.

Replace placeholders in `.specify/memory/constitution.md` based on your stack:

- TypeScript:
  - Type checker: TypeScript strict
  - Linter: ESLint
  - Unit/Integration: Jest or Vitest
  - E2E: Playwright
  - Mutation: Stryker
- Python:
  - Type checker: mypy strict
  - Linter: pylint/ruff
  - Unit/Integration: pytest
  - E2E: Playwright
  - Mutation: mutmut
- Java:
  - Type checker/lint: Checkstyle/SpotBugs
  - Unit/Integration: JUnit 5
  - E2E: Selenium/Playwright
  - Mutation: PIT
- Go:
  - Lint: golangci-lint
  - Unit/Integration: testing + Testify
  - E2E: Playwright/Cypress (if web)
  - Mutation: go-mutesting
