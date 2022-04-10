import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import { ProjectPreview as ProjectPreviewType } from "../../types/types";
import AddProjectModal from "./AddProjectModal";
import { ColoredButton } from "../Shared/Buttons";
import { AuthContext } from "../../state/context";
import ProjectPreview from "./ProjectPreview";

export default function Projects() {
  const [projectPreviews, setProjectPreviews] = useState<ProjectPreviewType[]>(
    []
  );
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { edit } = router.query;

  useEffect(() => {
    const getExperiences = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/portfolio/${user.id}`
      );
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
      const data = await res.json();
      setProjectPreviews(data);
    };
    getExperiences();
  }, []);

  return (
    <>
      {projectPreviews.map((projectPreview) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={projectPreview.id}
          >
            <ProjectPreview
              projectPreviews={projectPreviews}
              setProjectPreviews={setProjectPreviews}
              projectPreview={projectPreview}
            />
          </motion.div>
        );
      })}
      <AnimatePresence>
        {showAddProjectModal && (
          <AddProjectModal
            setShowAddProjectModal={setShowAddProjectModal}
            projectPreviews={projectPreviews}
            setProjectPreviews={setProjectPreviews}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {edit && (
          <motion.div
            layout
            layoutId="edit-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            <ColoredButton onClick={() => setShowAddProjectModal(true)}>
              Create new blog
            </ColoredButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
