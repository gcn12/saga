import { useState } from "react";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import DeleteAccountModal from "./DeleteAccountModal";

export default function More() {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  return (
    <div>
      <DeleteContainer>
        <DeleteAccountText>Delete account</DeleteAccountText>
        <ColoredButton onClick={() => setShowDeleteAccountModal(true)}>
          Delete
        </ColoredButton>
      </DeleteContainer>
      {/* <ColoredButton style={{ width: "100%" }} type="submit">
        Save
      </ColoredButton> */}
      {showDeleteAccountModal && (
        <DeleteAccountModal
          setShowDeleteAccountModal={setShowDeleteAccountModal}
        />
      )}
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
