import TipTap from "../components/TipTap";
import { Tab } from "../Types/types";
import styled from "styled-components";
import { Label, Input } from "./Shared/Forms";
import { ColoredButton } from "./Shared/Buttons";

interface CreateUserFormProps {
  createUser: () => void;
  setCareer: (value: string) => void;
  setProfilePictureURL: (value: string) => void;
  setLocation: (value: string) => void;
  setBio: (value: string) => void;
  addTab: () => void;
  tabs: Tab[];
  updateTabName: (name: string, index: number) => void;
  updateTabType: (type: string, index: number) => void;
  setTabs: (tabs: Tab[]) => void;
}

export default function CreateUserForm({
  createUser,
  setBio,
  setCareer,
  setLocation,
  setProfilePictureURL,
}: CreateUserFormProps) {
  const formElements = [
    { label: "Profile picture url", onChange: setProfilePictureURL },
    { label: "Location", onChange: setLocation },
  ];

  return (
    <Container>
      <FormContainer>
        {formElements.map((formElement) => {
          return (
            <Label key={formElement.label}>
              {formElement.label}
              <Input
                onChange={(e) => formElement.onChange(e.target.value)}
                type="text"
              />
            </Label>
          );
        })}

        <Label style={{ display: "flex", flexDirection: "column" }}>
          Career
          <TipTap setText={setCareer} allowBulletList={false} />
        </Label>

        <Label
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Bio
          <TipTap setText={setBio} />
        </Label>

        <div></div>
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
`;

const FormContainer = styled.form`
  width: 80%;
`;
