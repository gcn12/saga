import { DialogContent, DialogOverlay } from "@reach/dialog";
import { useState } from "react";
import { Reorder } from "framer-motion";
import "@reach/dialog/styles.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import AddProjectPreview from "./AddProjectPreview";
import { TabContent, Tab, Project, ProjectElements } from "../../Types/types";
import { ColoredButton } from "../Shared/Buttons";

const PHOTOS = [
  "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNvb2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1513135467880-6c41603bbb5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNvb2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1489864341077-e204d82219b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGluZGlhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmVwYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1543627633-0643fe92d06f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGV4ZXJjaXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFtZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
];

interface AddProjectModalProps {
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
  selectedTab: Tab;
  setShowDialog: (value: boolean) => void;
}

interface ElementButtons {
  name: string;
  element: ProjectElements;
}

export default function AddProjectModal({
  setTabContent,
  tabContent,
  selectedTab,
  setShowDialog,
}: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [projectContent, setProjectContent] = useState<Project[]>([]);
  const router = useRouter();
  const { username } = router.query;

  const getRandomImage = () => {
    const index = Math.floor(Math.random() * 6);
    return PHOTOS[index];
  };

  const addExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experience = {
      content: {
        title,
        link: link.length > 0 ? link : "https://google.com",
        imageURL: imageURL.length === 0 ? "" : 1 ? imageURL : getRandomImage(),
        description,
      },
      type: "portfolio",
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

    const contentRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: projectContent,
          username,
        }),
      }
    );

    const content = await contentRes.json();

    setShowDialog(false);
  };

  const addElement = (type: ProjectElements) => {
    if (type === "leftPhoto" || type === "rightPhoto") {
      setProjectContent([
        ...projectContent,
        {
          type,
          content: {
            photo: "",
            title: "",
            text: "",
          },
          key: Math.random(),
        },
      ]);
    } else {
      setProjectContent([
        ...projectContent,
        { type, content: "", key: Math.random() },
      ]);
    }
  };

  const addContent = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type?: string,
    contentType: string = ""
  ) => {
    const currentContent = { ...projectContent[index] };
    const newContent = projectContent.map((item, i: number) => {
      if (i === index) {
        if (
          type === "leftPhoto" ||
          (type === "rightPhoto" && contentType !== undefined)
        ) {
          const content = { ...item.content };
          content[contentType] = e.target.value;
          return { ...currentContent, content };
        } else {
          return { ...currentContent, content: e.target.value };
        }
      } else {
        return item;
      }
    });
    setProjectContent(newContent);
  };

  const addElementButtons = [
    {
      name: "Add header",
      element: "header",
    },
    {
      name: "Add paragraph",
      element: "paragraph",
    },
    {
      name: "Add small image",
      element: "smallPhoto",
    },
    {
      name: "Add large image",
      element: "largePhoto",
    },
    {
      name: "Add left image",
      element: "leftPhoto",
    },
    {
      name: "Add right image",
      element: "rightPhoto",
    },
  ] as ElementButtons[];

  return (
    <DialogOverlay
      style={{
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}
      aria-label="blog post"
      onDismiss={() => setShowDialog(false)}
      isOpen={true}
    >
      <StyledDialogContent aria-label={"blog post"}>
        <button
          onClick={() => setShowDialog(false)}
          style={{ padding: "0 5%" }}
        >
          X
        </button>
        <BuilderContainer>
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <AddProjectPreview project={projectContent} title={title} />
          </div>
          <Container method="post" onSubmit={addExperience}>
            <Label>
              Title
              <Input
                type="text"
                name="company"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Label>
            <div></div>
            <Label>
              link
              <Input
                type="text"
                name="link"
                defaultValue={"https://google.com"}
                onChange={(e) => setLink(e.target.value)}
              />
            </Label>
            <div></div>
            <Label>
              description
              <Input
                type="text"
                name="role"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Label>
            <div></div>
            <Label>
              Image URL
              <Input
                type="text"
                name="description"
                defaultValue={getRandomImage()}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </Label>
            <div></div>
            <Reorder.Group
              axis="y"
              values={projectContent}
              onReorder={setProjectContent}
            >
              {projectContent.map((content, index: number) => {
                return (
                  <Reorder.Item key={content.key} value={content}>
                    {content.type === "header" && (
                      <div>
                        <Label>
                          Header
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) => addContent(index, e)}
                          />
                        </Label>
                      </div>
                    )}
                    {content.type === "smallPhoto" && (
                      <div>
                        <Label>
                          Small photo
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) => addContent(index, e)}
                          />
                        </Label>
                      </div>
                    )}
                    {content.type === "largePhoto" && (
                      <div>
                        <Label>
                          Large photo
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) => addContent(index, e)}
                          />
                        </Label>
                      </div>
                    )}
                    {content.type === "paragraph" && (
                      <div>
                        <label>
                          Paragraph
                          <div></div>
                          <Textarea onChange={(e) => addContent(index, e)} />
                        </label>
                      </div>
                    )}
                    {content.type === "leftPhoto" && (
                      <div>
                        Left photo
                        <Label>
                          <div></div>
                          Image url
                          <Input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "leftPhoto", "photo")
                            }
                          />
                        </Label>
                        <div></div>
                        <Label>
                          Title
                          <div></div>
                          <input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "leftPhoto", "title")
                            }
                          />
                        </Label>
                        <div></div>
                        <Label>
                          Text
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "leftPhoto", "text")
                            }
                          />
                        </Label>
                      </div>
                    )}
                    {content.type === "rightPhoto" && (
                      <div>
                        Right photo
                        <Label>
                          <div></div>
                          Image url
                          <Input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "rightPhoto", "photo")
                            }
                          />
                        </Label>
                        <div></div>
                        <Label>
                          Title
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "rightPhoto", "title")
                            }
                          />
                        </Label>
                        <div></div>
                        <Label>
                          Text
                          <div></div>
                          <Input
                            type="text"
                            onChange={(e) =>
                              addContent(index, e, "rightPhoto", "text")
                            }
                          />
                        </Label>
                      </div>
                    )}
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <div></div>
            <ButtonsContainer>
              {addElementButtons.map((addElementButton) => {
                return (
                  <AddElement
                    key={addElementButton.element}
                    type="button"
                    onClick={() => addElement(addElementButton.element)}
                  >
                    {addElementButton.name}
                  </AddElement>
                );
              })}
            </ButtonsContainer>
            <ColoredButton type="submit">Add project</ColoredButton>
          </Container>
        </BuilderContainer>
      </StyledDialogContent>
    </DialogOverlay>
  );
}

const Container = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Input = styled.input`
  align-self: center;
  margin: 0 auto;
  align-self: center;
  width: 400px;
  border-radius: 6px;
  padding: 4px 6px;
`;

const Textarea = styled.textarea`
  align-self: center;
  margin: 0 auto;
  align-self: center;
  width: 400px;
  border-radius: 6px;
  padding: 4px 6px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

const BuilderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddElement = styled.button`
  border: 1px solid black;
  color: black;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 0 5px 5px 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 10px;
  min-height: 90vh;
  width: 90%;
  padding: 20px 40px;
  margin: 30px auto;
`;
