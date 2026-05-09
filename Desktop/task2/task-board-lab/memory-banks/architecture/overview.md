# Architecture Overview: Task Management Board

## Document Purpose
Use this file to give AI assistants a high-signal view of how the system is shaped,
why it is shaped that way, and which technical choices are non-negotiable for MVP delivery.

## Project Summary
- Project: Task Management Board
- Primary goal: Provide one web-based board for planning, assignment, deterministic status progression, and due-date control.
- Primary users: Individual Contributor, Team Lead, Project Manager
- Success metrics:
	1. 100% of tasks include required fields at create time.
	2. At least 95% of valid transitions are audit logged with actor and timestamp.
	3. Overdue task rate decreases by at least 20% within 8 weeks.
	4. Reminder delivery for due-soon tasks reaches at least 99%.
	5. Weekly status-report preparation time drops from 3 hours to 30 minutes or less.

## System Architecture

### Architecture Pattern
- Pattern: Modular monolith
- Rationale: MVP scope is bounded to one team and one product domain; a modular monolith minimizes operational complexity while preserving feature boundaries.
- Constraints:
	1. Delivery deadline is 6 calendar weeks.
	2. Maximum concurrent active users in MVP is 50.
	3. Team size assumption is 8-20 users.

### Core Components
- tasks: Task CRUD, deterministic status transitions, field-level validation
- users: Assignee lookup and role checks for Team Lead restricted actions
- audit: Writes immutable task lifecycle and assignment events
- notifications: Reminder scheduling and dispatch (email and in-app)
- reporting: Filtered board query behavior and overdue summary views

### Communication Patterns
- Synchronous: REST over HTTPS between UI and backend API
- Asynchronous: Scheduler-driven jobs for reminder and overdue recalculation flows
- External integrations: SMTP provider for reminder email delivery

### Data Flow
1. User triggers task action from board UI (create, update, assign, transition, filter).
2. API route receives request and validates payload with zod schemas.
3. Authorization guard enforces role rules (for example, Team Lead only for assignment).
4. Domain rules execute (required fields, allowed transitions, date constraints).
5. Prisma persists changes in PostgreSQL and writes required audit records.
6. Scheduler module queues or updates reminder jobs for T-24h and T-1h offsets.
7. Response returns deterministic output shape or structured error schema.

## Tech Stack

### Backend
- Language: TypeScript 5.x
- Framework: Node.js service architecture (framework not explicitly specified)
- Runtime: Node.js 22 LTS
- API style: REST over HTTPS

### Frontend
- Language: TypeScript (assumed for consistency with backend)
- Framework: Not specified in provided artifacts
- UI system: Not specified in provided artifacts
- State management: Not specified in provided artifacts

### Data Layer
- Primary database: PostgreSQL 16
- Secondary storage: None required for MVP
- ORM/query layer: Prisma
- Migration approach: Prisma migrations; must be reversible in non-production environments

### Infrastructure
- Cloud provider: Not specified in provided artifacts
- Containers: Not specified in provided artifacts
- Orchestration: Not specified in provided artifacts
- CI/CD: Not specified in provided artifacts
- Observability: Structured JSON logs plus audit table for lifecycle traceability

### Testing Stack
- Unit tests: Vitest
- Integration tests: Supertest
- E2E tests: Not specified for MVP
- Static analysis: ESLint plus TypeScript ESLint

## Deployment

### Environments
- Local: Developer runtime with Node.js 22, PostgreSQL 16, and SMTP test configuration
- Dev: Environment details not yet documented
- Staging: Environment details not yet documented
- Production: Environment details not yet documented

### CI/CD Pipeline
1. Pull request opened or updated.
2. Linting and test suites execute (unit, integration, contract).
3. Coverage thresholds are enforced (minimum 85% lines and branches).
4. Build and migration checks run.
5. Authorized reviewer approval gates merge.
6. Deployment behavior is pending environment design.

### Deployment Strategy
- Strategy: Pending final infrastructure decision
- Rollback: Revert migration and service version in non-production; production rollback process pending
- Release guards: Required tests, role authorization tests on new endpoints, and audit-write verification on mutating endpoints

## Architectural Decisions

### Decision 1: Deterministic Task State Machine
- Choice: Restrict transitions to Backlog -> In Progress -> In Review -> Done, with In Review -> In Progress allowed.
- Why: Prevent ambiguous workflow movement and make progress reporting reproducible.
- Tradeoff: Less flexibility for teams that want custom state models.

### Decision 2: Mandatory Audit Logging For All Mutations
- Choice: Every mutating endpoint must write audit records with actorId and timestamp.
- Why: Ensures traceability for operational reviews and acceptance-criteria compliance.
- Tradeoff: Additional write overhead and larger storage footprint.

### Decision 3: Reminder Offsets As Fixed Product Rules
- Choice: Reminder notifications are sent at T-24h and T-1h for eligible tasks.
- Why: Directly supports overdue reduction metric and standardizes user expectations.
- Tradeoff: Less configurability in MVP.

## Non-Negotiable Constraints For AI
- Do not change the architecture pattern without explicit approval.
- Use the documented stack and versions unless a migration is requested.
- Respect the communication and deployment patterns in this document.
- Prefer existing modules and services over creating new system boundaries.
- All status transitions and assignment changes must produce audit events.
- Preserve deterministic error codes defined in stories for validation and conflict cases.

## Open Questions
- Which backend framework should wrap the Node.js service layer (for example, Express, Fastify, or NestJS)?
- What are the production deployment platform and rollback runbook details?
- Should reminder dispatch use a dedicated queue technology in MVP or database-backed scheduler only?