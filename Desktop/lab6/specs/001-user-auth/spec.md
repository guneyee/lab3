# Feature Spec: User Authentication

## Feature ID
- 001-user-auth

## Problem Statement
Users must be able to register and log in securely with email and password.

## Scope
- In scope: registration, login, input validation, password hashing, auth error handling.
- Out of scope: OAuth/social login, password reset, MFA.

## User Stories
1. As a new user, I want to register with email and password so that I can create an account.
2. As a registered user, I want to log in with valid credentials so that I can access protected features.
3. As a user, I want clear validation errors so that I can fix incorrect input.

## Functional Requirements
1. The system MUST allow registration with fields: email, password, confirmPassword.
2. The system MUST reject invalid email format.
3. The system MUST reject passwords shorter than 8 characters.
4. The system MUST reject registration when password and confirmPassword do not match.
5. The system MUST reject registration when email already exists.
6. The system MUST hash passwords before persistence.
7. The system MUST allow login with valid email and password.
8. The system MUST reject login with unknown email.
9. The system MUST reject login with incorrect password.
10. The system MUST return deterministic error codes for auth failures.

## Non-Functional Requirements
1. Registration and login service-level logic MUST be unit-testable without network access.
2. Input validation functions MUST be pure and deterministic.
3. Auth endpoint response time in local test environment SHOULD be <500ms for successful login.

## Acceptance Criteria
1. Given a valid new email and valid password, when register is called, then account is created and password is stored hashed.
2. Given an already registered email, when register is called, then it fails with AUTH_EMAIL_EXISTS.
3. Given an invalid email format, when register is called, then it fails with AUTH_INVALID_EMAIL.
4. Given password length < 8, when register is called, then it fails with AUTH_WEAK_PASSWORD.
5. Given mismatched password and confirmPassword, when register is called, then it fails with AUTH_PASSWORD_MISMATCH.
6. Given valid credentials, when login is called, then it succeeds and returns authenticated user identity.
7. Given unknown email, when login is called, then it fails with AUTH_USER_NOT_FOUND.
8. Given wrong password, when login is called, then it fails with AUTH_INVALID_CREDENTIALS.

## Suggested Boundaries For Tests
- Unit: validation functions, password policy, auth service decision logic.
- Integration: API routes with persistence layer and hashing adapter.
- E2E: register -> login happy path and one invalid-credentials journey.
