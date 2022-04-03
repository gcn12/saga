import Colors from "./Colors";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

describe("Is accessible", () => {
  it("is accessible", async () => {
    const { container } = render(<Colors />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
