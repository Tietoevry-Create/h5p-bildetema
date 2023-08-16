import { Meta } from "@storybook/react";
import { LanguageDropdown } from "./LanguageDropdown";

export default {
  title: "Components/Language dropdown",
  component: LanguageDropdown,
} satisfies Meta<typeof LanguageDropdown>;

export const Default = {
  args: {
    search: "",
    currentLanguageCode: "nob",
    topicIds: {},
    handleSelectorVisibility: () => null,
    handleToggleFavoriteLanguage: () => null,
    langSelectorIsShown: true,
    firstTime: true,
    favLanguages: [
      {
        label: "Norsk (Bokmål)",
        code: "nob",
        rtl: false,
      },
    ],
    selectLanguageLabel: "Select language",
  },
};
