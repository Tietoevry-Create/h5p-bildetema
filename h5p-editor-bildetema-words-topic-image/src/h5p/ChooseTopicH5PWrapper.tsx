import type { H5PFieldGroup, IH5PWidget, Image } from "h5p-types";
import { H5P, H5PEditor, H5PWidget } from "h5p-utils";
import { QueryClient, QueryClientProvider } from "react-query";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../App";
import { AppChooseTopicWidget } from "../App_ChoseTopicWidget";
import { SetValueTopicChooserContext } from "../contexts/SetValueTopicChooserContext";

type Field = H5PFieldGroup;
export type Params = {
  topic: string;
  subTopic: string | undefined;
};
const queryClient = new QueryClient();
export class ChooseTopicH5PWrapper extends H5PWidget<Field, Params> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>): void {
    console.info("ChooseTopicH5PWrapper", "appendTo");
    console.info("ChooseTopicH5PWrapper params", this.params);
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-chooser` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-chooser");

    
    const root = createRoot(this.wrapper);
    console.info("parent", this.parent);
    const thisField = (H5PEditor as any).findField("topics", this.parent);
    console.info("thisField", thisField);
    root.render(
        <QueryClientProvider client={queryClient}>
          <AppChooseTopicWidget topicId={this.params?.topic} subTopicId={this.params?.subTopic}  setValue={(value:Params) => {this.setValue(this.field, value); console.info("field", (H5PEditor as any).findField("topics", this.parent)); ((H5PEditor as any).findField("topics", this.parent) as any).trigger("change", value)}}/>
        </QueryClientProvider>
    );
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }
}
