import styled from "styled-components";
import { tabs, TabTypes } from "./Settings";

interface TabsProps {
  selectedTab: TabTypes;
  setSelectedTab: (tab: TabTypes) => void;
}

export default function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <Container>
      {tabs.map((tab) => {
        return (
          <TabText
            key={tab}
            onClick={() => setSelectedTab(tab)}
            isSelected={selectedTab === tab}
          >
            {tab}
          </TabText>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
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
