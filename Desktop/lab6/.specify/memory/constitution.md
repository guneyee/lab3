# Constitution

## Core Principles

- Placeholder: add your Module 06 constitution principles here.
- Assumption for Module 07 lab execution: TypeScript + Node.js + npm workspace.

---

### Testing Principles: Test-First Development

**NON-NEGOTIABLE: All implementation MUST follow Test-Driven Development.**

---

#### 1. Testing Philosophy

**Approach**: Test-Driven Development (TDD)
- Write test FIRST (RED)
- Implement minimal code to pass (GREEN)
- Refactor while preserving behavior (REFACTOR)

**Test Generation Rules**:
- Generate tests from specifications, not implementation details.
- Human validates expected values (oracles) for critical cases.
- AI-generated tests must be reviewed before merge.

---

#### 2. Coverage Requirements

**Test Distribution (Pyramid)**:
- Unit tests: ~70%
- Integration tests: ~20%
- E2E tests: ~10%

**Scope by Layer**:
- Unit: services, utilities, pure business rules
- Integration: API routes, repository/db integration, external boundaries
- E2E: critical user journeys only

**Static Analysis**:
- Type checker: TypeScript strict mode
- Linter: ESLint with recommended TypeScript rules

**Coverage Targets**:
- Line coverage: 80% minimum
- Branch coverage: 75% minimum
- Mutation score: 75% minimum

---

#### 3. Test Types and Organization

**File Locations**:
- Unit tests: tests/unit/**/*.test.ts
- Integration tests: tests/integration/**/*.test.ts
- E2E tests: tests/e2e/**/*.spec.ts

**Organization Rules**:
- Unit tests mirror src structure.
- Integration tests are grouped by feature/domain.
- E2E tests are grouped by user journey.
- One unit test file per source file where practical.

---

#### 4. Naming Conventions

**Test Files**:
- Unit/Integration: ComponentName.test.ts
- E2E: user-journey-name.spec.ts

**Suites and Cases**:
- Suites: describe('ComponentName', ...)
- Cases: it('should do X when Y', ...) or test('should do X when Y', ...)
- Test names must describe observable behavior.

---

#### 5. Test Anatomy

**Primary Pattern**: Arrange-Act-Assert (AAA)

**Structure Rules**:
- Use beforeEach for isolated setup.
- Avoid beforeAll for mutable/shared fixtures.
- Each test must be independent and order-agnostic.
- No shared global mutable state across tests.

---

#### 6. Mocking and Test Data

**Mocking Strategy**:
- Mock external services (email, payment, third-party APIs).
- Stub time/randomness and process/environment boundaries.
- Use fake/in-memory db only for unit scope.

**Data Strategy**:
- Prefer fixtures/factories for complex data.
- Extract reusable helpers (for example createTestUser()).
- Avoid magic numbers; use named constants.

**Do Not Mock**:
- Core domain logic owned by this project.
- Simple deterministic utilities.

---

#### 7. Quality Criteria (Critical)

**Good Test Criteria**:
- Verifies observable behavior, not internals.
- Uses meaningful assertions with external truth.
- Has single responsibility per test case.
- Is fast (unit <1s, integration <5s target).
- Is deterministic and repeatable.

**Quality Gates**:
- Mutation score >= 75%
- No tautological assertions (for example expect(x).toBe(x)).
- Human-validated expected values for key business rules.
- Coverage >= 80% line and >= 75% branch.

**Anti-Patterns Forbidden**:
- Testing private methods/internal state directly
- Interdependent tests relying on execution order
- Brittle tests that fail on harmless refactors
- Flaky tests with intermittent outcomes
- Tests with no assertions
- Copy-pasted test logic without helper extraction

---

#### 8. Tools and Frameworks

**Static Analysis**:
- Type checker: TypeScript 5.x (strict)
- Linter: ESLint 9.x + typescript-eslint 8.x

**Unit/Integration**:
- Test framework: Jest 29.x + ts-jest 29.x
- Assertion library: Jest expect API
- Mocking library: Jest mocks + MSW 2.x

**E2E**:
- E2E framework: Playwright 1.40+
- Optional AI browser automation: Stagehand

**Coverage and Mutation**:
- Coverage tool: Jest coverage (v8 provider)
- Mutation tool: StrykerJS 8.x

**Execution Commands**:
- Type check: npm run typecheck
- Lint: npm run lint
- Run all tests: npm test
- Run unit tests: npm run test:unit
- Run integration tests: npm run test:integration
- Run E2E tests: npm run test:e2e
- Generate coverage: npm run test:coverage
- Run mutation testing: npm run test:mutation

**Automation**:
- Pre-commit: typecheck + lint + unit tests
- CI main branch: all checks + all tests + coverage + mutation
