import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Description } from "@/components/todo-description";

describe("TodoDescription", () => {
  it("should render a description", () => {
    render(<Description description="description" />);

    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).toBeInTheDocument();
  });

  it("should display the initial description", () => {
    render(<Description description="Initial description" />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    expect(textarea).toHaveValue("Initial description");
  });

  it("should call onChangeValue when text changes", () => {
    const onChangeValueMock = vi.fn();
    render(
      <Description
        description="Initial description"
        onChangeValue={onChangeValueMock}
      />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "New description" } });
    expect(onChangeValueMock).toHaveBeenCalledWith("New description");
  });

  it("should call onBlur with the correct value", () => {
    const onBlurMock = vi.fn();
    render(
      <Description description="Initial description" onBlur={onBlurMock} />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "New description" } });
    fireEvent.blur(textarea);
    expect(onBlurMock).toHaveBeenCalledWith("New description");
  });

  it("should not call onBlur if value is unchanged", () => {
    const onBlurMock = vi.fn();
    render(
      <Description description="Initial description" onBlur={onBlurMock} />
    );
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.blur(textarea);
    expect(onBlurMock).not.toHaveBeenCalled();
  });

  it("should adjust height based on content", () => {
    render(<Description description="Initial description" />);
    const textarea = screen.getByPlaceholderText("Adicionar descrição...");
    fireEvent.change(textarea, { target: { value: "Line 1\nLine 2\nLine 3" } });
    expect(textarea.style.height).not.toBe("auto");
  });
});
