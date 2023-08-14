import { Meta, StoryFn } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "Components/Image",
  component: Image,
} satisfies Meta<typeof Image>;

const Template: StoryFn<typeof Image> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Image {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: {
    path: "https://images.unsplash.com/photo-1617051571090-85766fa13621?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    width: 800,
  },
};
