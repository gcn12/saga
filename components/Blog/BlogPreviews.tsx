import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import { AuthContext } from "../../state/context";
import BlogPreview from "./BlogPreview";
import { Blog } from "../../types/types";
import { ColoredButton } from "../Shared/Buttons";
import AddBlogModal from "./AddBlogModal";

export default function BlogPosts() {
  const [blogPreviews, setBlogPreviews] = useState<Blog[]>([]);
  const [showBlogModal, setShowBlogModal] = useState(false);

  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { edit } = router.query;

  useEffect(() => {
    const getExperiences = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/blog/${user.id}`
      );
      const data = await res.json();
      setBlogPreviews(data);
    };
    getExperiences();
  }, []);

  return (
    <>
      {blogPreviews.map((blogPreview) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={blogPreview.id}
          >
            <BlogPreview
              setBlogPreviews={setBlogPreviews}
              blogPreviews={blogPreviews}
              blogPreview={blogPreview}
            />
          </motion.div>
        );
      })}
      <AnimatePresence>
        {showBlogModal && (
          <AddBlogModal
            blogPreviews={blogPreviews}
            setBlogPreviews={setBlogPreviews}
            setShowDialog={setShowBlogModal}
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
            <ColoredButton onClick={() => setShowBlogModal(true)}>
              Create new blog
            </ColoredButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
