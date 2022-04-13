import { render } from "@testing-library/react";
import ProjectPreview from "./ProjectPreview";
import { axe } from "jest-axe";

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
  title: "",
  projectLink: "",
};

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <ProjectPreview projectPreview={projectPreview} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
