import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import { Word } from "../../../common/types/types";
import App from "../App";
import { TranslationKey } from "../types/TranslationKey";

type Params = {
  ["bildetema-words-grid-view-words"]?: Word[];
  ["bildetema-words-grid-view-show"]?: boolean;
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
        "Found no containing element to attach `h5p-bildetema-words-grid-view` to.",
      );
      return;
    }

    const {
      l10n,
      "bildetema-words-grid-view-words": words,
      "bildetema-words-grid-view-show": showWrittenWords,
    } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-words-grid-view");

    const root = createRoot(this.wrapper);
    root.render(
      <H5PContext.Provider value={this}>
        <L10nContext.Provider value={l10n}>
          <ContentIdContext.Provider value={this.contentId}>
            <App
              words={words ?? []}
              showWrittenWords={showWrittenWords ?? true}
            />
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
