import { render } from "@testing-library/react";
import Settings from "./Settings";
import { axe } from "jest-axe";

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(<Settings />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
