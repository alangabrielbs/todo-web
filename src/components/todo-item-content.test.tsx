import { Task } from "@/stores/use-tasks";
import { fireEvent, render, screen } from "@testing-library/react";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { vi } from "vitest";
import { TodoItemContent } from "./todo-item-content";

vi.mock("@/components/ui/hover-card", () => ({
  HoverCardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

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

describe("TodoItemContent Component", () => {
  it("should render without crashing", () => {
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={() => {}}
        onUpdate={() => {}}
        loading={false}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should display the creation date correctly", () => {
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={() => {}}
        onUpdate={() => {}}
        loading={false}
      />
    );

    const createdDate = formatDistanceToNowStrict(
      new Date(mockTask.created_at).setHours(-2),
      {
        locale: ptBR,
        addSuffix: true,
      }
    );

    expect(screen.getByText(`Criado ${createdDate}`)).toBeInTheDocument();
  });

  it("should call onDelete when the delete button is clicked", () => {
    const onDeleteMock = vi.fn();
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={onDeleteMock}
        onUpdate={() => {}}
        loading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /apagar/i }));
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  it("should call onUpdate with done state toggled when the toggle button is clicked", () => {
    const onUpdateMock = vi.fn();
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={() => {}}
        onUpdate={onUpdateMock}
        loading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Marcar como feito/i }));
    expect(onUpdateMock).toHaveBeenCalledWith({
      task: { ...mockTask, done: true },
    });
  });

  it("should call onUpdate with new title on blur", () => {
    const onUpdateMock = vi.fn();
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={() => {}}
        onUpdate={onUpdateMock}
        loading={false}
      />
    );

    const titleInput = screen.getByDisplayValue("Test Task");
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });

    fireEvent.blur(titleInput);

    expect(onUpdateMock).toHaveBeenCalledWith({
      task: { ...mockTask, title: "Updated Task" },
    });
  });
  it("should call onUpdate with new description on blur", () => {
    const onUpdateMock = vi.fn();
    render(
      <TodoItemContent
        item={mockTask}
        onDelete={() => {}}
        onUpdate={onUpdateMock}
        loading={false}
      />
    );

    const descriptionInput = screen.getByDisplayValue("Test Description");
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    fireEvent.blur(descriptionInput);

    expect(onUpdateMock).toHaveBeenCalledWith({
      task: { ...mockTask, description: "Updated Description" },
    });
  });
});
