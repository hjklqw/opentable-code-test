import { render, screen } from "@testing-library/react";

import { Alert } from "./view";
import { AlertType } from "./models";

describe("Alert", () => {
  it("SUCCESS type has the correct className and renders the given message", () => {
    render(<Alert type={AlertType.SUCCESS} message="Test" testId="test" />);

    const alert = screen.getByTestId("test");
    expect(alert).toHaveTextContent("Test");
    expect(alert).toHaveClass("alert success");
  });

  it("ERROR type has the correct className and renders the given message", () => {
    render(<Alert type={AlertType.ERROR} message="Test" testId="test" />);

    const alert = screen.getByTestId("test");
    expect(alert).toHaveTextContent("Test");
    expect(alert).toHaveClass("alert error");
  });

  it("the given className is added to the class list", () => {
    render(
      <Alert
        type={AlertType.SUCCESS}
        message=""
        className="extraClass"
        testId="test"
      />
    );

    const alert = screen.getByTestId("test");
    expect(alert).toHaveClass("alert success extraClass", { exact: true });
  });
});
