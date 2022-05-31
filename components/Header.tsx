import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
// import { getStorage, ref } from "firebase/storage";

import { User } from "../types/types";
import styled from "styled-components";
import VideoModal from "./VideoModal";
import VideoIcon from "./Icons/VideoIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import { ColoredButton, SecondaryButton } from "./Shared/Buttons";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const { location, name, career, bio, profilePictureURL, videoIntroduction } =
    user;
  const [showIntroVideo, setShowIntroVideo] = useState(false);

  const router = useRouter();

  const { username, tab, edit = false } = router.query;

  // const storage = getStorage();

  const uploadImage = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const image = e.currentTarget?.files?.[0];
    if (!image) return;
    // const imageRef = ref(storage, image.name);
    // console.log(imageRef);
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InnerContainer>
          <div>
            <ProfileImageContainer>
              <ProfileImage src={profilePictureURL} alt="Profile pic" />
              {edit ? (
                <>
                  <UploadProfileImageLabel htmlFor="photo-upload">
                    +
                  </UploadProfileImageLabel>
                  <UploadProfileImage
                    onChange={uploadImage}
                    type="file"
                    id="photo-upload"
                  />
                </>
              ) : null}
            </ProfileImageContainer>
            {videoIntroduction && (
              <VideoButton onClick={() => setShowIntroVideo(true)}>
                <VideoIcon />
                <Introduction>Introduction</Introduction>
              </VideoButton>
            )}
          </div>
          <TextContainer>
            <div>
              <Name>{name}</Name>
              <Job
                dangerouslySetInnerHTML={{
                  __html: career || "",
                }}
              />
            </div>
            <LocationContainer>
              <LocationIcon src="/location.png" alt="" />
              <Location>{location}</Location>
            </LocationContainer>
          </TextContainer>
        </InnerContainer>
        <Link
          href={`/${username}/${tab ? tab[0] : ""}${edit ? "" : "?edit=true"}`}
          scroll={false}
          passHref
        >
          {edit ? (
            <SecondaryButton as="a" style={{ alignSelf: "flex-start" }}>
              Done
            </SecondaryButton>
          ) : (
            <ColoredButton as="a" style={{ alignSelf: "flex-start" }}>
              Edit
            </ColoredButton>
          )}
        </Link>
        {/* )} */}
      </div>
      <Bio dangerouslySetInnerHTML={{ __html: bio || "" }} />
      <AnimatePresence>
        {showIntroVideo && videoIntroduction && (
          <VideoModal
            setShowIntroVideo={setShowIntroVideo}
            videoLink={videoIntroduction}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 30px;
`;

const Bio = styled.div`
  font-size: 0.9rem;
  margin-bottom: 30px;
  color: #6e6e6e;
`;

const Location = styled.p`
  font-size: 0.9rem;
`;

const LocationIcon = styled.img`
  height: 17px;
  width: 17px;
  margin-right: 3px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Job = styled.div`
  font-size: 1.12rem;
`;

const Name = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
`;

const TextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 60px;
  height: 125px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
`;

const UploadProfileImageLabel = styled.label`
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: absolute;
  bottom: 24px;
  right: 24px;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  &:active {
    outline: 2px solid red;
  }
  &:focus-within {
    outline: 2px solid red;
  }
`;

const UploadProfileImage = styled.input`
  height: 0px;
  width: 0px;
  z-index: -10;
`;

const ProfileImage = styled.img`
  border-radius: 15px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.1), 0 2px 2px hsl(0deg 0% 0% / 0.1),
    0 4px 4px hsl(0deg 0% 0% / 0.1), 0 8px 8px hsl(0deg 0% 0% / 0.1),
    0 16px 16px hsl(0deg 0% 0% / 0.1);
  width: 140px;
  height: 125px;
  object-fit: cover;
  margin: 0 32px 10px 0;
  align-self: start;
`;

export const Icon = styled.svg`
  transition: all 0.25s ease-in-out;
`;

const Introduction = styled.p`
  transition: all 0.25s ease-in-out;

  &:hover ${Icon} {
    color: black;
    fill: black;
  }
`;

const VideoButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 12px;
  color: #6e6e6e;

  &:hover ${Icon} {
    color: black;
    fill: black;
  }

  &:hover ${Introduction} {
    color: black;
    fill: black;
  }
`;
