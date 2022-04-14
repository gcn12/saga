import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Interests from "./Interests";

it("Is accessible", async () => {
  const { container } = render(<Interests />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
