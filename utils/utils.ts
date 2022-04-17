export const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : String(error);
};

export const motionOverlaySettings = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
};

export const motionContentSettings = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.1, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

export const motionFormContentSettings = (isSubmitting: boolean) => {
  return {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1, duration: 0.5 },
    },
    exit: {
      opacity: 0,
      scale: isSubmitting ? 1.1 : 0.95,
      transition: { duration: 0.25 },
    },
  };
};
