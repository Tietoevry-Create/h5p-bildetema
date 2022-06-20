import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default = (): JSX.Element => <Header currentLanguageCode="nob" />;
