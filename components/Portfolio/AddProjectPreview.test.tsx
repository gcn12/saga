import { render } from "@testing-library/react";
import AddProjectPreview from "./AddProjectPreview";
import { axe } from "jest-axe";
import { Project } from "../../types/types";

const project: Project[] = [{ content: "Content", key: 1, type: "header" }];

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AddProjectPreview project={project} title="My project" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
