import { Meta } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { Language } from "common/types/types";
import { LanguageSelectorElement } from "./LanguageSelectorElement";

export default {
  title: "Components/Language selector element",
  component: LanguageSelectorElement,
} satisfies Meta<typeof LanguageSelectorElement>;

const Template = (
  code: LanguageCode,
  rtl: boolean,
  favorite: boolean,
): JSX.Element => {
  const language: Language = {
    label: "",
    code,
    rtl,
  };
  const favLanguages: Language[] = favorite ? [language] : [];
  const bottomElementAt2Col = true;
  const bottomElementAt3Col = false;
  const handleToggleFavoriteLanguage = (lang: Language, fav: boolean): void => {
    console.info(fav);
  };
  const translations: Record<string, string> = {
    selectLanguage: "",
  };

  return (
    <LanguageSelectorElement
      path=""
      handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
      language={language}
      currentLanguageCode=""
      bottomElementAt2Col={bottomElementAt2Col}
      bottomElementAt3Col={bottomElementAt3Col}
      favLanguages={favLanguages}
      translations={translations}
      translatedLabel=""
    />
  );
};

export const Default = (): JSX.Element => {
  return Template("nob", false, false);
};

export const Favorite = (): JSX.Element => {
  return Template("nob", false, true);
};

export const RTL = (): JSX.Element => {
  return Template("ara", true, false);
};
