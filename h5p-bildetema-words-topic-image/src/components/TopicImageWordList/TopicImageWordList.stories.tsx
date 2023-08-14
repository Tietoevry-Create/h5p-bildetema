import { Meta, StoryFn } from "@storybook/react";
import { TopicImageWordList } from "./TopicImageWordList";

export default {
  title: "Molecules/Word list",
  component: TopicImageWordList,
} satisfies Meta<typeof TopicImageWordList>;

const Template: StoryFn<typeof TopicImageWordList> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicImageWordList {...args} />
);

export const WordList = Template.bind({});
WordList.args = {
  showWrittenWords: true,
  words: [
    {
      id: "1",
      label: "Bildetema",
      images: [{ src: "" }],
      audioFiles: [],
    },
    {
      id: "2",
      label: "Temabilde",
      images: [{ src: "" }],
      audioFiles: [],
    },
  ],
};
