import { render } from "@testing-library/react";
import Introduction from "./Introduction";
import { axe } from "jest-axe";
import { TabContent, Tab } from "../../Types/types";
const tabContent: TabContent[] = [
  { username: "Gareth", type: "blog", content: "", id: "", name: "Name" },
];

const setTabContent = jest.fn();

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

const selectedTab: Tab = { name: "My tab", type: "largePhoto", key: 9 };
describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <Introduction
        tabContent={tabContent}
        content={""}
        index={5}
        setTabContent={setTabContent}
        selectedTab={selectedTab}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
