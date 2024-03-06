/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { TopicGridSizes } from "common/types/types";
import { useState } from "react";
import { SubHeader } from "./SubHeader";

export default {
  title: "Components/Sub header",
  component: SubHeader,
  render: ({ isWordView, rtl }) => {
    const [checked, setChecked] = useState(true);
    const [articlesChecked, setArticlesChecked] = useState(true);
    const [topicSize, setTopicsSize] = useState(TopicGridSizes.Big);

    return (
      <SubHeader
        currentTopics={{}}
        setTopicsSize={setTopicsSize}
        topicsSize={topicSize}
        isWordView={isWordView}
        handleToggleChange={(value: boolean) => {
          setChecked(value);
        }}
        toggleChecked={checked}
        showTopicImageView={false}
        rtl={rtl}
        handleToggleArticles={(value: boolean): void => {
          setArticlesChecked(value);
        }}
        articlesToggleChecked={articlesChecked}
      />
    );
  },
} satisfies Meta<typeof SubHeader>;

type Story = StoryObj<typeof SubHeader>;

export const Default: Story = {
  args: {
    isWordView: false,
    rtl: false,
  },
};

export const DefaultRtl: Story = {
  args: {
    isWordView: false,
    rtl: true,
  },
};

export const isWordView: Story = {
  args: {
    isWordView: true,
    rtl: false,
  },
};

export const isWordViewRtl: Story = {
  args: {
    isWordView: true,
    rtl: true,
  },
};

export const isTopicImageView: Story = {
  args: {
    isWordView: true,
    rtl: false,
  },
};

export const isTopicImageViewRtl: Story = {
  args: {
    isWordView: true,
    rtl: true,
  },
};
