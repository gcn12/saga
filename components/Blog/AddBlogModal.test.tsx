import { render } from "@testing-library/react";
import AddBlogModal from "./AddBlogModal";
import { axe } from "jest-axe";
import { TabContent, Tab } from "../../types/types";
const tabContent: TabContent[] = [
  {
    username: "Gareth",
    type: "blog",
    contentPreview: "",
    id: "",
    name: "Name",
  },
];

const setTabContent = jest.fn();

const setShowDialog = jest.fn();

const selectedTab: Tab = { name: "My tab", type: "largePhoto", key: 9 };
describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AddBlogModal
        tabContent={tabContent}
        setTabContent={setTabContent}
        selectedTab={selectedTab}
        setShowDialog={setShowDialog}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
