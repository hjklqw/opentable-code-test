import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Dialog } from "./view";

describe("Dialog", () => {
  it("renders the message", () => {
    render(<Dialog message="Test" testId="test" />);

    const dialog = screen.getByTestId("test");
    expect(dialog).toHaveTextContent("Test");
  });

  it("clicking on the close button closes the dialog", async () => {
    render(<Dialog message="Test" testId="test" />);

    const dialog = screen.getByTestId("test");

    userEvent.click(dialog);
    expect(dialog).not.toBeVisible();
  });

  it("the given className is added to the class list", () => {
    render(<Dialog message="Test" testId="test" className="extraClass" />);

    const dialog = screen.getByTestId("test");
    expect(dialog).toHaveClass("wrapper extraClass", { exact: true });
  });
});
