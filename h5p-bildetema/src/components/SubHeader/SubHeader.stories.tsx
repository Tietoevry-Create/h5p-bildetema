import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SubHeader } from "./SubHeader";
import { TopicGridSizes } from "../../../../common/types/types";

export default {
  title: "Components/SubHeader",
  component: SubHeader,
} as ComponentMeta<typeof SubHeader>;

const Template = (
  isWordView: boolean,
  isTopicImageView: boolean,
): JSX.Element => {
  const [checked, setChecked] = React.useState(true);
  const [topicSize, setTopicsSize] = React.useState(TopicGridSizes.Big);

  return (
    <SubHeader
      setTopicsSize={setTopicsSize}
      topicsSize={topicSize}
      isWordView={isWordView}
      handleToggleChange={(value: boolean) => {
        setChecked(value);
      }}
      toggleChecked={checked}
      isTopicImageView={isTopicImageView}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false, false);
};

export const isWordView = (): JSX.Element => {
  return Template(true, false);
};
export const isTopicImageView = (): JSX.Element => {
  return Template(true, true);
};
