import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as React from "react";
import { HashRouter } from "react-router-dom";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import App from "./App";

const queryClient = new QueryClient();

export default {
  title: "App",
  component: App,
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Story />
        </HashRouter>
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App {...args} />
);

export const Default = Template.bind({});

Default.args = {
  currentLanguage: {
    label: "Norsk Bokmål",
    code: makeLanguageCode("nb"),
    rtl: false,
    isFavorite: false,
  },
};
