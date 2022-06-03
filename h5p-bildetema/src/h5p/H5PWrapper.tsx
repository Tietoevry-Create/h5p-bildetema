import type { IH5PContentType } from "h5p-types";
import { H5PContentType } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { makeLanguageCode } from "../../../common/utils/LanguageCode.utils";
import App from "../components/App/App";

type Params = {
  region: string;
};

export class H5PWrapper
  extends H5PContentType<Params>
  implements IH5PContentType
{
  attach($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-bildetema");

    const root = createRoot(this.wrapper);
    root.render(
      <HashRouter>
        <App
          adjective="peachy"
          currentLanguage={{
            label: "Norsk Bokmål",
            code: makeLanguageCode("nb"),
            rtl: false,
            isFavorite: false,
          }}
        />
      </HashRouter>,
    );
  }
}
