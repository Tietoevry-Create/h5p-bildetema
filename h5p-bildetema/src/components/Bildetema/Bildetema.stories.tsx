import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Bildetema } from "./Bildetema";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
import { Language } from "../../../../common/types/types";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} as ComponentMeta<typeof Bildetema>;

export const Default = (
  args: JSX.IntrinsicAttributes & { currentLanguage: Language },
  // eslint-disable-next-line react/jsx-props-no-spreading
): JSX.Element => <Bildetema {...args} />;

Default.args = {
  currentLanguage: {
    label: "Norsk Bokmål",
    code: makeLanguageCode("nob"),
    rtl: false,
  },
};
