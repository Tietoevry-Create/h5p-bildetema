import type { IH5PContentType, Image } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import type { ThemeImageHotspot } from "../../../common/types/ThemeImageHotspot";
import App from "../App";
import type { TranslationKey } from "../types/TranslationKey";

type Params = {
  themeImage: Image;
  hotspots: Array<ThemeImageHotspot>;
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
        "Found no containing element to attach `h5p-bildetema-topic-image-view` to.",
      );
      return;
    }

    const { l10n } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-topic-image-view");

    const root = createRoot(this.wrapper);
    root.render(
      <H5PContext.Provider value={this}>
        <L10nContext.Provider value={l10n}>
          <ContentIdContext.Provider value={this.contentId}>
            <App adjective="peachy" />
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
