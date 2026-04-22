# TaskFlow CLI: Basic Task Management

## What This Feature Does
This update introduces the foundation of TaskFlow CLI, a command-line tool designed to help you manage your to-do list directly from your terminal. 

In this initial release, you can create new tasks and save them to your computer. Each task is automatically assigned a unique identification code, a creation date, and a "todo" status. All your information is stored locally in a simple file, ensuring your data remains on your machine.

## How To Use It
Currently, the tool supports the `add` command. To create a new task, open your terminal and use the following format:

```bash
taskflow add "Your task description here"
```

Once you run this command, the tool creates a record of your task and saves it to a local storage file.

## Important Notes
*   **Initial Version:** This is a foundational release. While you can currently add tasks, the ability to list, edit, or delete them is still being developed and will be available in a future update.
*   **Unique Identifiers:** Tasks currently use long, unique ID strings (UUIDs). These are used to ensure no two tasks are ever confused, though the way you reference tasks may become simpler in future versions.
*   **Concurrent Use:** To prevent data errors, avoid running multiple task commands at the exact same moment, as the system does not yet support simultaneous file writing.
*   **Storage Location:** Your tasks are saved in a standard text-based format (JSON) on your hard drive. Be careful not to manually edit this file, as it could lead to errors in the application.