import { useState } from "react";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import AddIntroductionModal from "./AddIntroductionModal";
import DeleteExperienceModal from "../DeleteItemModal";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import VideoModal from "../VideoModal";
import styled from "styled-components";
import { TabContent, Tab } from "../../types/types";

interface IntroductionProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  selectedTab: Tab;
  content: any;
  index: number;
}

export default function Introduction({
  content: introduction,
  tabContent,
  setTabContent,
  selectedTab,
  index,
}: IntroductionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [showVideoIntro, setShowIntroVideo] = useState(false);
  const router = useRouter();
  const { edit } = router.query;

  const displayVideo = (link: string) => {
    setShowIntroVideo(true);
    setVideoLink(link);
  };

  return (
    <>
      <motion.button
        aria-label="introduction"
        whileHover={{ scale: 1.012 }}
        onClick={() => displayVideo(introduction.videoURL)}
        style={{
          padding: 0,
          width: "200px",
          display: "flex",
          margin: "0 6px 10px 0px",
        }}
      >
        <ImageContainer>
          <Question>{introduction.question}</Question>
          <Image alt="" src={`/person${index + 1}.jpeg`} />
        </ImageContainer>
        {edit && (
          <Menu>
            <MenuButton>:</MenuButton>
            <MenuList style={{ borderRadius: "8px" }}>
              <MenuItem onSelect={() => setShowDialog(true)}>Add</MenuItem>
              <MenuItem onSelect={() => setShowDeleteModal(true)}>
                Remove
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </motion.button>

      {showDialog && (
        <AddIntroductionModal
          setShowDialog={setShowDialog}
          tabContent={tabContent}
          selectedTab={selectedTab}
          setTabContent={setTabContent}
        />
      )}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteExperienceModal
            setShowDeleteModal={setShowDeleteModal}
            tabContent={tabContent}
            id={introduction.id}
            setTabContent={setTabContent}
            endpoint="delete-introduction"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVideoIntro && (
          <VideoModal
            setShowIntroVideo={setShowIntroVideo}
            videoLink={videoLink}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.15) 50%
    );
  }
`;

const Question = styled.p`
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.01);
  font-weight: 800;
  font-size: 1.7rem;
  width: 10ch;
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  text-align: left;
  line-height: 1.2;
  letter-spacing: 1px;
`;

const Image = styled.img`
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
`;
