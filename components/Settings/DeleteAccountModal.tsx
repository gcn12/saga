import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import { AuthContext } from "../../jotai/state";
import { useRouter } from "next/router";
import { useContext } from "react";
import { motion } from "framer-motion";

interface DeleteAccountModalProps {
  setShowDeleteAccountModal: (value: boolean) => void;
}

export default function DeleteAccountModal({
  setShowDeleteAccountModal,
}: DeleteAccountModalProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const deleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-user/${user.username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      setShowDeleteAccountModal(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const MotionStyledDialogContent = motion(StyledDialogContent);
  const MotionDialogOverlay = motion(DialogOverlay);
  return (
    <MotionDialogOverlay
      onDismiss={() => setShowDeleteAccountModal(false)}
      key="delete=account-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionStyledDialogContent
        key="delete=account"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button onClick={() => setShowDeleteAccountModal(false)}>X</button>
        <Container onSubmit={(e) => deleteUser(e)}>
          <div>
            <DeleteText>Delete account</DeleteText>
            <MessageText>There&apos;s no turning back</MessageText>
          </div>
          <ColoredButton type="submit">Delete account</ColoredButton>
        </Container>
      </MotionStyledDialogContent>
    </MotionDialogOverlay>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 40px;
  height: 100%;
`;

const DeleteText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MessageText = styled.p`
  color: gray;
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  height: 250px;
`;
