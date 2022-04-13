import { useQuery } from "react-query";
import { ProjectPreview } from "../../../types/types";

const getProjectPreviews = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/project-previews/${userID}`
  );
  return await res.json();
};

export default function useProjectPreviews(userID: string) {
  return useQuery<ProjectPreview[]>("projects", () =>
    getProjectPreviews(userID)
  );
}
