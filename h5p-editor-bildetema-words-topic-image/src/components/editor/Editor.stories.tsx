import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Editor } from "./Editor";

export default {
  title: "Components/Editor",
  component: Editor,
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Editor {...args} />
);

export const Portrait = Template.bind({});
Portrait.args = {
  image: {
    // path: "https://images.unsplash.com/photo-1537017206014-37e7e84d84c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    path: "https://images.unsplash.com/photo-1617051571090-85766fa13621?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  words: [
    { audio: "", label: "Mor", id: "V0002", images: [] },
    { audio: "", label: "Far", id: "V0003", images: [] },
    { audio: "", label: "Sønn", id: "V0005", images: [] },
  ],
};
export const Landscape = Template.bind({});
Landscape.args = {
  image: {
    path: "https://prodbildetemabackend.blob.core.windows.net/images/xlarge/V0001a.jpeg",
  },
  words: [
    { audio: "", label: "Mor", id: "V0002", images: [] },
    { audio: "", label: "Far", id: "V0003", images: [] },
    { audio: "", label: "Sønn", id: "V0005", images: [] },
    { audio: "", label: "Datter", id: "V0006", images: [] },
  ],
};

// export const EmptyBreadcrumb = Template.bind({});
// EmptyBreadcrumb.args = {
//   Editor: [],
// };
