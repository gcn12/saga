import { useRouter } from "next/router";
import { useState } from "react";
import CreateUserForm from "../components/CreateUserForm";
import ProfilePreview from "../components/ProfilePreview";
import { Tab, User } from "../Types/types";
import styled from "styled-components";
import { backgroundColors, accentColors } from "../colors";

export default function CreateUser() {
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [tabs, setTabs] = useState<Tab[]>([
    { type: "experience", name: "", key: Math.random() },
  ]);
  const router = useRouter();

  const createUser = async () => {
    try {
      if (typeof window !== "undefined") {
        const username = localStorage.getItem("username");
        // const username = "danny";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-profile`,
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
              ],
              userID: localStorage.getItem("userID"),
              accentColor: accentColors[0],
              backgroundColor: backgroundColors[0],
            }),
          }
        );
        const user = (await res.json()) as User;

        document.documentElement.style.setProperty(
          "--background",
          user.backgroundColor
        );
        document.documentElement.style.setProperty(
          "--accent",
          user.accentColor
        );
        router.push(`/${username}?edit=true`);
      }
    } catch (err) {}
  };

  const addTab = () => {
    const newTab = {
      name: "",
      type: "experience",
      key: Math.random(),
    };

    setTabs([...tabs, newTab]);
  };

  const updateTabName = (name: string, index: number) => {
    const updatedTabs = tabs.map((tab, i: number) => {
      if (index === i) {
        return { ...tab, name };
      }
      return tab;
    });
    setTabs(updatedTabs);
  };

  const updateTabType = (type: string, index: number) => {
    const updatedTabs = tabs.map((tab, i: number) => {
      if (index === i) {
        return { ...tab, type };
      }
      return tab;
    });
    setTabs(updatedTabs);
  };

  return (
    <Container>
      <ProfilePreview
        bio={bio}
        career={career}
        location={location}
        profilePictureURL={profilePictureURL}
        tabs={tabs}
      />
      <CreateUserForm
        addTab={addTab}
        createUser={createUser}
        setCareer={setCareer}
        setProfilePictureURL={setProfilePictureURL}
        setLocation={setLocation}
        setBio={setBio}
        tabs={tabs}
        updateTabName={updateTabName}
        updateTabType={updateTabType}
        setTabs={setTabs}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 50px;
`;
