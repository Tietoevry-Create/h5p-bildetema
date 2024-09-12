import { Meta, StoryObj } from "@storybook/react";
import { Language } from "common/types/types";
import { LanguageSelectorElement } from "./LanguageSelectorElement";

export default {
  title: "Components/Language selector element",
  component: LanguageSelectorElement,
} satisfies Meta<typeof LanguageSelectorElement>;

type Story = StoryObj<typeof LanguageSelectorElement>;

export const Default: Story = {
  args: {
    bottomElementAt2Col: false,
    bottomElementAt3Col: false,
    currentLanguageCode: "nob",
    favLanguages: [
      {
        label: "Norsk (bokmål)",
        code: "nob",
        rtl: false,
      },
    ],
    handleToggleFavoriteLanguage: (_lang: Language, fav: boolean): void => {
      console.info(fav);
    },
    language: {
      label: "Engelsk",
      code: "eng",
      rtl: false,
    },
    path: "",
    translations: {
      selectLanguage: "Velg språk",
      lang_eng: "Engelsk",
      lang_nob: "Norsk (bokmål)",
    },
    translatedLabel: "Engelsk",
  },
};

export const Favorite: Story = {
  args: {
    ...Default.args,
    favLanguages: [
      {
        label: "Norsk (bokmål)",
        code: "nob",
        rtl: false,
      },
      {
        label: "Engelsk",
        code: "eng",
        rtl: false,
      },
    ],
  },
};

export const CurrentLanguage: Story = {
  args: {
    ...Default.args,
    currentLanguageCode: "eng",
  },
};

export const RTL: Story = {
  args: {
    ...Default.args,
    language: {
      label: "Arabisk",
      code: "ara",
      rtl: true,
    },
    translations: {
      ...Default.args?.translations,
      lang_ara: "Arabisk",
    },
    translatedLabel: "Arabisk",
  },
};
