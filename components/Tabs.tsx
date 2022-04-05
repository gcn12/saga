import styled from "styled-components";
import { Tab } from "../types/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface TabsProps {
  tabs: Tab[];
  selectedTab: Tab;
}

export default function Tabs({ tabs, selectedTab }: TabsProps) {
  const router = useRouter();
  const { username, edit = false } = router.query;
  return (
    <Container>
      {tabs.map((tab: Tab) => {
        return (
          <Container key={tab.name}>
            <Link
              href={`/${username}/${tab.name}${edit ? "?edit=true" : ""}`}
              scroll={false}
            >
              <a>
                <TabText isSelected={tab.name === selectedTab.name}>
                  {tab.name}
                </TabText>
              </a>
            </Link>
          </Container>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  margin-right: 15px;
`;

interface Props {
  isSelected: boolean;
}

const TabText = styled.p<Props>`
  font-weight: 600;
  text-transform: uppercase;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  letter-spacing: 1px;
  &:hover {
    border-bottom: 4px solid var(--accent) !important;
  }
  transition: border-bottom 0.3s ease-in-out;
  border-bottom: ${(props) =>
    props.isSelected ? "4px solid var(--accent)" : "4px solid transparent"};
`;
