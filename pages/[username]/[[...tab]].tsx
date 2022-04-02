import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { User, TabContent } from "../../Types/types";

import Header from "../../components/Header";
import Tabs from "../../components/Tabs";
import Experience from "../../components/Experience/Experience";
import ProjectPreview from "../../components/Portfolio/ProjectPreview";
import BlogPreview from "../../components/Blog/BlogPreview";
import Introduction from "../../components/Introduction/Introduction";
import AddProjectModal from "../../components/Portfolio/AddProjectModal";
import AddIntroductionModal from "../../components/Introduction/AddIntroductionModal";
import AddExperienceModal from "../../components/Experience/AddExperienceModal";
import AddBlogModal from "../../components/Blog/AddBlogModal";
import Education from "../../components/Education/Education";
import Skills from "../../components/Skills";
import Timeline from "../../components/Timeline/Timeline";
import Settings from "../../components/Settings/Settings";

interface UserProps {
  user: User;
  tabContent: TabContent[];
}

export default function Username(props: UserProps) {
  const { user, tabContent: tabContentProps } = props;
  const router = useRouter();
  const { username, edit, tab } = router.query;

  const defaultTab = user.tabs.filter((tabItem) => {
    if (tab) {
      return tabItem.name === tab[0];
    }
  })[0];

  const [tabContent, setTabContent] = useState<TabContent[]>(tabContentProps);
  const [selectedTab, setSelectedTab] = useState(defaultTab || user.tabs[0]);
  const [showDialog, setShowDialog] = useState(false);
  const [previousTab, setPreviousTab] = useState("");

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0 },
  };

  useEffect(() => {
    const getData = async () => {
      if (tab && previousTab !== tab[0]) {
        const newTab =
          user.tabs.filter((tabItem) => {
            if (tab) {
              return tabItem.name === tab[0];
            }
          })[0] || user.tabs[0];
        setSelectedTab(newTab);
        setTabContent([]);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tab/${newTab.name}/${username}`
        );
        const content = await res.json();
        setTabContent(content);
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

  const newProps = {
    tabContent,
    setTabContent,
    setShowDialog,
    selectedTab,
  };

  return (
    <Container>
      <LayoutGroup>
        <Head>
          <title>{user.name}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Card layoutId="hello">
          <Header user={user} />
          <Tabs tabs={user.tabs} selectedTab={selectedTab} />
          <div className="fade">
            {tabContent && (
              <AnimatePresence>
                <Items isRow={selectedTab.type === "introduction"}>
                  {tabContent.map((content: TabContent, index: number) => {
                    const tabContentProps = {
                      content: {
                        ...JSON.parse(content.content),
                        id: content.id,
                      },
                      selectedTab,
                      setTabContent,
                      tabContent,
                    };
                    return (
                      <motion.div
                        key={content.id}
                        // @ts-ignore
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        layoutId={content.id}
                      >
                        {selectedTab.type === "experience" && (
                          <Experience {...tabContentProps} />
                        )}
                        {selectedTab.type === "portfolio" && (
                          <ProjectPreview {...tabContentProps} />
                        )}
                        {selectedTab.type === "blog" && (
                          <BlogPreview {...tabContentProps} />
                        )}
                        {selectedTab.type === "introduction" && (
                          <Introduction index={index} {...tabContentProps} />
                        )}
                      </motion.div>
                    );
                  })}
                  {selectedTab.type === "timeline" && <Timeline />}
                  {selectedTab.type === "education" && <Education />}
                  {selectedTab.type === "skills" && <Skills />}
                </Items>
              </AnimatePresence>
            )}
          </div>
          {edit && tabContent !== null && (
            <>
              <button
                className="colored-button"
                onClick={() => setShowDialog(true)}
              >
                Add new {selectedTab.name}
              </button>
              {selectedTab.type === "blog" && showDialog && (
                <AddBlogModal {...newProps} />
              )}
              {selectedTab.type === "experience" && showDialog && (
                <AddExperienceModal {...newProps} />
              )}
              {selectedTab.type === "introduction" && showDialog && (
                <AddIntroductionModal {...newProps} />
              )}
              {selectedTab.type === "portfolio" && showDialog && (
                <AddProjectModal {...newProps} />
              )}
              {selectedTab.type === "education" && showDialog && (
                <AddProjectModal {...newProps} />
              )}
            </>
          )}
        </Card>
        <AnimatePresence>
          {edit && (
            <SettingsContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Settings />
            </SettingsContainer>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </Container>
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
  const { user, tabContent } = await res.json();
  if (user === null) {
    return { redirect: { destination: "/", permanent: false } };
  } else {
    const parsedTabs = JSON.parse(user.tabs);
    return {
      props: {
        user: { ...user, tabs: parsedTabs },
        tabContent,
      },
    };
  }
};

const SettingsContainer = styled(motion.div)`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  margin: 40px 0;
  gap: 30px;
  height: 900px;
`;

const Card = styled(motion.div)`
  width: 50%;
  width: 800px;
  background-color: white;
  padding: 50px 55px;
  margin-bottom: 30px;
  border-radius: 20px;
  min-height: 110vh;
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

interface ItemsProps {
  isRow: boolean;
}

const Items = styled.div<ItemsProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.isRow ? "row" : "column")};
  margin-bottom: 30px;
`;