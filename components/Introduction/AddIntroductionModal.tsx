import { DialogContent, DialogOverlay } from "@reach/dialog";
import { useState } from "react";
import "@reach/dialog/styles.css";
import { useRouter } from "next/router";
import { TabContent, Tab, Blog, BlogElements } from "../../Types/types";

const VIDEOS = [
  "https://player.vimeo.com/video/137425484?h=c0f888fae6",
  "https://player.vimeo.com/video/243043167?h=32fea0a0a8",
  "https://player.vimeo.com/video/603896359?h=33771d5e1d&byline=0&portrait=0",
  "https://player.vimeo.com/video/459970741?h=d79ba43b07",
  "https://player.vimeo.com/video/451858697?h=ad7213400f",
  "https://player.vimeo.com/video/518827313?h=842359fffb",
];

interface AddIntroductionModalProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  setShowDialog: (value: boolean) => void;
  selectedTab: Tab;
}

export default function AddIntroductionModal({
  setShowDialog,
  setTabContent,
  tabContent,
  selectedTab,
}: AddIntroductionModalProps) {
  const [showModal, setShowModal] = useState(true);
  const [question, setQuestion] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const router = useRouter();
  const { username } = router.query;

  const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0 },
  };

  const getRandomVideo = () => {
    const index = Math.floor(Math.random() * 6);
    return VIDEOS[index];
  };

  const addBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experience = {
      content: {
        question: question,
        videoURL,
      },
      type: "introduction",
      username,
      name: selectedTab.name,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-tab-preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      }
    );

    const data = await res.json();
    const sortedContent = [...tabContent, data];
    sortedContent.sort((a, b) => {
      return b.id.localeCompare(a.id);
    });
    setTabContent(sortedContent);
    setShowDialog(false);
  };

  return (
    <DialogOverlay
      style={{
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}
      aria-label="blog post"
      onDismiss={() => setShowDialog(false)}
      isOpen={showModal}
      // @ts-ignore
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <DialogContent
        aria-label={"blog post"}
        style={{
          borderRadius: "10px",
          minHeight: "90vh",
          width: "60%",
          padding: "20px 0",
          margin: "30px auto",
        }}
      >
        <button
          onClick={() => setShowDialog(false)}
          style={{ padding: "0 5%" }}
        >
          X
        </button>
        <form method="post" onSubmit={addBlog}>
          <label>
            Question
            <input
              type="text"
              name="company"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          <div></div>
          <label>
            link
            <input
              type="text"
              name="date"
              defaultValue={
                "https://player.vimeo.com/video/518827313?h=842359fffb"
              }
              onChange={(e) => setVideoURL(e.target.value)}
            />
          </label>
          <div></div>
          <button type="submit" className="colored-button">
            Add Introduction
          </button>
        </form>
      </DialogContent>
    </DialogOverlay>
  );
}