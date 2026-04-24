#!/usr/bin/env node

import "dotenv/config";
import { Command } from "commander";
import { addTodo } from "./commands/add";
import { listTodos } from "./commands/list";
import { completeTodo } from "./commands/complete";

const program = new Command();

program
  .name("taskflow")
  .description("TaskFlow CLI — a fast, typed todo manager")
  .version("1.0.0");

program
  .command("add <text>")
  .description("Add a new todo")
  .action((text: string) => {
    try {
      addTodo(text);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List all todos")
  .action(() => {
    try {
      listTodos();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program
  .command("complete <id>")
  .description("Mark a todo as done by its ID (or 8-char prefix)")
  .action((id: string) => {
    try {
      completeTodo(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Error: ${message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
