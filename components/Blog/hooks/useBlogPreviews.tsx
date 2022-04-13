import { useQuery } from "react-query";

import { BlogPreview } from "../../../types/types";

const getBlogPreviews = async (userID: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/blog-previews/${userID}`
  );
  return await res.json();
};

export default function useBlogPreviews(userID: string) {
  return useQuery<BlogPreview[]>("blogs", () => getBlogPreviews(userID));
}
