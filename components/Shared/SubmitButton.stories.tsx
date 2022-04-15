import { SubmitButton } from "./Buttons";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Submit Button",
  component: SubmitButton,
} as ComponentMeta<typeof SubmitButton>;

const Template: ComponentStory<typeof SubmitButton> = (args) => (
  <SubmitButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  status: "idle",
};

export const Submitting = Template.bind({});
Submitting.args = {
  ...Default.args,
  status: "submitting",
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  status: "success",
};
