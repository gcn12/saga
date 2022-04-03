import { render } from "@testing-library/react";
import ProjectPreview from "./ProjectPreview";
import { axe } from "jest-axe";
import { TabContent, Tab } from "../../Types/types";

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

const content = {
  imageURL: "hello",
  title: "",
  description: "",
  link: "",
  id: "",
};

const tabContent: TabContent[] = [
  { username: "Gareth", type: "blog", content: "", id: "", name: "Name" },
];

const setTabContent = jest.fn();

const selectedTab: Tab = { name: "My tab", type: "largePhoto", key: 9 };

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <ProjectPreview
        content={content}
        setTabContent={setTabContent}
        tabContent={tabContent}
        selectedTab={selectedTab}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
