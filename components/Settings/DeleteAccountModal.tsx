import { DialogOverlay, DialogContent } from "@reach/dialog";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import { AuthContext } from "../../state/context";
import { useRouter } from "next/router";
import { useContext } from "react";
import { motion } from "framer-motion";
import toastError from "../Shared/Toast";
import {
  getErrorMessage,
  motionContentSettings,
  motionOverlaySettings,
} from "../../utils/utils";
import useDeleteAccount from "./hooks/useDeleteAccount";

interface DeleteAccountModalProps {
  setShowDeleteAccountModal: (value: boolean) => void;
}

export default function DeleteAccountModal({
  setShowDeleteAccountModal,
}: DeleteAccountModalProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const mutation = useDeleteAccount(user.username);

  const deleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await mutation.mutateAsync();
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
      setShowDeleteAccountModal(false);
      router.push("/");
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return (
    <MotionDialogOverlay
      onDismiss={() => setShowDeleteAccountModal(false)}
      key="delete=account-overlay"
      {...motionOverlaySettings}
    >
      <MotionStyledDialogContent
        key="delete-account"
        aria-label="delete account"
        {...motionContentSettings}
      >
        <button onClick={() => setShowDeleteAccountModal(false)}>X</button>
        <Container onSubmit={(e) => deleteUser(e)}>
          <div>
            <DeleteText>Delete account</DeleteText>
            <MessageText>There&apos;s no turning back</MessageText>
          </div>
          <ColoredButton type="submit">
            {mutation.isLoading ? "Deleting..." : "Delete account"}
          </ColoredButton>
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
  height: 250px;
`;

const MotionStyledDialogContent = motion(StyledDialogContent);
const MotionDialogOverlay = motion(DialogOverlay);
