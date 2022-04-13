import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { AuthContext } from "../../state/context";
import BlogPreview from "./BlogPreview";
import { BlogPreview as BlogPreviewType } from "../../types/types";
import { ColoredButton } from "../Shared/Buttons";
import AddBlogModal from "./AddBlogModal";

export default function BlogPosts() {
  const [showBlogModal, setShowBlogModal] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { edit } = router.query;

  const { data: blogPreviews2 } = useQuery<BlogPreviewType[]>(
    "blogs",
    async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/blog-previews/${user.id}`
      );
      return await res.json();
    }
  );

  return (
    <>
      {blogPreviews2?.map((blogPreview) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={blogPreview.id}
          >
            <BlogPreview blogPreview={blogPreview} />
          </motion.div>
        );
      })}
      <AnimatePresence>
        {showBlogModal && <AddBlogModal setShowDialog={setShowBlogModal} />}
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
            <ColoredButton onClick={() => setShowBlogModal(true)}>
              Create new blog
            </ColoredButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
