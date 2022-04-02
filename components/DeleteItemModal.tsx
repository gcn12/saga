import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import { TabContent } from "../Types/types";
import "@reach/dialog/styles.css";
import React from "react";
import styled from "styled-components";

interface DeleteItemModalProps {
  setShowDeleteModal: (value: boolean) => void;
  id: string;
  setTabContent: (tabContent: TabContent[]) => void;
  tabContent: TabContent[];
}

export default function DeleteItemModal({
  setShowDeleteModal,
  setTabContent,
  id,
  tabContent,
}: DeleteItemModalProps) {
  const MotionDialogOverlay = motion(DialogOverlay);
  const MotionDialogContent = motion(DialogContent);

  const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0 },
  };

  const removeExperienceFromState = () => {
    const filteredContent = tabContent.filter((item: TabContent) => {
      return item.id !== id;
    });

    setTabContent(filteredContent);
  };

  const deleteExperience = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-experience/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await res.json();
    removeExperienceFromState();
    setShowDeleteModal(false);
  };

  return (
    <MotionDialogOverlay
      style={{
        backgroundColor: "rgba(0, 0, 0, .4)",
      }}
      aria-label="blog post"
      onDismiss={() => setShowDeleteModal(false)}
      isOpen={true}
      // @ts-ignore
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <MotionDialogContent
        aria-label={"blog post"}
        style={{
          borderRadius: "25px",
          width: "500px",
          height: "300px",
          padding: "20px 0",
          margin: "30px auto",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CloseModel onClick={() => setShowDeleteModal(false)}>X</CloseModel>
        <Message>Delete?</Message>
        <Form onSubmit={deleteExperience}>
          <CancelButton onClick={() => setShowDeleteModal(false)} type="button">
            Cancel
          </CancelButton>
          <DeleteButton type="submit">Delete</DeleteButton>
        </Form>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const CloseModel = styled.button`
  margin: 0 5%;
  padding: 0.7% 2%;
  align-self: flex-start;
`;

const Message = styled.p`
  align-self: center;
  font-size: 1.5rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CancelButton = styled.button`
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  background-color: #d6564d;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;