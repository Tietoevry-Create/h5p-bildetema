import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageDropdown } from "./LanguageDropdown";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

export default {
  title: "Components/LanguageDropdown",
  component: LanguageDropdown,
} as ComponentMeta<typeof LanguageDropdown>;

const Template: ComponentStory<typeof LanguageDropdown> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageDropdown {...args} />
);

export const Default = Template.bind({});

Default.args = {
  handleSelectorVisibility: () => null,
  handleToggleFavoriteLanguage: () => null,
  langSelectorIsShown: true,
  favLanguages: [    {
    label: "Norsk (Bokmål)",
    code: makeLanguageCode("nob"),
    rtl: false,
  },],
  languagesFromDB: [
    {
      label: "Norsk (Bokmål)",
      code: makeLanguageCode("nob"),
      rtl: false,
    },
    {
      label: "Norsk (Nynorsk)",
      code: makeLanguageCode("nno"),
      rtl: false,
    },
    {
      label: "Polsk",
      code: makeLanguageCode("pol"),
      rtl: false,
    },
  ],
  selectLanguageLabel: "Select language",
};
