import { Parameters } from "@storybook/react";
import { H5PL10n } from "h5p-types";
import React, { FC } from "react";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import semantics from "../semantics.json";
import { H5PWrapper, Params } from "../src/h5p/H5PWrapper";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const contentId = "content-id";
const l10n = Object.fromEntries(
  (semantics.find(group => group.name === "l10n") as H5PL10n).fields.map(
    field => [field.name, field.default],
  ),
);

const h5pInstance = new H5PWrapper(
  { region: "", l10n } as unknown as Params,
  contentId,
  undefined,
);

export const decorators = [
  (Story: FC) => (
    <H5PContext.Provider value={h5pInstance}>
      <L10nContext.Provider value={l10n}>
        <ContentIdContext.Provider value="content-id">
          <Story />
        </ContentIdContext.Provider>
      </L10nContext.Provider>
    </H5PContext.Provider>
  ),
];
