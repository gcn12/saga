import { useState } from "react";
import styled from "styled-components";
import TimelineFullScreen from "./TimelineFullScreen";
import FullScreenIcon from "../Icons/FullScreenIcon";
import { AnimatePresence } from "framer-motion";
import TimelineItemStandard from "./TimelineItemStandard";

const data = [
  {
    title: "Learned to sing",
    date: "Aug 19",
    link: "https://google.com",
  },
  {
    title: "Discovered rock music",
    date: "May 20",
    link: "https://google.com",
  },
  {
    title: "Started career",
    date: "Mar 15",
    link: "https://google.com",
  },
  {
    title: "Published a book",
    date: "Nov 28",
    link: "https://google.com",
  },
  {
    title: "Met Steven Spielberg",
    date: "Jul 5",
    link: "https://google.com",
  },
  {
    title: "Learned to read",
    date: "Aug 10",
    link: "https://google.com",
  },
  {
    title: "Discovered pop music",
    date: "May 20",
    link: "https://google.com",
  },
  {
    title: "Started new job",
    date: "March 15",
    link: "https://google.com",
  },
  {
    title: "Published an NPM package",
    date: "November 28",
    link: "https://google.com",
  },
  {
    title: "Met James Bond",
    date: "July 5",
    link: "https://google.com",
  },
];

export default function Timeline() {
  const [showFullScreen, setShowFullScreen] = useState(false);
  return (
    <>
      <FullScreenLogoContainer
        aria-label="expand timeline"
        onClick={() => setShowFullScreen(true)}
      >
        <FullScreenIcon />
      </FullScreenLogoContainer>
      <TimelineContainer>
        {data.map((item) => {
          return <TimelineItemStandard key={item.title} item={item} />;
        })}
      </TimelineContainer>
      <AnimatePresence>
        {showFullScreen && (
          <TimelineFullScreen
            timelineItems={data}
            setShowFullScreen={setShowFullScreen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const FullScreenLogoContainer = styled.button`
  display: flex;
  align-self: flex-end;
  margin-bottom: 50px;
`;

const TimelineContainer = styled.div`
  max-height: 70vh;
  overflow: scroll;
`;
