import Education from "./Education";
import { render, screen } from "@testing-library/react";

describe("Renders", () => {
  it("Renders properly", () => {
    render(<Education />);
  });
});

describe("works", () => {
  it("works", () => {
    expect(5).toEqual(5);
  });
});
