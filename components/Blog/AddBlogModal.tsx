import { DialogContent, DialogOverlay } from "@reach/dialog";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Reorder, motion } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/router";
import TipTap from "../TipTap";
import { TabContent, Tab, BlogElements } from "../../Types/types";
import { ColoredButton } from "../Shared/Buttons";

interface AddBlogModalProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  setShowDialog: (value: boolean) => void;
  selectedTab: Tab;
}

type ButtonsType = {
  name: string;
  type: BlogElements;
};

const buttons: ButtonsType[] = [
  { name: "Add header", type: "header" },
  { name: "Add paragraph", type: "paragraph" },
  { name: "Add small image", type: "smallPhoto" },
  { name: "Add large image", type: "largePhoto" },
];

export default function AddBlogModal({
  setTabContent,
  tabContent,
  setShowDialog,
  selectedTab,
}: AddBlogModalProps) {
  const [blogContent, setBlogContent] = useState<any[]>([]);
  const router = useRouter();
  const { username } = router.query;

  const addBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = "This is a title";
    const experience = {
      content: {
        title: newTitle,
        date: moment().format("MMM D YYYY"),
      },
      type: "blog",
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
    const sortedContent = [...tabContent, data] as TabContent[];
    sortedContent.sort((a, b) => {
      return b.id.localeCompare(a.id);
    });
    setTabContent(sortedContent);

    const contentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: blogContent,
          username,
        }),
      }
    );

    await contentRes.json();

    setShowDialog(false);
  };

  const addElement = (type: BlogElements) => {
    setBlogContent([...blogContent, { type, content: "", key: Math.random() }]);
  };

  const addContent = (index: number, text: string) => {
    const currentContent = { ...blogContent[index] };
    const newContent = blogContent.map((item, i: number) => {
      if (i === index) {
        return { ...currentContent, content: text };
      } else {
        return item;
      }
    });
    setBlogContent(newContent);
  };

  return (
    <MotionDialogOverlay
      style={{
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="blog post"
      onDismiss={() => setShowDialog(false)}
      isOpen={true}
    >
      <MotionDialogContent
        aria-label={"blog post"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button onClick={() => setShowDialog(false)}>X</button>
        <div></div>
        <Title type="text" />
        <form onSubmit={addBlog}>
          <Reorder.Group
            axis="y"
            values={blogContent}
            onReorder={setBlogContent}
            layout="position"
          >
            {blogContent.map((contentItem, index: number) => {
              const { type, key } = contentItem;
              return (
                <Reorder.Item
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  value={contentItem}
                  key={key}
                >
                  {type === "smallPhoto" && (
                    <PhotoComponent
                      addContent={addContent}
                      index={index}
                      imageSize="small"
                    />
                  )}
                  {type === "largePhoto" && (
                    <PhotoComponent
                      addContent={addContent}
                      index={index}
                      imageSize="large"
                    />
                  )}
                  {type === "paragraph" && (
                    <TipTapContainer addContent={addContent} index={index} />
                  )}
                  {type === "header" && (
                    <input
                      onChange={(e) => addContent(index, e.target.value)}
                      style={{ width: "100%" }}
                    />
                  )}
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          <ButtonContainer>
            {buttons.map((button) => {
              return (
                <AddElement
                  key={button.name}
                  type="button"
                  onClick={() => addElement(button.type)}
                >
                  {button.name}
                </AddElement>
              );
            })}
          </ButtonContainer>
          <ColoredButton type="submit">Create</ColoredButton>
        </form>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const TipTapContainer = ({
  index,
  addContent,
}: {
  index: number;
  addContent: (index: number, text: string) => void;
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    addContent(index, text);
  }, [text]);
  return <TipTap setText={setText} />;
};

const PhotoComponent = ({
  addContent,
  index,
  imageSize,
}: {
  addContent: any;
  index: number;
  imageSize: "large" | "small";
}) => {
  const [src, setSrc] = useState("");

  const addImage = (text: string) => {
    setSrc(text);
    addContent(index, text);
  };

  return (
    <div style={{ width: "100%" }}>
      {imageSize === "small" ? (
        <SmallPhoto src={src} alt="" draggable={false} />
      ) : (
        <LargePhoto src={src} alt="" draggable={false} />
      )}
      <input onChange={(e) => addImage(e.target.value)} />
    </div>
  );
};

const Title = styled.input`
  margin: 30px 0;
  width: 100%;
  padding: 4px 8px;
  font-size: 1.5rem;
  font-weight: 600;
  background-color: var(--input);
  border-radius: 8px;
`;

const AddElement = styled.button`
  border: 1px solid black;
  color: black;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 0 5px 5px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const SmallPhoto = styled.img`
  width: 80%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const LargePhoto = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  background-color: rgba(0, 0, 0, 0.6);
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 12px;
  max-width: 600px;
  position: relative;
  min-height: 90vh;
  padding: 20px 40px;
  margin: 30px auto;
`;

const MotionDialogContent = motion(StyledDialogContent);
const MotionDialogOverlay = motion(StyledDialogOverlay);
