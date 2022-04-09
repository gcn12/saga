import { useEffect, useState, useContext } from "react";
import Experience from "./Experience";
import { AuthContext } from "../../state/context";
import { Experience as ExperienceType } from "../../types/types";
import AddExperienceModal from "./AddExperienceModal";
import { ColoredButton } from "../Shared/Buttons";
import { AnimatePresence, motion } from "framer-motion";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getExperiences = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/experience/${user.id}`
      );
      setExperiences((await res.json()) as ExperienceType[]);
    };
    getExperiences();
  }, []);

  return (
    <>
      {experiences.map((experience) => {
        return (
          <Experience
            key={experience.id}
            experience={experience}
            experiences={experiences}
            setExperiences={setExperiences}
          />
        );
      })}
      <motion.div
        layout
        layoutId="hello"
        key="hello"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        exit={{ opacity: 0 }}
      >
        <ColoredButton onClick={() => setShowAddExperience(true)}>
          Add new experience
        </ColoredButton>
      </motion.div>
      <AnimatePresence>
        {showAddExperience && (
          <AddExperienceModal
            setShowAddExperience={setShowAddExperience}
            experiences={experiences}
            setExperiences={setExperiences}
          />
        )}
      </AnimatePresence>
    </>
  );
}
