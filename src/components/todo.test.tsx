import { api } from "@/lib/axios";
import { useTasks } from "@/stores/use-tasks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Todo } from "./todo";

// Mock the necessary modules
vi.mock("@/lib/axios", () => ({
  api: {
    delete: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock("@/stores/use-tasks", () => ({
  useTasks: vi.fn(),
}));

vi.mock("./todo-form", () => ({
  TodoForm: () => <div>TodoForm</div>,
}));

vi.mock("./todo-item", () => ({
  TodoItem: ({ item, onDelete, onUpdate }: any) => (
    <div>
      <span>{item.title}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
      <button
        onClick={() => onUpdate({ task: { ...item, title: "Updated Title" } })}
      >
        Update
      </button>
    </div>
  ),
}));

vi.mock("./ui/scroll-area", () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Todo Component", () => {
  const mockTasks = [
    {
      id: "1",
      title: "Test Task 1",
      description: "Description 1",
      done: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Test Task 2",
      description: "Description 2",
      done: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    // @ts-ignore
    (useTasks as vi.Mock).mockReturnValue({
      getAllTasks: vi.fn(),
      data: { tasks: mockTasks },
      loading: false,
    });
  });

  it("should render the Todo component with tasks", () => {
    render(<Todo />);

    // Check if the TodoForm is rendered
    expect(screen.getByText("TodoForm")).toBeInTheDocument();

    // Check if tasks are rendered
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it("should call handleDelete when delete button is clicked", async () => {
    const deleteMock = vi.fn();
    // @ts-ignore
    (api.delete as vi.Mock).mockImplementation(deleteMock);

    render(<Todo />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(`/tasks/1`);
    });
  });

  it("should call handleUpdate when update button is clicked", async () => {
    const updateMock = vi.fn();
    // @ts-ignore
    (api.put as vi.Mock).mockImplementation(updateMock);

    render(<Todo />);

    const updateButton = screen.getAllByText("Update")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledWith(`/tasks/1`, {
        id: "1",
        title: "Updated Title",
        description: "Description 1",
        done: false,
        created_at: mockTasks[0].created_at,
        updated_at: mockTasks[0].updated_at,
      });
    });
  });
});
