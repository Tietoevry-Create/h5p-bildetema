import type { IH5PContentType, Image } from "h5p-types";
import { H5P, H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import type { TopicImageHotspot } from "../../../common/types/TopicImageHotspot";
import { App } from "../App";
import type { TranslationKey } from "../types/TranslationKey";
import { LanguageCode } from "../../../common/types/LanguageCode";

export type Params = {
  topicImage: Image;
  hotspots: Array<TopicImageHotspot>;
  selectedTopic: {
    topicId: string;
    subTopicId: string;
  };
  l10n: Record<TranslationKey, string>;
  currentLanguage?: LanguageCode;
};

const queryClient = new QueryClient();

export class H5PWrapper
  extends H5PContentType<Params>
  implements IH5PContentType
{
  private root: Root | undefined;

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-topic-image-view` to.",
      );
      return;
    }
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-topic-image-view");

    this.root = createRoot(this.wrapper);
    this.render();

    this.on<Partial<Params>>("change-params", ({ data: updatedParams }) => {
      this.onChangeParams(updatedParams);
    });
  }

  private onChangeParams(updatedParams: Partial<Params>): void {
    this.render(updatedParams);
  }

  private render(overrideParams?: Partial<Params>): void {
    // This is not a React context, so we can't use useMemo
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const params: Params = {
      ...this.params,
      ...overrideParams,
    };

    const { topicImage, l10n } = params;

    this.root?.render(
      <H5PContext.Provider value={this}>
        <L10nContext.Provider value={l10n}>
          <ContentIdContext.Provider value={this.contentId}>
            <QueryClientProvider client={queryClient}>
              <App
                imagePath={H5P.getPath(
                  topicImage.path.replace("#tmp", ""),
                  this.contentId,
                )}
                aspectRatio={(topicImage.width ?? 1) / (topicImage.height ?? 1)}
                params={params}
              />
            </QueryClientProvider>
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
