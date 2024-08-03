import { TodoTitle } from "@/components/todo-title";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("TodoTitle Component", () => {
  it("should render without crashing", () => {
    render(<TodoTitle title="Initial title" done={false} />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).toBeInTheDocument();
  });

  it("should display the initial title", () => {
    render(<TodoTitle title="Initial title" done={false} />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).toHaveValue("Initial title");
  });

  it("should call onChangeValue when text changes", () => {
    const onChangeValueMock = vi.fn();
    render(
      <TodoTitle
        title="Initial title"
        done={false}
        onChangeValue={onChangeValueMock}
      />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "New title" } });
    expect(onChangeValueMock).toHaveBeenCalledWith("New title");
  });

  it("should call onBlur with the correct value", () => {
    const onBlurMock = vi.fn();
    render(
      <TodoTitle title="Initial title" done={false} onBlur={onBlurMock} />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "New title" } });
    fireEvent.blur(textarea);
    expect(onBlurMock).toHaveBeenCalledWith("New title");
  });

  it("should not call onBlur if value is unchanged", () => {
    const onBlurMock = vi.fn();
    render(
      <TodoTitle title="Initial title" done={false} onBlur={onBlurMock} />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.blur(textarea);
    expect(onBlurMock).not.toHaveBeenCalled();
  });

  it("should adjust height based on content", () => {
    render(<TodoTitle title="Initial title" done={false} />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "Line 1\nLine 2\nLine 3" } });
    expect(textarea.style.height).not.toBe("20px"); // A altura deve mudar de "20px"
  });

  it("should apply 'line-through' style when done is true", () => {
    render(<TodoTitle title="Initial title" done={true} />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).toHaveClass("line-through");
  });

  it("should not apply 'line-through' style when done is false", () => {
    render(<TodoTitle title="Initial title" done={false} />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).not.toHaveClass("line-through");
  });
});
