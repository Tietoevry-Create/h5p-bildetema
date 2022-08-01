import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageSelectorElement } from "./LanguageSelectorElement";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

export default {
  title: "Components/LanguageSelectorElement",
  component: LanguageSelectorElement,
} as ComponentMeta<typeof LanguageSelectorElement>;

const Template: ComponentStory<typeof LanguageSelectorElement> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageSelectorElement {...args} />
);

export const Default = Template.bind({});

Default.args = {
  language: {
    label: "Norsk",
    code: makeLanguageCode("no"),
    rtl: false,
  },
};

export const Favorite = Template.bind({});
Favorite.args = {
  language: {
    label: "Norsk",
    code: makeLanguageCode("no"),
    rtl: false,
  },
};

export const RTL = Template.bind({});
RTL.args = {
  language: {
    label: "عربىge",
    code: makeLanguageCode("ar"),
    rtl: true,
  },
};
