import { render, screen } from "@testing-library/react";
import { TodoItemWrapper } from "./todo-item-wrapper";

describe("TodoItemWrapper Component", () => {
  it("should render children correctly", () => {
    render(
      <TodoItemWrapper loading={false}>
        <span>Test Child</span>
      </TodoItemWrapper>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should apply opacity and disable pointer events when loading is true", () => {
    render(
      <TodoItemWrapper loading={true}>
        <span>Test Child</span>
      </TodoItemWrapper>
    );

    const wrapperDiv = screen.getByText("Test Child").parentElement;
    expect(wrapperDiv).toHaveClass("opacity-50 pointer-events-none");
  });

  it("should not apply opacity and pointer events styles when loading is false", () => {
    render(
      <TodoItemWrapper loading={false}>
        <span>Test Child</span>
      </TodoItemWrapper>
    );

    const wrapperDiv = screen.getByText("Test Child").parentElement;
    expect(wrapperDiv).not.toHaveClass("opacity-50 pointer-events-none");
  });
});
