import { useState } from "react";
import styled from "styled-components";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import DeleteExperienceModal from "../DeleteItemModal";
import Project from "./Project";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ProjectPreview as ProjectPreviewTypes } from "../../types/types";

interface ProjectPreviewProps {
  projectPreview: ProjectPreviewTypes;
  projectPreviews: ProjectPreviewTypes[];
  setProjectPreviews: (projectPreview: ProjectPreviewTypes[]) => void;
}

export default function ProjectPreview({
  projectPreview,
  projectPreviews,
  setProjectPreviews,
}: ProjectPreviewProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const router = useRouter();
  const { edit } = router.query;

  const { imageURL, title, description, id, projectLink } = projectPreview;

  return (
    <>
      <Container>
        {imageURL?.length > 0 && <ProjectImage src={imageURL} alt="" />}
        <TextContainer>
          <div>
            <Title>{title}</Title>
            <p>{description}</p>
          </div>
          <Links>
            <ProjectButton onClick={() => setShowProject(true)}>
              VIEW
            </ProjectButton>
            <ProjectLink target="_blank" rel="noreferrer" href={projectLink}>
              DEMO
            </ProjectLink>
          </Links>
        </TextContainer>
        {edit && (
          <Menu>
            <MenuButton>:</MenuButton>
            <MenuList style={{ borderRadius: "8px" }}>
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
            endpoint="project/delete-project"
            id={id}
            setShowDeleteModal={setShowDeleteModal}
            setTabContent={setProjectPreviews}
            tabContent={projectPreviews}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showProject && (
          <Project
            projectID={id}
            title={title}
            setShowProject={setShowProject}
          />
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
`;

const Links = styled.div`
  margin-top: 8px;
`;
