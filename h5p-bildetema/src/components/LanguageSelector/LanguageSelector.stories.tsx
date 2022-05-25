import React from "react";
import { ComponentMeta ,ComponentStory } from "@storybook/react";
import { Language } from "../../../../common/types/types";
import { fetchData, getLanguages } from "../../../../common/utils/data.utils";
import { LanguageSelector } from "./LanguageSelector";

export default {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
} as ComponentMeta<typeof LanguageSelector>;

const Template: ComponentStory<typeof LanguageSelector> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LanguageSelector {...args}/>
);

const myFunc = async () => {
  await fetchData();
  return await getLanguages();
}

export const Default = Template.bind({});

Default.args = {
  languages: [
    {
      label: "Norsk",
      code: "no",
      rtl: false
    },
    {
      label: "Engelsk",
      code: "en",
      rtl: false
    },
    {
      label: "Dansk",
      code: "dk",
      rtl: false
    },
  ]
}



export const allLanguages = Template.bind({})
allLanguages.loaders = [async () => ({
  allLanguages: (await myFunc())
})]
// allLanguages.args = {
//   languages: {myFunc()}
// }