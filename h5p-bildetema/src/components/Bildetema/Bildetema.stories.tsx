import React from "react";
import { ComponentMeta } from "@storybook/react";
import { HashRouter } from "react-router-dom";
import { Bildetema } from "./Bildetema";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { Language } from "../../../../common/types/types";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
  decorators: [
    Story => (
      <HashRouter>
        <Story />
      </HashRouter>
    ),
  ],
} as ComponentMeta<typeof Bildetema>;

export const Default = (
  args: JSX.IntrinsicAttributes & { currentLanguage: Language },
  // eslint-disable-next-line react/jsx-props-no-spreading
): JSX.Element => <Bildetema {...args} />;

Default.args = {
  adjective: "test",
  currentLanguage: {
    label: "Norsk Bokmål",
    code: makeLanguageCode("nb"),
    rtl: false,
    isFavorite: false,
  },
};
