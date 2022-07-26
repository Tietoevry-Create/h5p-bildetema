import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelector } from "./LanguageSelector";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

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
      code: makeLanguageCode("no"),
      rtl: false,
      isFavorite: true,
    },
    {
      label: "هذا نص منسوخ من جوجل",
      code: makeLanguageCode("longtest"),
      rtl: true,
      isFavorite: true,
    },
    {
      label: "Engelsk",
      code: makeLanguageCode("en"),
      rtl: false,
      isFavorite: false,
    },
    {
      label: "عربىge",
      code: makeLanguageCode("ar"),
      rtl: true,
      isFavorite: true,
    },
    {
      label: "Dansk",
      code: makeLanguageCode("dk"),
      rtl: false,
      isFavorite: false,
    },
  ],
};
