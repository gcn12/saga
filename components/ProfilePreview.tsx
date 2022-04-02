import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Tab } from "../Types/types";

interface ProfilePreviewProps {
  career: string;
  profilePictureURL: string;
  location: string;
  bio: string;
  tabs: Tab[];
}

const PLACEHOLDER_DATA = {
  name: "Your Name",
  career: "Your Career",
  location: "Location",
  tabs: [
    { name: "Tab 1", key: "1", type: "" },
    { name: "Tab 2", key: "2", type: "" },
    { name: "Tab 3", key: "3", type: "" },
    { name: "Tab 4", key: "4", type: "" },
  ],
  profilePictureURL:
    "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  bio: "Leo urna molestie at elementum eu facilisis sed. Dictum at tempor commodo ullamcorper a lacus. Adipiscing commodo elit at imperdiet dui accumsan. Mauris pellentesque pulvinar pellentesque habitant morbi. Aliquam malesuada bibendum arcu vitae. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Libero id faucibus nisl tincidunt. Eu tincidunt tortor aliquam nulla facilisi.",
};

export default function ProfilePreview({
  career,
  profilePictureURL,
  location,
  bio,
  tabs,
}: ProfilePreviewProps) {
  const tabsToDisplay = ((tabs[0].name.length > 0 && tabs) ||
    PLACEHOLDER_DATA.tabs) as Tab[];
  return (
    <Container>
      <Card>
        <Header>
          <div>
            <ProfilePicture
              src={profilePictureURL || PLACEHOLDER_DATA.profilePictureURL}
              alt="profile picture"
            />
          </div>
          <HeaderTextContainer>
            <div>
              <Name>
                {typeof window === "undefined"
                  ? PLACEHOLDER_DATA.name
                  : localStorage.getItem("name")}
              </Name>
              <Career>
                {career.length > 7 ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: career || "",
                    }}
                  ></div>
                ) : (
                  PLACEHOLDER_DATA.career
                )}
              </Career>
            </div>
            <LocationContainer>
              <LocationIcon alt="location icon" src="/location.png" />
              <p>{location || PLACEHOLDER_DATA.location}</p>
            </LocationContainer>
          </HeaderTextContainer>
        </Header>
        <Bio>{bio || PLACEHOLDER_DATA.bio}</Bio>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Card = styled.div`
  background-color: white;
  width: 80%;
  height: 100%;
  border-radius: 20px;
  padding: 40px 50px;
`;

const ProfilePicture = styled.img`
  border-radius: 15px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.1), 0 2px 2px hsl(0deg 0% 0% / 0.1),
    0 4px 4px hsl(0deg 0% 0% / 0.1), 0 8px 8px hsl(0deg 0% 0% / 0.1),
    0 16px 16px hsl(0deg 0% 0% / 0.1);
  width: 140px;
  height: 125px;
  object-fit: cover;
  margin-right: 20px;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Name = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
`;

const Career = styled.p`
  font-size: 1.12rem;
`;

const LocationIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 5px;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  margin-bottom: 30px;
  color: #6e6e6e;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

const TabText = styled(motion.p)`
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    border-bottom: 4px solid var(--accent) !important;
  }
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
