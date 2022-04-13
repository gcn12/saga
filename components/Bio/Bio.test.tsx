import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Bio from "./Bio";

it("Check accessibility", async () => {
  const { container } = render(<Bio />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
