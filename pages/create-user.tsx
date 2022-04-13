import { useRouter } from "next/router";
import { useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import ProfilePreview from "../components/ProfilePreview";
import { User } from "../types/types";
import styled from "styled-components";
import { backgroundColors, accentColors } from "../colors";
import toastError from "../components/Shared/Toast";
import { getErrorMessage } from "../utils/utils";

export default function CreateUser() {
  const [profilePictureURL, setProfilePictureURL] = useState(
    "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFuaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
  );
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const createUser = async () => {
    try {
      const username = localStorage.getItem("username");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/create-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            career,
            location,
            profilePictureURL,
            bio,
            tabs: [
              { type: "experience", name: "experience", key: "a" },
              { type: "blog", name: "blog", key: "b" },
              { type: "portfolio", name: "work", key: "c" },
              // { type: "contact", name: "contact", key: "d" },
              { type: "bio", name: "bio", key: "d" },
            ],
            userID: localStorage.getItem("userID"),
            accentColor: accentColors[0],
            backgroundColor: backgroundColors[0],
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }

      const user = (await res.json()) as User;

      document.documentElement.style.setProperty(
        "--background",
        user.backgroundColor
      );

      document.documentElement.style.setProperty("--accent", user.accentColor);

      router.push(`/${username}?edit=true`);
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return (
    <Container>
      <ProfilePreview
        bio={bio}
        career={career}
        location={location}
        profilePictureURL={profilePictureURL}
      />
      <CreateUserForm
        createUser={createUser}
        setCareer={setCareer}
        setProfilePictureURL={setProfilePictureURL}
        setLocation={setLocation}
        setBio={setBio}
        profilePictureURL={profilePictureURL}
        location={location}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 50px;
`;
