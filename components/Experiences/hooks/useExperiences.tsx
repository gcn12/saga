import { useQuery } from "react-query";
import { Experience } from "../../../types/types";

const getExperiences = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/experiences/${userID}`
  );
  return await res.json();
};

export default function useExperiences(userID: string) {
  return useQuery<Experience[]>("experiences", () => getExperiences(userID));
}
