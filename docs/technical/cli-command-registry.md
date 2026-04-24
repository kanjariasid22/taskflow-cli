# Technical Documentation: Todo Management Commands (List & Complete)

## Overview
This update introduces core task management functionality to the `taskflow-cli` via two new commands: `list` and `complete`. These commands allow users to view their current tasks with status indicators and mark specific tasks as finished using either a full UUID or a shortened unique prefix.

## What Changed

### CLI Commands
- **`list`**: Retrieves all todos from local storage and displays them in the console. Each entry includes a status checkbox (`[ ]` for pending, `[x]` for done), an 8-character truncated ID, and the task description.
- **`complete <id>`**: Marks a specific todo as "done". It accepts a string argument representing the task's ID.

### Logic & Storage Interaction
- **ID Prefix Matching**: To improve CLI usability, the `complete` command implements prefix matching. Users can provide the full UUID or just the first few characters (typically the 8 characters shown in the `list` command).
- **Status Updates**: When a task is marked as complete, the status in the local JSON store is updated from `pending` to `done`.
- **Validation**:
    - Prevents empty ID inputs.
    - Errors out if no matching ID is found.
    - Notifies the user if a task is already marked as done without re-writing to storage.

## Why It Changed
The addition of `list` and `complete` moves the application from a simple "add-only" tool to a functional task tracker. Implementing the 8-character ID prefix matching specifically addresses the friction of manual entry in a CLI environment, as full UUIDs are cumbersome for users to type.

## Affected Modules

- **`src/index.ts`**: Updated the command registry to include the new `list` and `complete` command definitions and their respective argument parsing.
- **`src/commands/list.ts`**: New module containing the logic for formatting and displaying the task list.
- **`src/commands/complete.ts`**: New module containing the logic for ID lookups, prefix matching, and state transition.
- **`src/storage/file-storage.ts`**: Utilized by both new commands for reading and writing task data.

## API / Interface Changes

### CLI Interface
| Command | Arguments | Description |
| :--- | :--- | :--- |
| `taskflow list` | N/A | Displays all tasks with their 8-char ID and status. |
| `taskflow complete <id>` | `id` (string) | Marks task as done. Accepts full UUID or prefix. |

**Output Examples:**
- `list`: `[ ] a1b2c3d4 Buy milk`
- `complete`: `Completed: [a1b2c3d4] Buy milk`

## Developer Notes

### ID Collision Resolution
In the event that a provided ID prefix matches multiple tasks, the system currently resolves the conflict by selecting the task that was added first (the first occurrence in the storage array). 

### Error Handling
The current implementation uses repetitive `try-catch` blocks within the `index.ts` command registrations. There is a planned refactoring task to abstract this error handling into a middleware or a higher-order function to reduce boilerplate code.

### Future Enhancements
- **Color Coding**: There are plans to implement `chalk` or a similar library to provide color-coded output (e.g., green for completed tasks, red for pending).
- **Robust Completion Checks**: While the system currently identifies if a task is already "done" via a console message, further logic may be added to prevent unnecessary map operations on the storage object in these cases.