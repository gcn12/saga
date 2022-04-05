import { render } from "@testing-library/react";
import Account from "./Account";
import { axe } from "jest-axe";

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(<Account />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
