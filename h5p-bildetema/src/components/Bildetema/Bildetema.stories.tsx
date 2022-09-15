import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from "@storybook/react";
import { Bildetema } from "./Bildetema";

export default {
  title: "Bildetema/Bildetema",
  component: Bildetema,
} as ComponentMeta<typeof Bildetema>;

export const Default = (): JSX.Element => (
  <Bildetema defaultLanguages={["nob"]} isLoadingData />
);
