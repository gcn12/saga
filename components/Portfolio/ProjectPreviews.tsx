import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectPreview as ProjectPreviewType } from "../../types/types";
import AddProjectModal from "./AddProjectModal";
import { ColoredButton } from "../Shared/Buttons";

import { AuthContext } from "../../state/context";
import ProjectPreview from "./ProjectPreview";

export default function Projects() {
  const [projectPreviews, setProjectPreviews] = useState<ProjectPreviewType[]>(
    []
  );
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  useEffect(() => {
    const getExperiences = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/portfolio/${user.id}`
      );
      const data = await res.json();
      console.log(data);
      setProjectPreviews(data);
    };
    getExperiences();
  }, []);

  return (
    <>
      {projectPreviews.map((projectPreview) => {
        return (
          <ProjectPreview
            key={projectPreview.id}
            projectPreviews={projectPreviews}
            setProjectPreviews={setProjectPreviews}
            projectPreview={projectPreview}
          />
        );
      })}
      {showAddProjectModal && (
        <AddProjectModal
          setShowAddProjectModal={setShowAddProjectModal}
          projectPreviews={projectPreviews}
          setProjectPreviews={setProjectPreviews}
        />
      )}
      <motion.div
        layout
        layoutId="hello"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        exit={{ opacity: 0 }}
      >
        <ColoredButton onClick={() => setShowAddProjectModal(true)}>
          Create new blog
        </ColoredButton>
      </motion.div>
    </>
  );
}
