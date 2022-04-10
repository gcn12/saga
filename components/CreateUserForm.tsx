import { Fragment } from "react";
import TipTap from "../components/TipTap";
import styled from "styled-components";
import { Label, Input } from "./Shared/Forms";
import { ColoredButton } from "./Shared/Buttons";
import Spacer from "./Shared/Spacer";

interface CreateUserFormProps {
  createUser: () => void;
  setCareer: (value: string) => void;
  setProfilePictureURL: (value: string) => void;
  setLocation: (value: string) => void;
  setBio: (value: string) => void;
  profilePictureURL: string;
  location: string;
}

export default function CreateUserForm({
  createUser,
  profilePictureURL,
  setBio,
  setCareer,
  setLocation,
  setProfilePictureURL,
  location,
}: CreateUserFormProps) {
  const formElements = [
    {
      label: "Profile picture url",
      onChange: setProfilePictureURL,
      value: profilePictureURL,
    },
    { label: "Location", onChange: setLocation, value: location },
  ];

  return (
    <Container>
      <FormContainer>
        {formElements.map((formElement) => {
          return (
            <Fragment key={formElement.label}>
              <Label>
                {formElement.label}
                <Input
                  onChange={(e) => formElement.onChange(e.target.value)}
                  type="text"
                  value={formElement.value}
                />
              </Label>
              <Spacer size={16} axis="y" />
            </Fragment>
          );
        })}
        <Label style={{ display: "flex", flexDirection: "column" }}>
          Career
          <TipTap setText={setCareer} allowBulletList={false} />
        </Label>
        <Spacer size={16} axis="y" />
        <Label
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Bio
          <TipTap setText={setBio} />
        </Label>
        <Spacer size={16} axis="y" />
        <ColoredButton type="button" onClick={createUser}>
          Create user
        </ColoredButton>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;

  background-color: white;
  padding: 50px 0;
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
`;

const FormContainer = styled.form`
  width: 80%;
`;
