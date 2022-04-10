import { render } from "@testing-library/react";
import ProjectPreview from "./ProjectPreview";
import { axe } from "jest-axe";
import { ProjectPreview as ProjectPreviewTypes } from "../../types/types";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const projectPreview = {
  description: "",
  id: "",
  imageURL: "",
  projectLink: "",
  title: "",
};

const projectPreviews: ProjectPreviewTypes[] = [projectPreview];

const setProjectPreviews = jest.fn();

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <ProjectPreview
        projectPreview={projectPreview}
        setProjectPreviews={setProjectPreviews}
        projectPreviews={projectPreviews}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
