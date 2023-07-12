import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LanguageDropdown, LanguageDropdownProps } from "./LanguageDropdown";

export default {
  title: "Components/LanguageDropdown",
  component: LanguageDropdown,
} as ComponentMeta<typeof LanguageDropdown>;

const Template: ComponentStory<typeof LanguageDropdown> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageDropdown {...args} />
);

export const Default = Template.bind({});

const defaultArgs: LanguageDropdownProps = {
  search: "",
  currentLanguageCode: "nob",
  topicIds: {},
  handleSelectorVisibility: () => null,
  handleToggleFavoriteLanguage: () => null,
  langSelectorIsShown: true,
  firstTime: true,
  favLanguages: [
    {
      label: "Norsk (Bokmål)",
      code: "nob",
      rtl: false,
    },
  ],
  selectLanguageLabel: "Select language",
};

Default.args = defaultArgs;
