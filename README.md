# Memory Banks - Task Management Board

## Purpose
This memory bank provides persistent context for AI assistants working on Task Management Board.
It captures architectural decisions, coding conventions, domain knowledge, and workflows
that should guide all AI-generated code and documentation.

Source of truth for these memory banks:
- specs/prds/task-management-prd.md
- specs/epics/task-management-epics.md
- specs/stories/task-management-stories.md
- AGENTS.md

## Structure

### architecture/
System architecture, technology stack, deployment approach, and key architectural decisions.

### conventions/
Coding standards, naming conventions, testing patterns, error handling, and quality criteria.

### domain/
Business terminology, rules, personas, and concepts unique to this project.

### workflows/
Development processes, review practices, deployment workflows, and collaboration patterns.

### roles/
Role-specific context for developers, QA, product managers, and other contributors.

## Quick Navigation
- [Architecture Overview](./architecture/overview.md)
- [Coding Standards](./conventions/coding-standards.md)
- [Domain Glossary](./domain/glossary.md)
- [Development Workflow](./workflows/development-process.md)
- [Role Context](./roles/README.md)
- [Developer Role Context](./roles/developer.md)
- [QA Role Context](./roles/qa.md)
- [PM Role Context](./roles/pm.md)
- [Impact Analysis](./memory-bank-impact.md)
- [Improvement Log](./IMPROVEMENTS.md)

## How To Use
1. Keep these files in version control with the project.
2. Load the relevant files before asking AI to generate code or documentation.
3. Prefer referencing the smallest set of files needed for the task.
4. Update these files when architecture, workflow, or conventions change.

## Suggested Loading Strategy
- Feature implementation: architecture + conventions + domain + workflow
- API validation or error model work: conventions + domain
- Scheduler and reminders: architecture + conventions + workflow
- Reporting and filtering behavior: domain + architecture

## Maintenance Rules
- Review quarterly or after major architecture/process changes.
- Keep content high-signal and concise.
- Prefer decisions, constraints, and terminology over long examples.
- Remove duplicated information across files.

## Completion Checklist
- [x] Replace all placeholders with real project details
- [x] Confirm conventions align with AGENTS.md
- [x] Define 5-10 domain-specific terms
- [x] Document real or intended workflow end to end
- [ ] Run before/after comparison using the same prompt
- [ ] Capture peer-review refinements in IMPROVEMENTS.md

**Last Updated:** 2026-05-09
**Version:** 1.0
