import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelector, LanguageSelectorProps } from "./LanguageSelector";
import { DBContext } from "../../../../common/context/DBContext";
import { Language, Data } from "../../../../common/types/types";

export default {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
} as ComponentMeta<typeof LanguageSelector>;

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

const Template: ComponentStory<typeof LanguageSelector> = args => (
  <DBContext.Provider value={data}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <LanguageSelector {...args} />
  </DBContext.Provider>
);

export const Default = Template.bind({});

const defaultArgs: LanguageSelectorProps = {
  topicIds: {},
  search: "",
  favLanguages: [
    {
      label: "Polsk",
      code: "pol",
      rtl: false,
    },
  ],
  currentLanguageCode: "nob",
  handleToggleFavoriteLanguage: (lang: Language, fav: boolean): void => {
    console.info(fav);
  },
  isMobile: false,
};

Default.args = defaultArgs;
