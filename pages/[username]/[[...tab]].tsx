import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { AuthContext } from "../../state/context";
import { User } from "../../types/types";
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";

import Education from "../../components/Education/Education";
import Skills from "../../components/Skills";
import Timeline from "../../components/Timeline/Timeline";
import Settings from "../../components/Settings/Settings";
import Contact from "../../components/Contact/Contact";
import Spacer from "../../components/Shared/Spacer";
import Experiences from "../../components/Experiences/Experiences";
import BlogPosts from "../../components/Blog/BlogPreviews";
import ProjectPreviews from "../../components/Portfolio/ProjectPreviews";

interface UserProps {
  user: User;
}

export default function Username(props: UserProps) {
  const { user: userProps } = props;
  const router = useRouter();
  const { edit, tab } = router.query;
  const [user, setUser] = useState<User>(userProps);

  const defaultTab = user.tabs.filter((tabItem) => {
    if (tab) {
      return tabItem.name === tab[0];
    }
  })[0];

  const [selectedTab, setSelectedTab] = useState(defaultTab || user.tabs[0]);
  const [previousTab, setPreviousTab] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (previousTab !== (tab !== undefined ? tab[0] : tab)) {
        const newTab =
          user.tabs.filter((tabItem) => {
            if (tab) {
              return tabItem.name === tab[0];
            }
          })[0] || user.tabs[0];
        setSelectedTab(newTab);
        if (tab) {
          setPreviousTab(tab[0]);
        }
      }
    };
    getData();
  }, [tab]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", user.accentColor);
    document.documentElement.style.setProperty(
      "--background",
      user.backgroundColor
    );
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CenterItems>
        <Container>
          <LayoutGroup>
            <Head>
              <title>{user.name}</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Card layoutId="profile" layout="position">
              <Header user={user} />
              <Tabs tabs={user.tabs} selectedTab={selectedTab} />
              <div className="fade">
                <AnimatePresence>
                  {selectedTab.type === "contact" && <Contact />}
                  {selectedTab.type === "timeline" && <Timeline />}
                  {selectedTab.type === "education" && <Education />}
                  {selectedTab.type === "skills" && <Skills />}
                  {selectedTab.type === "experience" && <Experiences />}
                  {selectedTab.type === "blog" && <BlogPosts />}
                  {selectedTab.type === "portfolio" && <ProjectPreviews />}
                </AnimatePresence>
              </div>
            </Card>
            <Spacer size={28} axis="x" />
            <AnimatePresence>
              {edit && (
                <SettingsContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <Settings />
                </SettingsContainer>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </Container>
      </CenterItems>
    </AuthContext.Provider>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { username: string; tab: string };
}) => {
  const { username, tab } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}/${tab}`
  );
  const { user } = await res.json();
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  } else {
    const parsedTabs = JSON.parse(user.tabs);
    return {
      props: {
        user: { ...user, tabs: parsedTabs },
      },
    };
  }
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 40px;
  padding: 0 20px;
`;

const CenterItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsContainer = styled(motion.div)`
  min-height: 90vh;
`;

const Card = styled(motion.div)`
  width: 50%;
  width: 750px;
  background-color: white;
  padding: 50px 55px;
  border-radius: 20px;
  min-height: 110vh;
  margin-bottom: 50px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);

  @media (min-height: 900px) {
    min-height: 90vh;
  }

  @media (max-width: 900px) {
    width: auto;
  }

  @media (max-width: 700px) {
    width: 95%;
  }
`;
