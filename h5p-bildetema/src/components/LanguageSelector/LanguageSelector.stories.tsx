import { Meta } from "@storybook/react";
import { Language } from "common/types/types";
import { LanguageSelector, LanguageSelectorProps } from "./LanguageSelector";

export default {
  title: "Components/Language selector",
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export const Default = {
  args: {
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
  },
};
