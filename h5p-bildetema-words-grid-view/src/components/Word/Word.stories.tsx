import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Word } from "./Word";

export default {
  title: "Atoms/Word",
  component: Word,
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Word {...args} />
);

export const Default = Template.bind({});
Default.args = {
  word: {
    id: "V0600",
    label: "Brettspill",
    images: [
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/Lek_og_spill/V0600a.jpeg",
    ],
    audio: "https://www.w3schools.com/TAGS/horse.ogg",
  },
  textVisible: true,
};

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  word: {
    id: "V0599",
    label: "Puslespill",
    images: [
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/Lek_og_spill/V0599a.jpeg",
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/Lek_og_spill/V0599b.jpeg",
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/Lek_og_spill/V0599c.jpeg",
    ],
    audio: "https://www.w3schools.com/TAGS/horse.ogg",
  },
  textVisible: true,
};

export const NoImages = Template.bind({});
NoImages.args = {
  word: {
    id: "V0889",
    label: "Elg",
    images: [],
    audio: undefined,
  },
  textVisible: true,
};

export const HiddenText = Template.bind({});
HiddenText.args = {
  word: {
    id: "V0889",
    label: "Elg",
    images: [
      "https://hioa365.sharepoint.com/sites/Bildetema/bildefiler/Lek_og_spill/V0599c.jpeg",
    ],
    audio: undefined,
  },
  textVisible: false,
};
