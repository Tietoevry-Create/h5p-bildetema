import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} satisfies Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    topicIds: {},
    favLanguages: [
      {
        label: "Norsk (bokmål)",
        code: "nob",
        rtl: false,
      },
      {
        label: "Norsk (nynorsk)",
        code: "nno",
        rtl: false,
      },
      {
        label: "Polsk",
        code: "pol",
        rtl: false,
      },
    ],
    firstTime: false,
    setFirstTime: () => null,
    handleToggleFavoriteLanguage: () => null,
  },
};
