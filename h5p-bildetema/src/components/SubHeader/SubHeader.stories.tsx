import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SubHeader } from "./SubHeader";
import { TopicGridSizes } from "../../../../common/types/types";

export default {
  title: "Components/SubHeader",
  component: SubHeader,
} as ComponentMeta<typeof SubHeader>;

const Template = (isWordView: boolean): JSX.Element => {
  const [checked, setChecked] = React.useState(true);
  const [topicSize, setTopicsSize] = React.useState(TopicGridSizes.Big);

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
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};

export const isWordView = (): JSX.Element => {
  return Template(true);
};
export const isTopicImageView = (): JSX.Element => {
  return Template(true);
};
