import Tabs from "./Tabs";
import { render, screen } from "@testing-library/react";
import { TabTypes, tabs } from "./Settings";
const selectedTab = tabs[0];

const setSelectedTab = (tab: TabTypes) => {
  return null;
};

describe("Renders first tab", () => {
  it("Renders correct tab", () => {
    render(<Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />);
    const firstTab = screen.getByText(selectedTab);
    expect(firstTab).toHaveTextContent(selectedTab);
  });
});
