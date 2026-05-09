# AI Output Without Memory Banks

## Session Setup
- Session type: Fresh session with no memory-bank files loaded
- Prompt source: Same prompt used in output-with-memory.md

## Prompt Used
```text
Generate a TypeScript REST endpoint for changing a task status.
Include validation, transition rules, and persistence.
Return proper HTTP responses for success and invalid transitions.
```

## Generated Output
```ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function changeTaskStatus(req: Request, res: Response) {
	const { taskId } = req.params;
	const { status } = req.body;

	const task = await prisma.task.findUnique({ where: { id: taskId } });
	if (!task) {
		return res.status(404).json({ error: "Task not found" });
	}

	// Generic transition check (allows invalid paths for this project)
	const allowed = ["Backlog", "In Progress", "In Review", "Done"];
	if (!allowed.includes(status)) {
		return res.status(400).json({ error: "Invalid status" });
	}

	const updated = await prisma.task.update({
		where: { id: taskId },
		data: { status },
	});

	return res.status(200).json(updated);
}
```

## Quick Evaluation
- Correct stack usage (TypeScript + Node.js + Prisma): [Yes/No]
- Deterministic transition matrix implemented: [Yes/No]
- Structured error contract (code, field, message): [Yes/No]
- Audit write included: [Yes/No]
- Tests included and aligned to story: [Yes/No]
- Correct stack usage (TypeScript + Node.js + Prisma): Yes
- Deterministic transition matrix implemented: No
- Structured error contract (code, field, message): No
- Audit write included: No
- Tests included and aligned to story: No

## Issues To Correct
- Missing Story 1.4 transition matrix restrictions and allows invalid state jumps.
- Returns generic errors instead of deterministic codes (for example INVALID_STATUS_TRANSITION).
- Does not write audit record with previousStatus, nextStatus, actorId, timestamp.
- No idempotency handling by requestId.
- No tests for authorization, validation, and conflict behavior.

## Estimated Fix Time
- 44 minutes