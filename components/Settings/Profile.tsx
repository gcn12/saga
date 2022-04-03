import { Label, Input } from "../Shared/Forms";
import { ColoredButton } from "../Shared/Buttons";
import styled from "styled-components";
import { FormEvent, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");
  const [videoIntroduction, setVideoIntroduction] = useState("");

  const formItems = [
    { label: "Name:", setState: setName },
    { label: "Username:", setState: setUsername },
    { label: "Career:", setState: setCareer },
    { label: "Location:", setState: setLocation },
    { label: "Introduction video:", setState: setVideoIntroduction },
  ];

  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    console.log(await res.json());
  };

  return (
    <form onSubmit={(e) => saveSettings(e)}>
      {formItems.map((formItem) => {
        return (
          <LabelAndFormContainer key={formItem.label}>
            <Label>
              {formItem.label}
              <Input onChange={(e) => formItem.setState(e.target.value)} />
            </Label>
          </LabelAndFormContainer>
        );
      })}
      <ColoredButton style={{ width: "100%" }} type="submit">
        Save
      </ColoredButton>
    </form>
  );
}

const LabelAndFormContainer = styled.div`
  margin-bottom: 20px;
`;
