import { useState } from "react";
import { useRouter } from "next/router";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import moment from "moment";

import DeleteExperienceModal from "../DeleteItemModal";
import ArrowIcon from "../Icons/ArrowIcon";
import { TabContent } from "../../types/types";

interface ExperienceProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  content: {
    timespan: string;
    company: string;
    role: string;
    description: string;
    logo: string;
    id: string;
  };
  startDate: Date;
  endDate: Date;
}

export default function Experience({
  content: experience,
  setTabContent,
  tabContent,
  endDate,
  startDate,
}: ExperienceProps) {
  const [showExpandedExperience, setShowExpandedExperience] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const { edit } = router.query;

  return (
    <Container className="dark">
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteExperienceModal
            id={experience.id}
            setShowDeleteModal={setShowDeleteModal}
            setTabContent={setTabContent}
            tabContent={tabContent}
          />
        )}
      </AnimatePresence>
      <ContentContainer>
        <ExperienceExpand
          onClick={() => setShowExpandedExperience(!showExpandedExperience)}
        >
          <SecondContainer className="light-text dark-text">
            <Header>
              <Arrow>
                <ArrowIcon isOpen={showExpandedExperience} />
              </Arrow>
              <InnerContainer>
                <Company>{experience.company}</Company>
                <p>{experience.role}</p>
              </InnerContainer>
            </Header>
            {/* <Timespan>{experience.timespan}</Timespan> */}
            {console.log(experience)}
            <Timespan>
              {moment(startDate).format("MMM YYYY")} -{" "}
              {moment(endDate).format("MMM YYYY")}
            </Timespan>
          </SecondContainer>
        </ExperienceExpand>
        {edit && (
          <Menu>
            <StyledMenuButton>:</StyledMenuButton>
            <StyledMenuList>
              <MenuItem
                className="menu-highlight"
                onSelect={() => setShowDeleteModal(true)}
              >
                Remove
              </MenuItem>
            </StyledMenuList>
          </Menu>
        )}
      </ContentContainer>
      <DescriptionContainer isExpanded={showExpandedExperience}>
        <Description
          className="light-text"
          dangerouslySetInnerHTML={{
            __html: experience.description || "",
          }}
        />
      </DescriptionContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const StyledMenuList = styled(MenuList)`
  border-radius: 8px;
`;

const StyledMenuButton = styled(MenuButton)`
  padding-left: 10px;
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Header = styled.div`
  display: flex;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ExperienceExpand = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Description = styled.div`
  color: #6e6e6e;
  margin-bottom: 20px;
`;

interface DescriptionContainerProps {
  isExpanded: boolean;
}

const DescriptionContainer = styled.div<DescriptionContainerProps>`
  overflow: hidden;
  max-height: ${(props) => (props.isExpanded ? "500px" : "0px")};
  transition: 300ms ease-in-out;
`;

const Timespan = styled.p`
  align-self: flex-start;
`;

const Company = styled.p`
  font-weight: 600;
  font-size: 1.05rem;
  // color: var(--color-title);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Arrow = styled.div`
  position: absolute;
  left: -22px;
`;
