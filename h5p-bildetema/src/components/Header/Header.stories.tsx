import React from "react";
import { ComponentMeta } from "@storybook/react";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../../../common/utils/data.utils";
import { DBContext } from "../../../../common/context/DBContext";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Header } from "./Header";
import { Language } from "../../../../common/types/types";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template = (): JSX.Element => {
  const { data } = useQuery(["dataFromDB"], () => getData(""));
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
    <DBContext.Provider value={data}>
      <Header
        topicIds={{}}
        // languagesFromDB={languages}
        favLanguages={languages}
        handleToggleFavoriteLanguage={() => null}
      />
    </DBContext.Provider>
  );
};

export const Default = (): JSX.Element => {
  return Template();
};
