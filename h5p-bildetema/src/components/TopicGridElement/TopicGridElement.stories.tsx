import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TopicGridElement } from "./TopicGridElement";

export default {
  title: "Atoms/Grid Element",
  component: TopicGridElement,
} as ComponentMeta<typeof TopicGridElement>;

const Template: ComponentStory<typeof TopicGridElement> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TopicGridElement {...args} />
);

export const ThemesGridElement = Template.bind({});
ThemesGridElement.args = {
  index: 0,
  title: "test",
  image: {
    path: "https://s3-alpha-sig.figma.com/img/68c5/8247/e72b8c415b6ce9d1d6a9be597d0a4d41?Expires=1656288000&Signature=UTefYYa7istTasgM6UyM3pkW8ZKa1DMyAtBre4U71LnybnhJBQZnVegj1ar-d3XYupRijqy7~KCvtA9zCsvwjwohj-8EqElm9RyZD-R4Py3cmRCXyNOgwrYZdQHjcLatIqGQr7Zpj6X5hEBcZi1K~g2TOIbrTw6QdRJulmQMtxkb-RIydyenPKA23qJxlOH-gBwvEXdSegDtWQSosCCkohi8LzbQy6~S4m7TcsLCUmzjjK-jkOBxNwihZxfC0HXNSkZMFDHLvhEQB8UJ7L6Fb4aGWAo6AVz1cdgBBnURTTSIDrgRcF6e6uwyTNCs1l8DZbA-le52jYAAVd9KW8I~pQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  },
};
