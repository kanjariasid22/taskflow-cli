# Technical Documentation: TaskFlow CLI Initialization

## Overview
The `taskflow-cli` project is a TypeScript-based command-line interface (CLI) designed for lightweight task management. This initial release establishes the project architecture, including a command-line parser, a file-based persistence layer, and the core "add todo" functionality. The application prioritizes type safety and minimal external dependencies, utilizing a local JSON file for data storage to avoid the overhead of a formal database.

## What Changed
### Project Infrastructure
- **TypeScript Configuration:** Established a `tsconfig.json` targeting `ES2020` with `CommonJS` module output.
- **Build & Dev Tooling:** Integrated `nodemon` and `ts-node` for a seamless development workflow and added scripts for building (`tsc`) and linting (`eslint`).
- **Environment Management:** Added `dotenv` support to allow configuration via a `.env` file, specifically for defining the storage file path.

### Core Functionality
- **CLI Entry Point:** Implemented `src/index.ts` using the `Commander` library to handle argument parsing and command routing.
- **Add Command:** Created the `add <text>` command in `src/commands/add.ts`. This command:
    - Trims and validates input.
    - Generates a unique identifier using `crypto.randomUUID()`.
    - Timestamps the entry in ISO format.
    - Persists the new task with a default status of `"pending"`.
- **Storage Layer:** Developed a file-based storage engine in `src/storage/file-storage.ts` that handles reading/writing the JSON store and performs basic schema validation to detect file corruption.

### Data Model
- **Type Definitions:** Defined `Todo` and `TodoStore` interfaces in `src/types/todo.ts` to ensure consistent data structures across the application.

## Why It Changed
The project was initialized to provide a "production-ready" terminal utility for task tracking. TypeScript was selected for its type-checking capabilities, reducing runtime errors. The choice of local JSON storage ensures that the tool remains portable and has a minimal footprint. 

During the design phase, **CommonJS** was specifically chosen as the module target over ECMAScript Modules (ESM) to maintain maximum compatibility with the current ecosystem of third-party Node.js packages.

## Affected Modules
- **CLI Entry Point (`src/index.ts`):** Manages the primary command definitions and global error handling.
- **Commands Module (`src/commands/`):** Contains the business logic for specific CLI actions (starting with `add`).
- **Storage Layer (`src/storage/`):** Abstracts the file system operations (FS) and environment-based path resolution.
- **Types Definitions (`src/types/`):** Centralizes the data schemas used by both the storage and command layers.

## API/Interface Changes

### CLI Commands
| Command | Argument | Description |
| :--- | :--- | :--- |
| `taskflow add` | `<text>` | Adds a new task to the store. Errors if text is empty. |

### Environment Variables
| Variable | Default | Description |
| :--- | :--- | :--- |
| `TASKS_FILE_PATH` | `tasks.json` | Relative or absolute path to the task storage file. |

## Developer Notes
- **Identifier Strategy:** Tasks currently use full UUIDs for internal identification. While the CLI logs a short 8-character prefix for readability, the full UUID is the primary key in the JSON store.
- **Module System:** Do not convert the project to ESM without verifying support for all dependencies listed in `package.json`.
- **Concurrency:** The current storage implementation does not include file locking. Concurrent writes from multiple terminal instances may lead to data loss. This is identified as a future improvement.
- **Data Integrity:** The `readStore` function includes a `isValidStore` guard. If the `tasks.json` structure is manually edited and invalidated, the CLI will throw a "Corrupted tasks file" error.
- **Future Roadmap:** Subsequent updates are planned to include `list`, `delete`, and `update` commands, along with automated testing for the storage layer.