import styled from "styled-components";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import TimelineItem from "./TimelineItemFullScreen";
import { TimelineItem as TimelineItemType } from "../../types/types";
import { motion } from "framer-motion";

interface TimelineFullScreenProps {
  timelineItems: TimelineItemType[];
  setShowFullScreen: (value: boolean) => void;
}

export default function TimelineFullScreen({
  timelineItems,
  setShowFullScreen,
}: TimelineFullScreenProps) {
  const MotionDialogOverlay = motion(DialogOverlay);
  const MotionDialogContent = motion(DialogContent);

  const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0 },
  };

  return (
    <MotionDialogOverlay
      onDismiss={() => setShowFullScreen(false)}
      style={{ backgroundColor: "white" }}
      // @ts-ignore
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <MotionDialogContent style={{ backgroundColor: "transparent" }}>
        <Container>
          {timelineItems.map((item) => {
            return <TimelineItem key={item.title} item={item} />;
          })}
        </Container>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
