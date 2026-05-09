# Domain Glossary: Task Management Board

## Document Purpose
This file defines domain language that an AI assistant is unlikely to infer correctly from code alone.

## How This File Was Derived
- Source documents: PRD, epics, and stories for Task Management Board
- Selection criteria: terms that are likely to be misunderstood without project context
- Scope: MVP terminology only

## Terms

## Backlog
**Definition:** Initial workflow status for newly created tasks.

**Context:** Every new task starts in Backlog by default.

**Example:** A task created through POST /tasks is persisted with status Backlog.

---

## In Progress
**Definition:** Active work status indicating implementation has started.

**Relationships:** Valid predecessor is Backlog; valid successor is In Review.

**Example:** Backlog -> In Progress is allowed; Done -> In Progress is invalid.

---

## In Review
**Definition:** Workflow status where a task is under review before completion.

**Context:** This status is a required gate before Done and can return to In Progress.

**Example:** In Review -> Done is valid; In Review -> Backlog is invalid.

---

## Done
**Definition:** Final workflow status indicating completed and accepted work.

**Context:** Reminder notifications are not sent when task status is Done.

**Example:** Scheduler skips dispatch for tasks in Done at dispatch time.

---

## Audit Record
**Definition:** Immutable log entry capturing a state or assignment change with actor and timestamp.

**Context:** Required for all mutating endpoints and status transitions.

**Example:** Status transition writes previousStatus, nextStatus, actorId, timestamp.

---

## Overdue
**Definition:** Derived boolean state set when current time is later than dueDate and task is not Done.

**Context:** Recalculated by background job every 5 minutes.

**Example:** now > dueDate and status != Done results in overdue=true.

---

## Reminder Offset
**Definition:** Fixed schedule distance from dueDate used to trigger reminders.

**Context:** MVP supports two offsets only: T-24h and T-1h.

**Example:** Job key reminder:{taskId}:{offsetMinutes} is generated for each offset.

---

## Team Lead
**Definition:** Role authorized to assign and reassign tasks and access overdue dashboard summary.

**Context:** Role-based authorization is mandatory for assignment and dashboard endpoints.

**Example:** Non-Team Lead caller receives 403 on assign endpoint.

---

## Filter Preset
**Definition:** User-saved named set of task filter parameters for repeated reporting.

**Context:** Preset name must be unique per user.

**Example:** Saving duplicate preset name for same user returns PRESET_NAME_CONFLICT.

## Key Business Rules

### Deterministic Status Transitions
**Rule:** Allowed transitions are only Backlog -> In Progress, In Progress -> In Review, In Review -> In Progress, and In Review -> Done.

**Rationale:** Ensures reproducible workflow and prevents invalid state jumps.

**Example:** In Progress -> Done returns INVALID_STATUS_TRANSITION.

### Required Task Fields At Creation
**Rule:** Task creation must include title, description, assignee, priority, dueDate, and status.

**Rationale:** Improves ownership clarity and reporting consistency.

**Example:** Missing assignee returns VALIDATION_REQUIRED_FIELD.

### Reminder Dispatch Eligibility
**Rule:** Send reminders only when task is not Done and dueDate supports offset scheduling.

**Rationale:** Prevents noisy or irrelevant notifications.

**Example:** Done tasks do not receive T-24h or T-1h reminders.

### Deterministic Filtering
**Rule:** Filtered task lists must sort by dueDate ascending then createdAt ascending.

**Rationale:** Keeps report outputs reproducible across users.

**Example:** Same filter params must return same ordering unless data changed.

## Terms Commonly Misused By AI
- task: work item in board with required metadata, not a generic checklist item
- status: finite state machine value, not arbitrary free text
- overdue: computed state from dueDate and status, not manual label
- Team Lead: authorization role with restricted assignment permissions
- audit: immutable event history, not optional debug logging

## Non-Negotiable Domain Notes For AI
- Use the exact domain terminology in this file.
- Do not replace project-specific terms with generic synonyms.
- Preserve business-rule language when generating validations or workflows.