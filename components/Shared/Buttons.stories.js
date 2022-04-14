import { ColoredButton } from "./Buttons";

export default {
  component: ColoredButton,
  title: "Colored Button",
};

const Template = (args) => <ColoredButton {...args}>Hello</ColoredButton>;

export const Default = Template.bind({});
