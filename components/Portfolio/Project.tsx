import { useEffect, useState } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Project as ProjectType } from "../../Types/types";
import toastError from "../Shared/Toast";

interface ProjectProps {
  title: string;
  setShowProject: (value: boolean) => void;
}

export default function Project({ title, setShowProject }: ProjectProps) {
  const [project, setProject] = useState<ProjectType[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/${title}`
        );
        const project = await res.json();
        const content = JSON.parse(project.content);
        setProject(content);
        setIsVisible(true);
      } catch (err) {
        toastError((err as any).toString());
      }
    };
    getContent();
  }, [title]);

  const variant = {
    hidden: { opacity: 0 },
    initial: { opacity: 1 },
    transition: { duration: 0 },
  };

  const MotionDialogOverlay = motion(DialogOverlay);
  const MotionDialogContent = motion(DialogContent);

  return (
    <MotionDialogOverlay
      onDismiss={() => setShowProject(false)}
      isOpen={isVisible}
      // @ts-ignore
      variants={variant}
      initial="hidden"
      animate="initial"
      exit="hidden"
      transition={{ duration: 0.1 }}
    >
      <MotionDialogContent
        transition={{ duration: 0.5 }}
        // @ts-ignore
        variants={variant}
        initial="hidden"
        animate="initial"
        exit="hidden"
        style={{
          borderRadius: "10px",
          minHeight: "90vh",
          width: "60%",
          maxWidth: "1000px",
          padding: "20px 0",
          margin: "30px auto",
        }}
        aria-label="blog post"
      >
        <CloseModal onClick={() => setShowProject(false)}>X</CloseModal>
        <Container>
          <Title>{title}</Title>
          {project.map((element) => {
            const { type, content } = element;
            return (
              <>
                {type === "largePhoto" && <LargeImg src={content} alt="" />}
                {type === "smallPhoto" && (
                  <SmallImgContainer>
                    <SmallImg src={content} alt="" />
                  </SmallImgContainer>
                )}
                {type === "paragraph" && <Paragraph>{content}</Paragraph>}
                {type === "header" && <Header>{content}</Header>}
                {type === "leftPhoto" && (
                  <LeftPhotoContainer>
                    <LeftPhoto src={content.photo} alt="" />
                    <LeftPhotoTextContainer>
                      <LeftPhotoTitle>{content.title}</LeftPhotoTitle>
                      <p>{content.text}</p>
                    </LeftPhotoTextContainer>
                  </LeftPhotoContainer>
                )}
                {type === "rightPhoto" && (
                  <RightPhotoContainer>
                    <RightPhotoTextContainer>
                      <RightPhotoTitle>{content.title}</RightPhotoTitle>
                      <p>{content.text}</p>
                    </RightPhotoTextContainer>
                    <RightPhoto src={content.photo} alt="" />
                  </RightPhotoContainer>
                )}
              </>
            );
          })}
        </Container>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const Container = styled.div`
  padding: 40px 0;
`;

const Title = styled.h1`
  padding: 0 10%;
  margin-bottom: 40px;
  font-weight: 500;
  text-align: center;
`;

const LargeImg = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 40px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.08) 0 2px 2px hsl(0deg 0% 0% / 0.08),
    0 4px 4px hsl(0deg 0% 0% / 0.08), 0 8px 8px hsl(0deg 0% 0% / 0.08),
    0 16px 16px hsl(0deg 0% 0% / 0.08);
`;

const SmallImgContainer = styled.div`
  justify-content: center;
  display: flex;
  padding: 0 10%;
  width: 100%;
`;

const SmallImg = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.08), 0 2px 2px hsl(0deg 0% 0% / 0.08),
    0 4px 4px hsl(0deg 0% 0% / 0.08), 0 8px 8px hsl(0deg 0% 0% / 0.08),
    0 16px 16px hsl(0deg 0% 0% / 0.08);
`;

const Paragraph = styled.p`
  padding: 0 10%;
  margin-bottom: 40px;
  white-space: pre-wrap;
`;

const Header = styled.h2`
  padding: 0 10%;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 1.3rem;
`;

const LeftPhotoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  margin-bottom: 40px;
  align-items: center;
`;

const LeftPhoto = styled.img`
  width: 40%;
  border-radius: 5px;
  object-fit: cover;
`;

const LeftPhotoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const LeftPhotoTitle = styled.p`
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const RightPhotoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  margin-bottom: 40px;
  align-items: center;
`;

const RightPhotoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const RightPhotoTitle = styled.p`
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const RightPhoto = styled.img`
  width: 40%;
  border-radius: 5px;
  object-fit: cover;
`;

const CloseModal = styled.button`
  padding: 0 5%;
`;
