import Education from "./Education";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Education",
  component: Education,
} as ComponentMeta<typeof Education>;

const Template: ComponentStory<typeof Education> = (args) => (
  <Education {...args} />
);

const education = {
  school: "University of Southern California",
  date: "Aug 2018 - Dec 2021",
  description: `<div>
    <p>Applied and Computational Mathematics, B.A. (3.86)</p>
    <p>Screenwriting, Minor</p>
    </div>`,
};

export const Default = Template.bind({});
Default.args = { education };

export const LongDescription = Template.bind({});
LongDescription.args = {
  education: {
    ...education,
    description: `<div>
  <p>Applied and Computational Mathematics, B.A. (3.86)</p>
  <p>Screenwriting, Minor</p>
  <p>Writing, Minor</p>
  <p>Eating, Minor</p>
  </div>`,
  },
};
