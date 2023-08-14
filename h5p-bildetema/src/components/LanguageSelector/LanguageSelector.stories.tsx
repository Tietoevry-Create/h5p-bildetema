import { Meta, StoryFn } from "@storybook/react";
import { Language } from "common/types/types";
import { LanguageSelector, LanguageSelectorProps } from "./LanguageSelector";

export default {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

const Template: StoryFn<typeof LanguageSelector> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageSelector {...args} />
);

export const Default = Template.bind({});

const defaultArgs: LanguageSelectorProps = {
  topicIds: {},
  search: "",
  favLanguages: [
    {
      label: "Polsk",
      code: "pol",
      rtl: false,
    },
  ],
  currentLanguageCode: "nob",
  handleToggleFavoriteLanguage: (lang: Language, fav: boolean): void => {
    console.info(fav);
  },
};

Default.args = defaultArgs;
