import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageDropdown } from "./LanguageDropdown";

export default {
  title: "Components/LanguageDropdown",
  component: LanguageDropdown,
} as ComponentMeta<typeof LanguageDropdown>;

const Template: ComponentStory<typeof LanguageDropdown> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageDropdown {...args} />
);

export const Default = Template.bind({});

Default.args = { test: "Test" };
