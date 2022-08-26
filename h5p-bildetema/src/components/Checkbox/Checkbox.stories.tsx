import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
// import { LanguageCode } from "../../../../common/types/LanguageCode";
// import { Language } from "../../../../common/types/types";
import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template = (): JSX.Element=> {
  const [test, setTest] = React.useState(true)
//   code: LanguageCode,
//   rtl: boolean,
//   favorite: boolean,
// ): JSX.Element => {
//   const language: Language = {
//     label: "",
//     code,
//     rtl,
//   };
//   const favLanguages: Language[] = favorite ? [language] : [];
//   const middleElement = true;
//   const handleToggleFavoriteLanguage = (lang: Language, fav: boolean): void => {
//     console.info(fav);
//   };

  return (
    <Checkbox

    />
  );
};

export const Default = (): JSX.Element => {
  return Template();
};

// export const Favorite = (): JSX.Element => {
//   return Template("nob", false, true);
// };

// export const RTL = (): JSX.Element => {
//   return Template("ara", true, false);
// };
