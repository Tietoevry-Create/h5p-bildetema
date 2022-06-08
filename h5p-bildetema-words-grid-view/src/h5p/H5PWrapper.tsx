import * as React from "react";
import type { H5PExtras, IH5PContentType } from "h5p-types";
import * as ReactDOM from "react-dom";
import App from "../App";
import { H5P } from "./H5P.util";
import { Word } from "../../../common/types/types";

type Params = {
  ["bildetema-words-grid-view"]?: Word[];
};
export class H5PWrapper extends H5P.EventDispatcher implements IH5PContentType {
  private wrapper: HTMLElement;

  constructor(params: Params, contentId: string, extras?: H5PExtras) {
    super();
    console.info("Bildetema words view grid constructor", params);
    this.wrapper = H5PWrapper.createWrapperElement();

    ReactDOM.render(
      <App words={params["bildetema-words-grid-view"] as Word[]} />,
      this.wrapper,
    );
  }

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
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
