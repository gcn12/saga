import { DialogContent, DialogOverlay } from "@reach/dialog";
import { useState } from "react";
import { useRouter } from "next/router";
import { TabContent, Tab } from "../../Types/types";
import { ColoredButton } from "../Shared/Buttons";
import toastError from "../Shared/Toast";

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

    try {
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
    } catch (err) {
      toastError((err as any).toString());
    }
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
          <ColoredButton type="submit">Add Introduction</ColoredButton>
        </form>
      </DialogContent>
    </DialogOverlay>
  );
}
