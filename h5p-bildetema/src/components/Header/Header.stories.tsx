import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
import { Header } from "./Header";
import { Language } from "../../../../common/types/types";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template = (): JSX.Element => {
  const languages: Array<Language> = [
    {
      label: "Norsk (Bokmål)",
      code: "nob",
      rtl: false,
    },
    {
      label: "Norsk (Nynorsk)",
      code: "nno",
      rtl: false,
    },
    {
      label: "Polsk",
      code: "pol",
      rtl: false,
    },
  ];
  return (
    <Header
      topicIds={{}}
      favLanguages={languages}
      handleToggleFavoriteLanguage={() => null}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template();
};
