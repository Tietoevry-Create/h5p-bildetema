/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { TopicGridSizes } from "common/types/types";
import { useState } from "react";
import { SubHeader } from "./SubHeader";

export default {
  title: "Components/Sub header",
  component: SubHeader,
  render: ({ isWordView, rtl }) => {
    const [topicsSize, setTopicsSize] = useState(TopicGridSizes.Big);
    const [showArticlesToggle] = useState(true);

    return (
      <SubHeader
        topicsSize={topicsSize}
        setTopicsSize={setTopicsSize}
        isWordView={isWordView}
        showTopicImageView={false}
        rtl={rtl}
        showArticlesToggle={showArticlesToggle}
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
