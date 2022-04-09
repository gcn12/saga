import { AnimatePresence } from "framer-motion";
import React, { useState, useContext, FormEvent, Fragment } from "react";
import styled from "styled-components";
import DeleteAccountModal from "./DeleteAccountModal";
import { AuthContext } from "../../state/context";
import {
  SubmitButton,
  SubmitButtonStatus,
  SecondaryButton,
} from "../Shared/Buttons";
import toastError from "../Shared/Toast";
import { Label, Input } from "../Shared/Forms";
import Spacer from "../Shared/Spacer";
import { Account as AccountType } from "../../types/types";
import { getErrorMessage } from "../../utils/utils";

export default function Account() {
  const [status, setStatus] = useState<SubmitButtonStatus>("idle");
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);

  const formItems = [
    { label: "Name", setState: setName, value: name },
    { label: "Username", setState: setUsername, value: username },
  ];

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    await delay(250);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/save-account-settings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            userID: localStorage.getItem("userID"),
          }),
        }
      );

      const userData = (await res.json()) as AccountType;

      const newData = {
        ...user,
        name: userData.name,
        username: userData.username,
      };
      await delay(250);
      setStatus("success");
      setUser(newData);
    } catch (err) {
      toastError(getErrorMessage(err));
      setStatus("idle");
    }
  };

  return (
    <div>
      <form onSubmit={saveSettings}>
        {formItems.map((formItem) => {
          return (
            <Fragment key={formItem.label}>
              <Label>
                {formItem.label}
                <Input
                  defaultValue={formItem.value || ""}
                  onChange={(e) => formItem.setState(e.target.value)}
                />
              </Label>
              <Spacer size={16} axis="y" />
            </Fragment>
          );
        })}
        <SubmitButton status={status} style={{ width: "100%" }} type="submit" />
      </form>
      <Spacer size={32} axis="y" />
      <Divider />
      <Spacer size={32} axis="y" />
      <DeleteContainer>
        <DeleteAccountText>Delete account</DeleteAccountText>
        <SecondaryButton onClick={() => setShowDeleteAccountModal(true)}>
          Delete
        </SecondaryButton>
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

const Divider = styled.hr`
  width: 100%;
  opacity: 0.4;
`;

const DeleteAccountText = styled.p`
  font-size: 1.05rem;
  font-weight: 500;
`;

const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
