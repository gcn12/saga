import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { LayoutGroup, motion } from "framer-motion";
import styled from "styled-components";
// import { getSession } from "next-auth/react";

import { AuthContext } from "../../state/context";
import { User } from "../../types/types";
import Header from "../../components/Header";
import Tabs from "../../components/Tabs";

import Settings from "../../components/Settings/Settings";
import Spacer from "../../components/Shared/Spacer";
import Tab from "../../components/Tab/Tab";

interface UserProps {
  user: User;
}

export default function Username({ user: userProps }: UserProps) {
  const [user, setUser] = useState<User>(userProps);

  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", user.accentColor);
    document.documentElement.style.setProperty(
      "--background",
      user.backgroundColor
    );
  }, []);

  const selectedTab =
    user.tabs.filter((tabItem) => {
      return tabItem.name === tab?.[0];
    })[0] || user.tabs[0];

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Head>
        <title>{user.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CenterItems>
        <Container>
          <LayoutGroup>
            <Card layoutId="profile" layout="position">
              <Header user={user} />
              <Tabs tabs={user.tabs} selectedTab={selectedTab} />
              <Tab selectedTab={selectedTab} />
            </Card>
            <Spacer size={28} axis="x" />
            <Settings />
          </LayoutGroup>
        </Container>
      </CenterItems>
    </AuthContext.Provider>
  );
}

export const getServerSideProps = async (ctx: any) => {
  // const { data: session } = useSession();

  const { username } = ctx.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${username}`
  );

  const { user } = await res.json();

  if (user) {
    return {
      props: {
        user: { ...user, tabs: JSON.parse(user.tabs) },
        // session: await getSession(ctx),
      },
    };
  } else {
    return { redirect: { destination: "/", permanent: false } };
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
