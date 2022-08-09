import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Bildetema } from "./Bildetema";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} as ComponentMeta<typeof Bildetema>;

export const Default = (): JSX.Element => <Bildetema />;
