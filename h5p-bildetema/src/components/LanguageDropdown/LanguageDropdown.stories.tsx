import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageDropdown, LanguageDropdownProps } from "./LanguageDropdown";
import { DBContext } from "../../../../common/context/DBContext";
import { Language, Data } from "../../../../common/types/types";

export default {
  title: "Components/LanguageDropdown",
  component: LanguageDropdown,
} as ComponentMeta<typeof LanguageDropdown>;

const langs: Language[] = [
  {
    label: "Norsk",
    code: "nob",
    rtl: false,
  },

  {
    label: "Engelsk",
    code: "eng",
    rtl: false,
  },
  {
    label: "عربىge",
    code: "ara",
    rtl: true,
  },
  {
    label: "Dansk",
    code: "dan",
    rtl: false,
  },
  {
    label: "Polsk",
    code: "pol",
    rtl: false,
  },
];

const data = { languages: langs } as Data;

const Template: ComponentStory<typeof LanguageDropdown> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DBContext.Provider value={data}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <LanguageDropdown {...args} />
  </DBContext.Provider>
);

export const Default = Template.bind({});

const defaultArgs: LanguageDropdownProps = {
  isMobile: false,
  search: "",
  currentLanguageCode: "nob",
  topicIds: {},
  handleSelectorVisibility: () => null,
  handleToggleFavoriteLanguage: () => null,
  langSelectorIsShown: true,
  favLanguages: [
    {
      label: "Norsk (Bokmål)",
      code: "nob",
      rtl: false,
    },
  ],
  selectLanguageLabel: "Select language",
};

Default.args = defaultArgs;
