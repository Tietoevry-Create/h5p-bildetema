import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import Word from "./Word";
import {Word as WordType} from '../../../../common/types/types'

export default {
  title: "Word",
  component: Word,
} as ComponentMeta<typeof Word>;

const Template: ComponentStory<typeof Word> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Word {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  clickHandler(word : WordType) {
    console.log(word)
  },
  word: {
    id: "V0889",
    label: "Elg",
    images: ["https://images.unsplash.com/photo-1549471013-3364d7220b75?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340"]
  },
  textVisible: true
}

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  clickHandler(word : WordType) {
    console.log(word)
  },
  word: {
    id: "V0889",
    label: "Elg",
    images: [
      "http://oddestemmen-camp.no/images/phocagallery/Tierbilder/thumbs/phoca_thumb_l__mg_2903.jpg",
      "http://oddestemmen-camp.no/images/phocagallery/Tierbilder/thumbs/phoca_thumb_l__mg_2903.jpg",
  ]
  },
  textVisible: true
}

export const NoImages = Template.bind({});
NoImages.args = {
  clickHandler(word : WordType) {
    console.log(word)
  },
  word: {
    id: "V0889",
    label: "Elg",
    images: []
  },
  textVisible: true
}

export const HiddenText = Template.bind({});
HiddenText.args = {
  clickHandler(word : WordType) {
    console.log(word)
  },
  word: {
    id: "V0889",
    label: "Elg",
    images: ["http://oddestemmen-camp.no/images/phocagallery/Tierbilder/thumbs/phoca_thumb_l__mg_2903.jpg"]
  },
  textVisible: false
}
