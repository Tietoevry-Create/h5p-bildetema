import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Header } from "./Header";
import { TopicGridSizes } from "../../../../common/types/types";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { useUserData } from "../../hooks/useUserData";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template = (isWordView: boolean): JSX.Element => {
  const [checked, setChecked] = React.useState(true);
  const [topicSize, setTopicsSize] = React.useState(TopicGridSizes.Big);
  const [userData] = useUserData();

  return (
    <Header
      currentLanguage={{
        label: "Norsk (Bokmål)",
        code: makeLanguageCode("nob"),
        rtl: false,
        isFavorite: false,
      }}
      changeCurrentLanguage={() => null}
      setTopicsSize={setTopicsSize}
      topicsSize={topicSize}
      isWordView={isWordView}
      handleToggleChange={(value: boolean) => {
        setChecked(value);
      }}
      toggleChecked={checked}
      languagesFromDB={[
        {
          label: "Norsk (Bokmål)",
          code: makeLanguageCode("nob"),
          rtl: false,
          isFavorite: true,
        },
        {
          label: "Norsk (Nynorsk)",
          code: makeLanguageCode("nno"),
          rtl: false,
          isFavorite: false,
        },
        {
          label: "Polsk",
          code: makeLanguageCode("pol"),
          rtl: false,
          isFavorite: true,
        },
      ]}
      userData={userData}
      setUserData={() => null}
      favLanguages={userData.favoriteLanguages}
      setFavLanguages={() => null}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};

export const isWordView = (): JSX.Element => {
  return Template(true);
};
