import { useState } from "react";
import styled from "styled-components";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import moment from "moment";

import DeleteExperienceModal from "../DeleteItemModal";
import BlogPost from "./BlogPost";
import { BlogPreview as BlogPreviewType } from "../../types/types";

interface BlogPreviewProps {
  setBlogPreviews: (tabContent: BlogPreviewType[]) => void;
  blogPreviews: BlogPreviewType[];
  blogPreview: BlogPreviewType;
}

export default function BlogPreview({
  blogPreview,
  blogPreviews,
  setBlogPreviews,
}: BlogPreviewProps) {
  const [showBlog, setShowBlog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const { edit } = router.query;
  const { date, title, id } = blogPreview;

  return (
    <>
      <Container className="dark">
        <OpenBlog onClick={() => setShowBlog(true)}>
          <BlogDate className="dark-text light-text">
            {moment(date).format("D MMMM YYYY")}
          </BlogDate>
          <Title className="dark-text light-text">{title}</Title>
        </OpenBlog>
        {edit && (
          <Menu>
            <MenuButton>:</MenuButton>
            <MenuList style={{ borderRadius: "8px" }}>
              <MenuItem onSelect={() => setShowDeleteModal(true)}>
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Container>
      <AnimatePresence>
        {showBlog && <BlogPost setShowBlog={setShowBlog} blogID={id} />}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteExperienceModal
            setShowDeleteModal={setShowDeleteModal}
            tabContent={blogPreviews}
            id={id}
            setTabContent={setBlogPreviews}
            endpoint="delete-blog"
          />
        )}
      </AnimatePresence>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const OpenBlog = styled.button`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  color: inherit;
`;

const BlogDate = styled.p`
  font-size: 0.85rem;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.15rem;
`;
