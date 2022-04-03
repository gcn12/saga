import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import { useAtom } from "jotai";
import { userAtom } from "../../jotai/state";

interface DeleteAccountModalProps {
  setShowDeleteAccountModal: (value: boolean) => void;
}

export default function DeleteAccountModal({
  setShowDeleteAccountModal,
}: DeleteAccountModalProps) {
  const [user, setUser] = useAtom(userAtom);
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
    } catch (err) {}
  };
  return (
    <DialogOverlay onDismiss={() => setShowDeleteAccountModal(false)}>
      <StyledDialogContent>
        <button onClick={() => setShowDeleteAccountModal(false)}>X</button>
        <Container onSubmit={(e) => deleteUser(e)}>
          <ColoredButton type="submit">Delete account</ColoredButton>
        </Container>
      </StyledDialogContent>
    </DialogOverlay>
  );
}

const Container = styled.form`
  display: flex;
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 8px;
  padding: 24px 24px;
  max-width: 500px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
`;
