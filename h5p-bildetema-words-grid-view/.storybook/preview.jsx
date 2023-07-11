import { FC } from "react";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { H5PWrapper } from "../src/h5p/H5PWrapper";
import { semantics } from "../src/semantics";

export const parameters = {
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
  semantics
    .find(group => group.name === "l10n")
    .fields.map(field => [field.name, field.default]),
);

const h5pInstance = new H5PWrapper({ region: "", l10n }, contentId, undefined);

export const decorators = [
  (/** @type {FC} */ Story) => (
    <H5PContext.Provider value={h5pInstance}>
      <L10nContext.Provider value={l10n}>
        <ContentIdContext.Provider value="content-id">
          <Story />
        </ContentIdContext.Provider>
      </L10nContext.Provider>
    </H5PContext.Provider>
  ),
];
