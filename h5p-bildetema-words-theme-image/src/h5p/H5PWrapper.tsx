import type { IH5PContentType, Image } from "h5p-types";
import { H5P, H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import type { ThemeImageHotspot } from "../../../common/types/ThemeImageHotspot";
import { App } from "../App";
import type { TranslationKey } from "../types/TranslationKey";

export type Params = {
  topicImage: Image;
  hotspots: Array<ThemeImageHotspot>;
  selectedTopic: {
    topicId: string;
    subTopicId: string;
  };
  l10n: Record<TranslationKey, string>;
};

const queryClient = new QueryClient();

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

    const { topicImage, l10n } = this.params;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-topic-image-view");

    const root = createRoot(this.wrapper);
    root.render(
      <H5PContext.Provider value={this}>
        <L10nContext.Provider value={l10n}>
          <ContentIdContext.Provider value={this.contentId}>
            <QueryClientProvider client={queryClient}>
              <App
                imagePath={H5P.getPath(topicImage.path, this.contentId)}
                aspectRatio={(topicImage.width ?? 1) / (topicImage.height ?? 1)}
                params={this.params}
              />
            </QueryClientProvider>
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
