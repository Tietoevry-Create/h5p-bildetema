import { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    breadCrumbs: [
      { label: "Tema", path: "/tema" },
      { label: "Dyr", path: "/tema/dyr" },
      { label: "Dyr i skogen", path: "/tema/dyr/dyr-i-skogen" },
      { label: "Elg", path: "/tema/dyr/dyr-i-skogen/elg" },
    ],
  },
};

export const SingleBreadcrumb: Story = {
  args: {
    breadCrumbs: [{ label: "Tema", path: "/tema" }],
  },
};

export const EmptyBreadcrumb: Story = {
  args: {
    breadCrumbs: [],
  },
};
