import { Word } from "common/types/types";
import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import { createRoot, Root } from "react-dom/client";
import { ContentIdContext, H5PContext, L10nContext } from "use-h5p";
import App from "../App";
import { TranslationKey } from "../types/TranslationKey";

export type Params = {
  words?: Word[];
  showWrittenWords?: boolean;
  showArticles?: boolean;
  l10n: Record<TranslationKey, string>;
  onOpenDialog: (id: string) => void;
};

export class H5PWrapper
  extends H5PContentType<Params>
  implements IH5PContentType
{
  private root: Root | undefined;

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-grid-view` to.",
      );

      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-words-grid-view");

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

    const params: Params = {
      ...this.params,
      ...overrideParams,
    };

    this.root?.render(
      <H5PContext.Provider value={this}>
        <L10nContext.Provider value={params.l10n}>
          <ContentIdContext.Provider value={this.contentId}>
            <App
              words={params.words ?? []}
              showWrittenWords={params.showWrittenWords ?? true}
              showArticles={params.showArticles ?? false}
              onOpenDialog={params.onOpenDialog}
            />
          </ContentIdContext.Provider>
        </L10nContext.Provider>
      </H5PContext.Provider>,
    );
  }
}
