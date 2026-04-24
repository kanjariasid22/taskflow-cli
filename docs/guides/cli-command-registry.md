# Managing Tasks with Taskflow-CLI

This update introduces two essential commands to help you track and manage your to-do list: `list` and `complete`. These features allow you to view your current progress and mark items as finished using shortened identifiers.

### What This Feature Does

*   **View All Tasks:** You can now see a full list of your saved tasks. Each task displays a status checkbox and a unique 8-character ID.
*   **Mark as Done:** You can mark specific tasks as completed. Once a task is marked as done, its status icon will change to reflect that it is finished.
*   **Shortened IDs:** To save time, you don't need to type out long, complicated identification numbers. You can interact with any task using just the first 8 characters of its ID.

### How To Use It

#### Viewing your list
To see all your current tasks and their status, use the list command:
`taskflow list`

You will see output similar to this:
*   `[ ] a1b2c3d4 - Buy groceries` (Pending task)
*   `[x] e5f6g7h8 - Respond to emails` (Completed task)

#### Completing a task
To mark a task as finished, use the complete command followed by the 8-character ID shown in your list:
`taskflow complete a1b2c3d4`

The system will update the task's status to "done" in your local storage.

### Important Notes

*   **Duplicate IDs:** In the rare event that two different tasks have the same first 8 characters, the system will prioritize the older task (the one created first).
*   **Current Status Icons:** Currently, the list uses text-based symbols to show status: `[ ]` means the task is still pending, and `[x]` means the task is complete.
*   **Re-completing Tasks:** If you attempt to complete a task that is already marked as done, the system will process the request but the status will remain "complete."