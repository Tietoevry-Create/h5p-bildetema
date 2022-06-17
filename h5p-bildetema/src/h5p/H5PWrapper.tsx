import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { makeLanguageCode } from "../../../common/utils/LanguageCode.utils";
import { App } from "../components/App/App";
import { TranslationKey } from "../types/TranslationKey";

type Params = {
  region: string;
  l10n: Record<TranslationKey, string>;
};

export class H5PWrapper
  extends H5PContentType<Params>
  implements IH5PContentType
{
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema` to.",
      );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { l10n, region } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema");

    const root = createRoot(this.wrapper);
    root.render(
      <HashRouter>
        <H5PContext.Provider value={this}>
          <L10nContext.Provider value={l10n}>
            <ContentIdContext.Provider value={this.contentId}>
              <App
                currentLanguage={{
                  label: "Norsk Bokmål",
                  code: makeLanguageCode("nob"),
                  rtl: false,
                  isFavorite: false,
                }}
              />
            </ContentIdContext.Provider>
          </L10nContext.Provider>
        </H5PContext.Provider>
      </HashRouter>,
    );
  }
}
