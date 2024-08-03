import { api } from "@/lib/axios";
import { useTasks } from "@/stores/use-tasks";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { TodoForm } from "./todo-form";

// Mock the necessary modules
vi.mock("@/lib/axios", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("@/stores/use-tasks", () => ({
  useTasks: vi.fn(),
}));

describe("TodoForm Component", () => {
  beforeEach(() => {
    // @ts-ignore
    (useTasks as vi.Mock).mockReturnValue({
      getAllTasks: vi.fn(),
    });
  });

  it("should render the TodoForm correctly", () => {
    render(<TodoForm />);

    // Check if the input field is rendered
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("should call api.post and getAllTasks on form submission with valid data", async () => {
    const postMock = vi.fn();
    // @ts-ignore
    (api.post as vi.Mock).mockImplementation(postMock);

    const getAllTasksMock = vi.fn();
    // @ts-ignore
    (useTasks as vi.Mock).mockReturnValue({
      getAllTasks: getAllTasksMock,
    });

    render(<TodoForm />);

    // Fill in the input field
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Task" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith("/tasks", { title: "New Task" });
      expect(getAllTasksMock).toHaveBeenCalled();
    });
  });

  it("should display validation errors when form is submitted with invalid data", async () => {
    render(<TodoForm />);

    // Submit the form without filling in the input field
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    // Check for validation error message
    await waitFor(() => {
      expect(screen.getByText("O título é obrigatório")).toBeInTheDocument();
    });
  });
});
