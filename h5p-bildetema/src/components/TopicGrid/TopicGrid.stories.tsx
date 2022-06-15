import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Topic, Word } from "../../../../common/types/types";
import { TopicGrid } from "./TopicGrid";

export default {
  label: "Molecules/ToppicGrid",
  component: TopicGrid,
} as ComponentMeta<typeof TopicGrid>;

const baseTopic: Topic = {
  id: "1",
  label: "",
  subTopics: new Map<string, Topic>(),
  words: new Map<LanguageCode, Word[]>(),
  image: {
    path: "https://s3-alpha-sig.figma.com/img/68c5/8247/e72b8c415b6ce9d1d6a9be597d0a4d41?Expires=1656288000&Signature=UTefYYa7istTasgM6UyM3pkW8ZKa1DMyAtBre4U71LnybnhJBQZnVegj1ar-d3XYupRijqy7~KCvtA9zCsvwjwohj-8EqElm9RyZD-R4Py3cmRCXyNOgwrYZdQHjcLatIqGQr7Zpj6X5hEBcZi1K~g2TOIbrTw6QdRJulmQMtxkb-RIydyenPKA23qJxlOH-gBwvEXdSegDtWQSosCCkohi8LzbQy6~S4m7TcsLCUmzjjK-jkOBxNwihZxfC0HXNSkZMFDHLvhEQB8UJ7L6Fb4aGWAo6AVz1cdgBBnURTTSIDrgRcF6e6uwyTNCs1l8DZbA-le52jYAAVd9KW8I~pQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  },
};

const Template: ComponentStory<typeof TopicGrid> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGrid {...args} />
);

export const ThemesGrid = Template.bind({});
ThemesGrid.args = {
  items: [
    { ...baseTopic, label: "test1", tema1: "test1" } as Topic,
    { ...baseTopic, label: "test2", tema1: "test2" } as Topic,
    { ...baseTopic, label: "test3", tema1: "test3" } as Topic,
    { ...baseTopic, label: "test4", tema1: "test4" } as Topic,
    { ...baseTopic, label: "test5", tema1: "test5" } as Topic,
    { ...baseTopic, label: "test6", tema1: "test6" } as Topic,
    { ...baseTopic, label: "test7", tema1: "test7" } as Topic,
    { ...baseTopic, label: "test8", tema1: "test8" } as Topic,
    { ...baseTopic, label: "test9", tema1: "test9" } as Topic,
  ],
};
