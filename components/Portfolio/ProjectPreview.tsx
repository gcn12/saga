import { useState } from "react";
import styled from "styled-components";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import AddProjectModal from "./AddProjectModal";
import DeleteExperienceModal from "../DeleteItemModal";
import Project from "./Project";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Tab, TabContent } from "../../types/types";

interface ProjectPreviewProps {
  content: {
    imageURL: string;
    title: string;
    description: string;
    link: string;
    id: string;
  };
  tabContent: TabContent[];
  setTabContent: (tabContent: TabContent[]) => void;
  selectedTab: Tab;
}

export default function ProjectPreview({
  content: project,
  tabContent,
  setTabContent,
  selectedTab,
}: ProjectPreviewProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      <Container>
        {project.imageURL?.length > 0 && (
          <ProjectImage src={project.imageURL} alt="" />
        )}
        <TextContainer>
          <div>
            <Title>{project.title}</Title>
            <p>{project.description}</p>
          </div>
          <Links>
            <ProjectButton onClick={() => setShowProject(true)}>
              CASE STUDY
            </ProjectButton>
            <ProjectLink target="_blank" rel="noreferrer" href={project.link}>
              DEMO
            </ProjectLink>
          </Links>
        </TextContainer>
        {edit && (
          <Menu>
            <MenuButton>:</MenuButton>
            <MenuList style={{ borderRadius: "8px" }}>
              <MenuItem onSelect={() => setShowDialog(true)}>Add</MenuItem>
              <MenuItem onSelect={() => setShowDeleteModal(true)}>
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Container>
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteExperienceModal
            id={project.id}
            setShowDeleteModal={setShowDeleteModal}
            setTabContent={setTabContent}
            tabContent={tabContent}
          />
        )}
      </AnimatePresence>
      {showDialog && (
        <AddProjectModal
          selectedTab={selectedTab}
          setShowDialog={setShowDialog}
          tabContent={tabContent}
          setTabContent={setTabContent}
        />
      )}
      <AnimatePresence>
        {showProject && (
          <Project title={project.title} setShowProject={setShowProject} />
        )}
      </AnimatePresence>
    </>
  );
}

const Container = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: flex-start;
`;

const ProjectImage = styled.img`
  height: 110px;
  width: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 25px;
  flex-shrink: 0;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.08) 0 2px 2px hsl(0deg 0% 0% / 0.08),
    0 4px 4px hsl(0deg 0% 0% / 0.08), 0 8px 8px hsl(0deg 0% 0% / 0.08),
    0 16px 16px hsl(0deg 0% 0% / 0.08);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectLink = styled.a`
  color: var(--accent);
  font-weight: 500;
  font-size: 1rem;
  margin-right: 10px;
  border-bottom: 4px solid transparent;
  &:hover {
    border-bottom: 4px solid var(--accent);
  }
`;

const ProjectButton = styled.button`
  color: var(--accent);
  font-weight: 500;
  font-size: 1rem;
  margin-right: 10px;
  border-bottom: 4px solid transparent;

  &:hover {
    border-bottom: 4px solid var(--accent);
  }
`;

const Title = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-title);
  &::first-letter {
    text-transform: capitalize;
  }
`;

const Links = styled.div`
  margin-top: 8px;
`;
