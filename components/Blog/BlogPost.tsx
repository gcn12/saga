import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import toastError from "../Shared/Toast";

interface BlogElement {
  type: string;
  content: string;
}

interface BlogProps {
  blogTitle: string;
  setShowBlog: (value: boolean) => void;
}

export default function BlogPost({ blogTitle, setShowBlog }: BlogProps) {
  const [blog, setBlog] = useState<BlogElement[]>([]);
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${blogTitle}`
        );
        const blog = await res.json();
        const content = JSON.parse(blog.content);
        setBlog(content);
        setTitle(blog.title);
        setIsVisible(true);
      } catch (err) {
        toastError((err as any).toString());
      }
    };
    getContent();
  }, [blogTitle]);

  const MotionDialogOverlay = motion(DialogOverlay);
  const MotionDialogContent = motion(DialogContent);

  return (
    <MotionDialogOverlay
      onDismiss={() => setShowBlog(false)}
      isOpen={isVisible}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionDialogContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          borderRadius: "10px",
          // minHeight: "90vh",
          width: "60%",
          maxWidth: "1000px",
          padding: "20px 0",
          // margin: "30px auto",
        }}
        aria-label="blog post"
      >
        <button onClick={() => setShowBlog(false)} style={{ padding: "0 5%" }}>
          X
        </button>
        <div style={{ padding: "40px 0" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1
              style={{
                padding: "0 10%",
                marginBottom: "40px",
                fontWeight: "500",
              }}
            >
              {title}
            </h1>
          </div>
          {blog.map((element: BlogElement) => {
            const { type, content } = element;
            return (
              <div key={content}>
                {type === "largePhoto" && (
                  <LargePhotoContainer>
                    <Photo src={content} alt="" />
                  </LargePhotoContainer>
                )}
                {type === "smallPhoto" && (
                  <SmallPhotoContainer>
                    <Photo src={content} alt="" />
                  </SmallPhotoContainer>
                )}
                {type === "paragraph" && (
                  <Paragraph
                    dangerouslySetInnerHTML={{ __html: content || "" }}
                  />
                )}
                {type === "header" && <Header>{content}</Header>}
              </div>
            );
          })}
        </div>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const SmallPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 10%;
`;

const LargePhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.08), 0 2px 2px hsl(0deg 0% 0% / 0.08),
    0 4px 4px hsl(0deg 0% 0% / 0.08), 0 8px 8px hsl(0deg 0% 0% / 0.08),
    0 16px 16px hsl(0deg 0% 0% / 0.08);
  margin-bottom: 40px;
`;

const Header = styled.p`
  padding: 0 10%;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 1.7rem;
`;

const Paragraph = styled.div`
  padding: 0 10%;
  margin-bottom: 40px;
  white-space: pre-wrap;
  font-weight: 300;
`;
