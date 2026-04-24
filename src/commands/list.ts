import { readStore } from "../storage/file-storage";
import { Todo } from "../types/todo";

const STATUS_LABEL: Record<Todo["status"], string> = {
  pending: "[ ]",
  done: "[x]",
};

export function listTodos(): void {
  const { todos } = readStore();

  if (todos.length === 0) {
    console.log("No todos yet. Add one with: taskflow add <text>");
    return;
  }

  for (const todo of todos) {
    const shortId = todo.id.slice(0, 8);
    const label = STATUS_LABEL[todo.status];
    console.log(`${label} ${shortId}  ${todo.text}`);
  }
}
