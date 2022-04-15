import { ColoredButton } from "./Buttons";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  component: ColoredButton,
  title: "Colored Button",
} as ComponentMeta<typeof ColoredButton>;

const Template: ComponentStory<typeof ColoredButton> = (args) => (
  <ColoredButton {...args}>{args.label}</ColoredButton>
);

export const Default = Template.bind({});
Default.args = {
  label: "hello",
};
