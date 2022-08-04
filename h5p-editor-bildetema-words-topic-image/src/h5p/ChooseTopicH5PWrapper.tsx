import type { H5PFieldGroup, H5PGroup, IH5PWidget } from "h5p-types";
import { H5PEditor, H5PWidget } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppChooseTopicWidget } from "../App_ChooseTopicWidget";

type Field = H5PFieldGroup;

export type Params = {
  topicId: string;
  subTopicId?: string;
};

const queryClient = new QueryClient();

export class ChooseTopicH5PWrapper
  extends H5PWidget<Field, Params>
  implements IH5PWidget
{
  appendTo($container: JQuery<HTMLElement>): void {
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

    root.render(
      <QueryClientProvider client={queryClient}>
        <AppChooseTopicWidget
          topicId={this.params?.topicId}
          subTopicId={this.params?.subTopicId}
          setValue={params => {
            this.setValue(this.field, params);

            const topicsField = H5PEditor.findField<H5PGroup<Params>>(
              "selectedTopic",
              this.parent,
            );

            if (topicsField) {
              topicsField.trigger("change", params);
            }
          }}
        />
      </QueryClientProvider>,
    );
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }
}
