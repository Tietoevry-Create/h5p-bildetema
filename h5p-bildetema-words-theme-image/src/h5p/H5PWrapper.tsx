import type { IH5PContentType, Image } from "h5p-types";
import { H5P, H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import type { ThemeImageHotspot } from "../../../common/types/ThemeImageHotspot";
import { App } from "../App";
import type { TranslationKey } from "../types/TranslationKey";

export type Params = {
  "bildetema-words-topic-view": {
    topicImage: Image;
    hotspots: Array<ThemeImageHotspot>;
    selectedTopic: {
      topic: string;
      subTopic: string;
    };
  };
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
            <App
              imagePath={H5P.getPath(
                this.params["bildetema-words-topic-view"].topicImage.path,
                this.contentId,
              )}
              params={this.params}
            />
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
