import { Task } from "@/stores/use-tasks";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { TodoItemHeader } from "./todo-item-header";

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

describe("TodoItemHeader Component", () => {
  it("should render the task title", () => {
    render(<TodoItemHeader item={mockTask} onUpdate={() => {}} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should apply 'line-through' style when the task is done", () => {
    render(
      <TodoItemHeader item={{ ...mockTask, done: true }} onUpdate={() => {}} />
    );

    const titleElement = screen.getByText("Test Task");
    expect(titleElement).toHaveClass("line-through");
  });

  it("should not apply 'line-through' style when the task is not done", () => {
    render(<TodoItemHeader item={mockTask} onUpdate={() => {}} />);

    const titleElement = screen.getByText("Test Task");
    expect(titleElement).not.toHaveClass("line-through");
  });

  it("should call onUpdate with toggled done state when checkbox is clicked", () => {
    const onUpdateMock = vi.fn();
    render(<TodoItemHeader item={mockTask} onUpdate={onUpdateMock} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onUpdateMock).toHaveBeenCalledWith({
      task: { ...mockTask, done: true },
    });
  });
});
