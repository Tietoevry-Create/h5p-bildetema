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
      setTopicsSize={setTopicsSize}
      topicsSize={topicSize}
      isWordView={isWordView}
      handleToggleChange={(value: boolean) => {
        setChecked(value);
      }}
      toggleChecked={checked}
    />
  );
};

export const Default = (): JSX.Element => {
  return Template(false);
};

export const isWordView = (): JSX.Element => {
  return Template(true);
};
