import type { H5PFieldGroup, IH5PWidget, Image } from "h5p-types";
import { H5PWidget } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../App";
import { SetValueContext } from "../contexts/SetValueContext";

type Field = H5PFieldGroup;
export type Params = {
  image: Image;
};

export class H5PWrapper extends H5PWidget<Field, Params> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-image` to.",
      );
      return;
    }

    const image = this.params?.image;

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema-words-topic-image");

    const root = createRoot(this.wrapper);
    root.render(
      <SetValueContext.Provider value={this.setValue}>
        <App image={image} />
      </SetValueContext.Provider>,
    );
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }
}
