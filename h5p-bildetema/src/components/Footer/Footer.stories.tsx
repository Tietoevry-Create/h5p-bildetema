import { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

export default {
  title: "Components/Footer",
  component: Footer,
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
