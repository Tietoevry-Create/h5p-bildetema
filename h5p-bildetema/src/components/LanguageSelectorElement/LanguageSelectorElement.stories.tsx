import React from "react";
import { ComponentMeta } from "@storybook/react";
import { LanguageSelectorElement } from "./LanguageSelectorElement";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { Language } from "../../../../common/types/types";

export default {
  title: "Components/LanguageSelectorElement",
  component: LanguageSelectorElement,
} as ComponentMeta<typeof LanguageSelectorElement>;

const Template = (
  code: string,
  rtl: boolean,
  favorite: boolean,
): JSX.Element => {
  const language: Language = {
    label: "",
    code: makeLanguageCode(code),
    rtl,
  };
  const favLanguages: Language[] = favorite ? [language] : [];
  const middleElement = true;
  const handleToggleFavoriteLanguage = (lang: Language, fav: boolean): void => {
    console.info(fav);
  };

  return (
    <LanguageSelectorElement
      handleToggleFavoriteLanguage={handleToggleFavoriteLanguage}
      language={language}
      currentLanguageCode=""
      middleElement={middleElement}
      favLanguages={favLanguages}
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
