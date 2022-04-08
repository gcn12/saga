import Contact from "./Contact";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

describe("checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(<Contact />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
