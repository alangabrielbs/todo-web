import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Task } from "@/stores/use-tasks";
import { TodoItem } from "./todo-item";

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  done: false,
  duration: null,
  session_id: "1",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

vi.mock("@/components/todo-item-content", () => ({
  TodoItemContent: () => <div data-testid="todo-item-content" />,
}));

vi.mock("@/components/todo-item-header", () => ({
  TodoItemHeader: () => <div data-testid="todo-item-header" />,
}));

vi.mock("@/components/todo-item-wrapper", () => ({
  TodoItemWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="todo-item-wrapper">{children}</div>
  ),
}));

describe("TodoItem Component", () => {
  it("should render TodoItemHeader and TodoItemContent inside TodoItemWrapper", () => {
    render(
      <TodoItem
        item={mockTask}
        onDelete={() => {}}
        onUpdate={() => {}}
        loading={false}
      />
    );

    expect(screen.getByTestId("todo-item-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-header")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-content")).toBeInTheDocument;
  });
});
