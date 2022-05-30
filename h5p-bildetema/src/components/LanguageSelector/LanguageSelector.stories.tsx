import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelector } from "./LanguageSelector";
import type { LanguageCode } from "../../../../common/types/types";

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
  handleChange: (isFavorite: boolean, languageCode: LanguageCode) => {
    console.info(isFavorite, languageCode);
  },
  languages: [
    {
      label: "Norsk",
      code: "no",
      rtl: false,
      isFavorite: true,
    },
    {
      label: "Engelsk",
      code: "en",
      rtl: false,
      isFavorite: false,
    },
    {
      label: "Rtl language",
      code: "rtllang",
      rtl: true,
      isFavorite: false,
    },
    {
      label: "Dansk",
      code: "dk",
      rtl: false,
      isFavorite: false,
    },
    {
      label: "This language has a very long name",
      code: "longName",
      rtl: false,
      isFavorite: true,
    },
    {
      label: "Another rtl language",
      code: "an",
      rtl: true,
      isFavorite: true,
    },
  ],
};
