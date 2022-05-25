import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "../components/App/App";

export class H5PWrapper extends H5PContentType implements IH5PContentType {
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-topic-list` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-topic-list");

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App adjective="beautiful" />, this.wrapper);
  }
}
