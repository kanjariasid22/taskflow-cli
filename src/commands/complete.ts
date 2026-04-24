import { readStore, writeStore } from "../storage/file-storage";

export function completeTodo(idPrefix: string): void {
  const trimmed = idPrefix.trim();
  if (!trimmed) {
    console.error("Error: ID cannot be empty.");
    process.exit(1);
  }

  const store = readStore();

  // Match by full UUID or the 8-char short prefix shown by list/add
  const match = store.todos.find(
    (t) => t.id === trimmed || t.id.startsWith(trimmed)
  );

  if (!match) {
    console.error(`Error: No todo found matching ID "${trimmed}".`);
    process.exit(1);
  }

  if (match.status === "done") {
    console.log(`Already done: [${match.id.slice(0, 8)}] ${match.text}`);
    return;
  }

  const updated = {
    todos: store.todos.map((t) =>
      t.id === match.id ? { ...t, status: "done" as const } : t
    ),
  };

  writeStore(updated);
  console.log(`Completed: [${match.id.slice(0, 8)}] ${match.text}`);
}
