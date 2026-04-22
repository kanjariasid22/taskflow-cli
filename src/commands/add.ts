import crypto from "crypto";
import { Todo } from "../types/todo";
import { readStore, writeStore } from "../storage/file-storage";

export function addTodo(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) {
    console.error("Error: Todo text cannot be empty.");
    process.exit(1);
  }

  const store = readStore();

  const todo: Todo = {
    id: crypto.randomUUID(),
    text: trimmed,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const updated = { todos: [...store.todos, todo] };
  writeStore(updated);

  console.log(`Added: [${todo.id.slice(0, 8)}] ${todo.text}`);
}
