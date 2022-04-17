import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";

import toastError from "./Shared/Toast";
import {
  getErrorMessage,
  motionContentSettings,
  motionOverlaySettings,
} from "../utils/utils";

interface DeleteItemModalProps {
  setShowDeleteModal: (value: boolean) => void;
  id: string;
  endpoint: string;
  queryName: string;
}

export default function DeleteItemModal({
  setShowDeleteModal,
  id,
  endpoint,
  queryName,
}: DeleteItemModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryName),
    }
  );

  const deleteItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await mutation.mutateAsync();
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
      setShowDeleteModal(false);
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return (
    <MotionDialogOverlay
      aria-label="blog post"
      onDismiss={() => setShowDeleteModal(false)}
      isOpen={true}
      {...motionOverlaySettings}
    >
      <MotionDialogContent aria-label={"blog post"} {...motionContentSettings}>
        <CloseModel onClick={() => setShowDeleteModal(false)}>X</CloseModel>
        <Message>Delete?</Message>
        <Form onSubmit={deleteItem}>
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
  border-radius: 6px;
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 16px;
  width: 500px;
  height: 300px;
  padding: 20px 0;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MotionDialogOverlay = motion(StyledDialogOverlay);
const MotionDialogContent = motion(StyledDialogContent);
