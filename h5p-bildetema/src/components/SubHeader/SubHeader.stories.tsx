import { Meta } from "@storybook/react";
import { TopicGridSizes } from "common/types/types";
import { useState } from "react";
import { SubHeader } from "./SubHeader";

export default {
  title: "Components/SubHeader",
  component: SubHeader,
} satisfies Meta<typeof SubHeader>;

const Template = (isWordView: boolean, isRtl: boolean): JSX.Element => {
  const [checked, setChecked] = useState(true);
  const [articlesChecked, setArticlesChecked] = useState(true);
  const [topicSize, setTopicsSize] = useState(TopicGridSizes.Big);

  return (
    <SubHeader
      topicIds={{}}
      setTopicsSize={setTopicsSize}
      topicsSize={topicSize}
      isWordView={isWordView}
      handleToggleChange={(value: boolean) => {
        setChecked(value);
      }}
      toggleChecked={checked}
      showTopicImageView={false}
      rtl={isRtl}
      handleToggleArticles={(value: boolean): void => {
        setArticlesChecked(value);
      }}
      articlesToggleChecked={articlesChecked}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false, false);
};

export const DefaultRtl = (): JSX.Element => {
  return Template(false, true);
};

export const isWordView = (): JSX.Element => {
  return Template(true, false);
};

export const isWordViewRtl = (): JSX.Element => {
  return Template(true, true);
};

export const isTopicImageView = (): JSX.Element => {
  return Template(true, false);
};

export const isTopicImageViewRtl = (): JSX.Element => {
  return Template(true, true);
};
