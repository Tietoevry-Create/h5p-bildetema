import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { HashRouter } from "react-router-dom";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import App from "./App";

export default {
  title: "App",
  component: App,
  decorators: [
    Story => (
      <HashRouter>
        <Story />
      </HashRouter>
    ),
  ],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App {...args} />
);

export const Default = Template.bind({});

Default.args = {
  adjective: "funny",
  currentLanguage: {
    label: "Norsk Bokmål",
    code: makeLanguageCode("nb"),
    rtl: false,
    isFavorite: false,
  },
};
