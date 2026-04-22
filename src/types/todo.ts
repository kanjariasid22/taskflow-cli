export type TodoStatus = "pending" | "done";

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  createdAt: string;
}

export interface TodoStore {
  todos: Todo[];
}
