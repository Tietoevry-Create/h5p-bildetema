import * as React from "react";
import type { H5PExtras, IH5PContentType } from "h5p-types";
import * as ReactDOM from "react-dom/client";
import App from "../components/App/App";
import { H5P } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher implements IH5PContentType {
  private wrapper: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(params: unknown, contentId: string, extras?: H5PExtras) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />, this.wrapper);
  }

  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-h5p-bildetema` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-h5p-bildetema");
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
