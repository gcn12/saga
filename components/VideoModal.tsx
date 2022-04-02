import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";

interface VideoModalProps {
  setShowIntroVideo: (value: boolean) => void;
  videoLink: string;
}

export default function VideoModal({
  setShowIntroVideo,
  videoLink,
}: VideoModalProps) {
  const MotionDialogOverlay = motion(DialogOverlay);
  const MotionDialogContent = motion(DialogContent);

  const variant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0 },
  };

  return (
    <MotionDialogOverlay
      style={{
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}
      aria-label="blog post"
      onDismiss={() => setShowIntroVideo(false)}
      isOpen={true}
      // @ts-ignore
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <MotionDialogContent
        aria-label={"blog post"}
        style={{
          borderRadius: "10px",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "35%",
          left: "50%",
        }}
      >
        <iframe
          src={videoLink}
          width="640"
          height="360"
          // frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          // allowfullscreen
          style={{ margin: "0 auto" }}
        ></iframe>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}
