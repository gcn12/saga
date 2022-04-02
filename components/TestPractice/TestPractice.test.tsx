import TestPractice from "./TestPractice";
import { render, screen } from "@testing-library/react";

describe("Renders correct number", () => {
  it("Renders correct start number", () => {
    render(<TestPractice />);
    const display = screen.getByText(/current number:/i);
    expect(display).toHaveTextContent(/current number: 0/i);
  });

  it("Increments", () => {
    render(<TestPractice />);
    const button = screen.getByText(/click/i);
    button.click();
    button.click();
    const display = screen.getByText(/current number:/i);
    expect(display).toHaveTextContent(/current number: 2/i);
  });
});
