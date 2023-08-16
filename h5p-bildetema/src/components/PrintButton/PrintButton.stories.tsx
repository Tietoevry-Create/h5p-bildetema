import { Meta } from "@storybook/react";
import { PrintButton } from "./PrintButton";

export default {
  title: "Components/Print button",
  component: PrintButton,
} satisfies Meta<typeof PrintButton>;

const Template = (): JSX.Element => {
  const topicIds = {};

  return (
    <PrintButton
      topicIds={topicIds}
      showWrittenWords
      isWordView={false}
      showTopicImageView
      showArticles
    />
  );
};

export const Default = (): JSX.Element => {
  return Template();
};
