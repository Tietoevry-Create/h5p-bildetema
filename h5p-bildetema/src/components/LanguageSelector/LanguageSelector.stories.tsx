import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelector } from "./LanguageSelector";

export default {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
} as ComponentMeta<typeof LanguageSelector>;

const Template: ComponentStory<typeof LanguageSelector> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageSelector {...args} />
);

export const Default = Template.bind({});

Default.args = {
  languages: [
    {
      label: "Norsk",
      code: "no",
      rtl: false,
    },
    {
      label: "Engelsk",
      code: "en",
      rtl: false,
    },
    {
      label: "Dansk",
      code: "dk",
      rtl: false,
    },
  ],
};
