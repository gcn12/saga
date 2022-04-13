import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import AddProjectModal from "./AddProjectModal";
import { ColoredButton } from "../Shared/Buttons";
import { AuthContext } from "../../state/context";
import ProjectPreview from "./ProjectPreview";
import useProjectPreviews from "./hooks/useProjectPreviews";

export default function Projects() {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const { user } = useContext(AuthContext);
  const { data: projectPreviews } = useProjectPreviews(user.id);

  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      {projectPreviews?.map((projectPreview) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={projectPreview.id}
          >
            <ProjectPreview projectPreview={projectPreview} />
          </motion.div>
        );
      })}
      <AnimatePresence>
        {showAddProjectModal && (
          <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} />
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
