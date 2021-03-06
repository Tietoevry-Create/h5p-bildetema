import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Header } from "./Header";
import { TopicGridSizes } from "../../../../common/types/types";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template = (isWordView: boolean): JSX.Element => {
  const [checked, setChecked] = React.useState(true);
  const [topicSize, setTopicsSize] = React.useState(TopicGridSizes.Big);

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
      selectedLanguages={[]}
      userData={{
        currentLanguage: {
          label: "Norsk (Bokmål)",
          code: makeLanguageCode("nob"),
          rtl: false,
          isFavorite: false,
        },
      }}
      setUserData={() => null}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};

export const isWordView = (): JSX.Element => {
  return Template(true);
};
