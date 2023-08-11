import { ComponentMeta } from "@storybook/react";
import { LanguageCode } from "common/types/LanguageCode";
import { Language } from "common/types/types";
import { LanguageSelectorElement } from "./LanguageSelectorElement";

export default {
  title: "Components/LanguageSelectorElement",
  component: LanguageSelectorElement,
} as ComponentMeta<typeof LanguageSelectorElement>;

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
  const middleElement = true;
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
      middleElement={middleElement}
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
