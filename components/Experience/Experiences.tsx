import { useEffect, useState, useContext } from "react";
import Experience from "./Experience";
import { AuthContext } from "../../state/context";
import { Experience as ExperienceType } from "../../types/types";

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getExperiences = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/experience/${user.id}`
      );
      const data = await res.json();
      setExperiences(data);
    };
    getExperiences();
  }, []);

  return (
    <>
      {experiences.map((experience) => {
        console.log(experience);
        return (
          <Experience
            key={experience.id}
            experience={experience}
            experiences={experiences}
            setExperiences={setExperiences}
          />
        );
      })}
    </>
  );
}
