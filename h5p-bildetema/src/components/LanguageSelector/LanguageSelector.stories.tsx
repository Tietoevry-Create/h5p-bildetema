import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Language } from "common/types/types";
import { LanguageSelector, LanguageSelectorProps } from "./LanguageSelector";

export default {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
} as ComponentMeta<typeof LanguageSelector>;

const Template: ComponentStory<typeof LanguageSelector> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageSelector {...args} />
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
};

Default.args = defaultArgs;
