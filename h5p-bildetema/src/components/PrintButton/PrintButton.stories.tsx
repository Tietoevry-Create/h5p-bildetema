import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
import { PrintButton } from "./PrintButton";

export default {
  title: "Components/PrintButton",
  component: PrintButton,
} as ComponentMeta<typeof PrintButton>;

const Template = (): JSX.Element => {
  const topicIds = {};

  return (
    <PrintButton
      topicIds={topicIds}
      showWrittenWords
      isWordView={false}
      showTopicImageView
    />
  );
};

export const Default = (): JSX.Element => {
  return Template();
};
