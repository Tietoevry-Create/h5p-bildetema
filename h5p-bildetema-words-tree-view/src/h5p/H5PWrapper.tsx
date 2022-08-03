import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../App";

export class H5PWrapper extends H5PContentType implements IH5PContentType {
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

    const root = createRoot(this.wrapper);
    root.render(<App adjective="peachy" />);
  }
}
