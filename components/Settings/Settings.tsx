import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import Tabs from "./Tabs";
import Profile from "./Profile";
import Colors from "./Colors";
import Account from "./Account";

export const tabs = ["Colors", "Profile", "Account"] as const;
export type TabTypes = typeof tabs[number];

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState<TabTypes>("Colors");

  const router = useRouter();

  const { edit } = router.query;

  return (
    <AnimatePresence>
      {edit && (
        <SettingsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <Container>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === "Colors" && <Colors />}
            {selectedTab === "Profile" && <Profile />}
            {selectedTab === "Account" && <Account />}
          </Container>
        </SettingsContainer>
      )}
    </AnimatePresence>
  );
}

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 400px;
  padding: 30px 35px;
  position: sticky;
  top: 40px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SettingsContainer = styled(motion.div)`
  min-height: 90vh;
`;
