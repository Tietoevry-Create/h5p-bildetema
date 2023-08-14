import { Meta, StoryFn } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

const Template: StoryFn<typeof Breadcrumbs> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Breadcrumbs {...args} />
);

export const Default = Template.bind({});
Default.args = {
  breadCrumbs: [
    { label: "Tema", path: "/tema" },
    { label: "Dyr", path: "/tema/dyr" },
    { label: "Dyr i skogen", path: "/tema/dyr/dyr-i-skogen" },
    { label: "Elg", path: "/tema/dyr/dyr-i-skogen/elg" },
  ],
};

export const SingleBreadcrumb = Template.bind({});
SingleBreadcrumb.args = {
  breadCrumbs: [{ label: "Tema", path: "/tema" }],
};

export const EmptyBreadcrumb = Template.bind({});
EmptyBreadcrumb.args = {
  breadCrumbs: [],
};
