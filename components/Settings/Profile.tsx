import { Label, Input } from "../Shared/Forms";
import { SubmitButton, SubmitButtonStatus } from "../Shared/Buttons";
import styled from "styled-components";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../jotai/state";

export default function Profile() {
  const [status, setStatus] = useState<SubmitButtonStatus>("idle");
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [career, setCareer] = useState(user.career);
  const [location, setLocation] = useState(user.location);
  const [videoIntroduction, setVideoIntroduction] = useState(
    user.videoIntroduction || ""
  );

  const formItems = [
    { label: "Name", setState: setName, value: name },
    { label: "Username", setState: setUsername, value: username },
    { label: "Career", setState: setCareer, value: career },
    { label: "Location", setState: setLocation, value: location },
    {
      label: "Introduction video",
      setState: setVideoIntroduction,
      value: videoIntroduction,
    },
  ];

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    delay(250);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/save-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          career,
          location,
          videoIntroduction,
          userID: localStorage.getItem("userID"),
        }),
      }
    );
    const userData = await res.json();

    const newData = { ...userData, tabs: JSON.parse(userData.tabs) };
    delay(250);
    setStatus("success");
    setUser(newData);
  };

  return (
    <form onSubmit={(e) => saveSettings(e)}>
      {formItems.map((formItem) => {
        return (
          <LabelAndFormContainer key={formItem.label}>
            <Label>
              {formItem.label}
              <Input
                defaultValue={formItem.value || ""}
                onChange={(e) => formItem.setState(e.target.value)}
              />
            </Label>
          </LabelAndFormContainer>
        );
      })}
      <SubmitButton status={status} style={{ width: "100%" }} type="submit" />
    </form>
  );
}

const LabelAndFormContainer = styled.div`
  margin-bottom: 20px;
`;
