import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelector, LanguageSelectorProps } from "./LanguageSelector";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { Language } from "../../../../common/types/types";

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
  languages: [
    {
      label: "Norsk",
      code: makeLanguageCode("nob"),
      rtl: false,
    },

    {
      label: "Engelsk",
      code: makeLanguageCode("eng"),
      rtl: false,
    },
    {
      label: "عربىge",
      code: makeLanguageCode("ara"),
      rtl: true,
    },
    {
      label: "Dansk",
      code: makeLanguageCode("dan"),
      rtl: false,
    },
    {
      label: "Polsk",
      code: makeLanguageCode("pol"),
      rtl: false,
    },
  ],
  favLanguages: [
    {
      label: "Polsk",
      code: makeLanguageCode("pol"),
      rtl: false,
    },
  ],
  currentLanguageCode: "nob",
  handleToggleFavoriteLanguage: (lang: Language, fav: boolean): void => {
    console.info(fav);
  },
};

Default.args = defaultArgs;
