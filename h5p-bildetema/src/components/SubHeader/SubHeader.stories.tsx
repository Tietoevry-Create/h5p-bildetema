import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SubHeader } from "./SubHeader";
import { TopicGridSizes } from "../../../../common/types/types";

export default {
  title: "Components/SubHeader",
  component: SubHeader,
} as ComponentMeta<typeof SubHeader>;

const Template = (isWordView: boolean, isRtl: boolean): JSX.Element => {
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
      rtl={isRtl}
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
