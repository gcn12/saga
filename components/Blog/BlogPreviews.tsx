import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AuthContext } from "../../state/context";
import BlogPreview from "./BlogPreview";
import { Blog } from "../../types/types";
import { ColoredButton } from "../Shared/Buttons";
import AddBlogModal from "./AddBlogModal";

export default function BlogPosts() {
  const [blogPreviews, setBlogPreviews] = useState<Blog[]>([]);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const { user } = useContext(AuthContext);

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
          <BlogPreview
            key={blogPreview.id}
            setBlogPreviews={setBlogPreviews}
            blogPreviews={blogPreviews}
            blogPreview={blogPreview}
          />
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
      <motion.div
        layout
        layoutId="hello"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        exit={{ opacity: 0 }}
      >
        <ColoredButton onClick={() => setShowBlogModal(true)}>
          Create new blog
        </ColoredButton>
      </motion.div>
    </>
  );
}
