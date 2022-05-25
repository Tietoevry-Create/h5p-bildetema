import React from "react";
import { ComponentMeta ,ComponentStory } from "@storybook/react";
// import { ComponentMeta } from "@storybook/react";
import { Language } from "./Language";

export default {
  title: "Components/Language",
  component: Language,
} as ComponentMeta<typeof Language>;

const Template: ComponentStory<typeof Language> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Language {...args}/>
);

export const Default = Template.bind({});

Default.args = {
  language: {
    label: "Norsk",
    code: "no",
    rtl: false
  }
}