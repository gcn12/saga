import TestPractice from "./TestPractice";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Renders correct number", () => {
  it("Renders correct start number", () => {
    render(<TestPractice />);
    const display = screen.getByText("Current number: 0");
    expect(display).toHaveTextContent("Current number: 0");
  });

  it("Increments", () => {
    render(<TestPractice />);
    const button = screen.getByText(/click/i);
    act(() => {
      button.click();
      button.click();
    });
    const display = screen.getByText("Current number: 2");
    expect(display).toHaveTextContent("Current number: 2");
  });
});
