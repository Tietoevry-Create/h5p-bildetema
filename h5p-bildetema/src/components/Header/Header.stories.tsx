import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Header } from "./Header";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template = (): JSX.Element => {
  const languages = [
    {
      label: "Norsk (Bokmål)",
      code: makeLanguageCode("nob"),
      rtl: false,
    },
    {
      label: "Norsk (Nynorsk)",
      code: makeLanguageCode("nno"),
      rtl: false,
    },
    {
      label: "Polsk",
      code: makeLanguageCode("pol"),
      rtl: false,
    },
  ];
  return (
    <Header
      topicIds={{}}
      languagesFromDB={languages}
      favLanguages={languages}
      handleToggleFavoriteLanguage={() => null}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template();
};

export const isWordView = (): JSX.Element => {
  return Template();
};
