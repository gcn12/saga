import TipTap from "../components/TipTap";
import { Tab } from "../Types/types";
import styled from "styled-components";

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
    { label: "Profile picture url:", onChange: setProfilePictureURL },
    { label: "Location:", onChange: setLocation },
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

        <label style={{ display: "flex", flexDirection: "column" }}>
          Career:
          <TipTap setText={setCareer} allowBulletList={false} />
        </label>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Bio:
          <Textarea onChange={(e) => setBio(e.target.value)} />
        </label>

        <div></div>
        <SubmitButton type="button" onClick={createUser}>
          Create user
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.form`
  width: 80%;
`;

const Input = styled.input`
  border-radius: 8px;
  padding: 6px 8px;
`;

const Textarea = styled.textarea`
  border-radius: 8px;
  padding: 6px 8px;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 9px 16px;
  border-radius: 8px;
  margin-bottom: 5px;
  font-size: 1.2rem;
  font-weight: 600;
`;
