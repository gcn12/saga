import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import Experience from "./Experience";
import { AuthContext } from "../../state/context";
import AddExperienceModal from "./AddExperienceModal";
import { ColoredButton } from "../Shared/Buttons";
import useExperiences from "./hooks/useExperiences";

export default function Experiences() {
  const [showAddExperience, setShowAddExperience] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const { edit } = router.query;

  const { data: experiences } = useExperiences(user.id);

  return (
    <>
      {experiences?.map((experience) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={experience.id}
          >
            <Experience experience={experience} />
          </motion.div>
        );
      })}
      <AnimatePresence>
        {edit && (
          <motion.div
            layout
            layoutId="edit-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            <ColoredButton onClick={() => setShowAddExperience(true)}>
              Add new experience
            </ColoredButton>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddExperience && (
          <AddExperienceModal setShowAddExperience={setShowAddExperience} />
        )}
      </AnimatePresence>
    </>
  );
}
