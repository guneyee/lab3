# Tasks: 001-user-auth

Source: specs/001-user-auth/spec.md
Principles: .specify/memory/constitution.md
Order: Testing Pyramid (Unit -> Integration -> E2E)

## UNIT TESTS (~70%)

- [x] Unit test: validateEmail returns false for malformed email (tests/unit/auth/validation.test.ts)
- [x] Unit test: validatePassword enforces minimum length >= 8 (tests/unit/auth/validation.test.ts)
- [x] Unit test: register rejects mismatched password and confirmPassword with AUTH_PASSWORD_MISMATCH (tests/unit/auth/auth-service.test.ts)
- [x] Unit test: register rejects duplicate email with AUTH_EMAIL_EXISTS (tests/unit/auth/auth-service.test.ts)
- [x] Unit test: register hashes password before persistence call (tests/unit/auth/auth-service.test.ts)
- [x] Unit test: login rejects unknown email with AUTH_USER_NOT_FOUND (tests/unit/auth/auth-service.test.ts)
- [x] Unit test: login rejects wrong password with AUTH_INVALID_CREDENTIALS (tests/unit/auth/auth-service.test.ts)

## INTEGRATION TESTS (~20%)

- [x] Integration test: POST /api/auth/register creates account and stores hashed password (tests/integration/auth/register.test.ts)
- [x] Integration test: POST /api/auth/login returns success for valid credentials and deterministic error codes for invalid credentials (tests/integration/auth/login.test.ts)

## E2E TESTS (~10%)

- [x] E2E test: user can register and then login successfully (tests/e2e/auth/register-login.spec.ts)

## Notes

- Follow AAA pattern in all tests.
- Use beforeEach for setup; avoid beforeAll for mutable state.
- Do not assert implementation details; assert observable behavior.
- Ensure meaningful assertions (no tautological assertions).
