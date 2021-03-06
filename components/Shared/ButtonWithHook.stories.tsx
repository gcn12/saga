import Button from "./StoryButton";
import { useState } from "react";
import { ComponentMeta } from "@storybook/react";

export default {
  title: "Button With Hooks",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = () => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState("Secondary");
  const [isPrimary, setIsPrimary] = useState(false);

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    if (!isPrimary) {
      setIsPrimary(true);
      setValue("Primary");
    }
  };
  return <Button primary={isPrimary} onClick={handleOnChange} label={value} />;
};
