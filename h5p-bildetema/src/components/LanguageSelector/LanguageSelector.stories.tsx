import { Meta, StoryObj } from "@storybook/react";
import { Language } from "common/types/types";
import { LanguageSelector } from "./LanguageSelector";

export default {
  title: "Components/Language selector",
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {
  args: {
    topicIds: {},
    search: "",
    favLanguages: [
      {
        label: "Norsk (bokmål)",
        code: "nob",
        rtl: false,
      },
    ],
    currentLanguageCode: "nob",
    handleToggleFavoriteLanguage: (lang: Language, fav: boolean): void => {
      console.info(fav);
    },
  },
};
