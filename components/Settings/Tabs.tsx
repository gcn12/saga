import styled from "styled-components";
import { tabs, TabTypes } from "./Settings";
import Spacer from "../Shared/Spacer";
import { Fragment } from "react";

interface TabsProps {
  selectedTab: TabTypes;
  setSelectedTab: (tab: TabTypes) => void;
}

export default function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <Container>
      {tabs.map((tab) => {
        return (
          <Fragment key={tab}>
            <TabText
              onClick={() => setSelectedTab(tab)}
              isSelected={selectedTab === tab}
            >
              {tab}
            </TabText>
            <Spacer size={16} axis="x" />
          </Fragment>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

interface Props {
  isSelected: boolean;
}

const TabText = styled.button<Props>`
  font-weight: 600;
  text-transform: uppercase;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.92rem;
  letter-spacing: 1px;
  &:hover {
    border-bottom: 3px solid var(--accent) !important;
  }
  transition: border-bottom 0.3s ease-in-out;
  border-bottom: ${(props) =>
    props.isSelected ? "3px solid var(--accent)" : "3px solid transparent"};
`;
