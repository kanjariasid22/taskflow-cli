import fs from "fs";
import path from "path";
import { TodoStore } from "../types/todo";

const TASKS_FILE = path.resolve(process.env.TASKS_FILE_PATH ?? "tasks.json");

const EMPTY_STORE: TodoStore = { todos: [] };

export function readStore(): TodoStore {
  if (!fs.existsSync(TASKS_FILE)) {
    return { ...EMPTY_STORE, todos: [] };
  }

  const raw = fs.readFileSync(TASKS_FILE, "utf-8").trim();
  if (!raw) {
    return { ...EMPTY_STORE, todos: [] };
  }

  const parsed: unknown = JSON.parse(raw);
  if (!isValidStore(parsed)) {
    throw new Error(`Corrupted tasks file at ${TASKS_FILE}`);
  }

  return parsed;
}

export function writeStore(store: TodoStore): void {
  const dir = path.dirname(TASKS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(TASKS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

function isValidStore(value: unknown): value is TodoStore {
  return (
    typeof value === "object" &&
    value !== null &&
    "todos" in value &&
    Array.isArray((value as TodoStore).todos)
  );
}
