import { render } from "@testing-library/react";
import More from "./More";
import { axe } from "jest-axe";

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(<More />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
