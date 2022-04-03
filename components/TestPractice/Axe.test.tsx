import { render } from "@testing-library/react";
import Axe from "./Axe";
import { axe } from "jest-axe";

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(<Axe />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
