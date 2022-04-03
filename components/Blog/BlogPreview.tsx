import { useState } from "react";
import styled from "styled-components";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import DeleteExperienceModal from "../DeleteItemModal";
import BlogPost from "./BlogPost";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { TabContent } from "../../Types/types";

interface BlogPreviewProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  content: any;
}

export default function BlogPreview({
  content: blog,
  tabContent,
  setTabContent,
}: BlogPreviewProps) {
  const [showBlog, setShowBlog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      <Container className="dark">
        <OpenBlog onClick={() => setShowBlog(true)}>
          <BlogDate className="dark-text light-text">{blog.date}</BlogDate>
          <Title className="dark-text light-text">{blog.title}</Title>
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
        {showBlog && (
          <BlogPost setShowBlog={setShowBlog} blogTitle={blog.title} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteExperienceModal
            setShowDeleteModal={setShowDeleteModal}
            tabContent={tabContent}
            id={blog.id}
            setTabContent={setTabContent}
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
