import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Account() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  return (
    <div>
      <DeleteContainer>
        <DeleteAccountText>Delete account</DeleteAccountText>
        <ColoredButton onClick={() => setShowDeleteAccountModal(true)}>
          Delete
        </ColoredButton>
      </DeleteContainer>
      <AnimatePresence>
        {showDeleteAccountModal && (
          <DeleteAccountModal
            setShowDeleteAccountModal={setShowDeleteAccountModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const DeleteAccountText = styled.p`
  font-size: 1.05rem;
  font-weight: 500;
`;

const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
