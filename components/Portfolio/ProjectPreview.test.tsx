import { render } from "@testing-library/react";
import ProjectPreview from "./ProjectPreview";
import { axe } from "jest-axe";
import { TabContent } from "../../types/types";

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

const contentPreview = {
  name: "Test",
};

const projectPreview = {
  imageURL: "hello",
  title: "",
  description: "",
  link: "",
  id: "",
  contentPreview: JSON.stringify(contentPreview),
};

const projectPreviews: TabContent[] = [
  {
    username: "Gareth",
    type: "blog",
    contentPreview: "",
    id: "",
    name: "Name",
  },
];

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
