import { H5PEditor, H5PWidget } from "h5p-utils";
import type {
  H5PFieldGroup,
  H5PGroup,
  IH5PFieldInstance,
  IH5PWidget,
  H5PField,
} from "h5p-types";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  changes: Array<() => void> = [];

  private backendUrl = "";

  private root: Root | undefined;

  appendTo($container: JQuery<HTMLElement>): void {
    const backendUrlField = this.findField<H5PGroup<string>>(
      "backendUrl",
    ) as unknown as H5PField & { $group: JQuery };
    this.backendUrl = (backendUrlField as any).params ?? "";

    backendUrlField.$group
      .get(0)
      ?.querySelector("input")
      ?.addEventListener("change", e => {
        this.backendUrl = (e.target as HTMLInputElement).value;
        this.trigger("backend-url-changed", this.backendUrl);
      });

    this.on("backend-url-changed", e => {
      this.render((e.data as string) ?? "");
    });

    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-chooser` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-chooser");

    this.root = createRoot(this.wrapper);
    this.render(this.backendUrl);
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }

  private findField<TField extends IH5PFieldInstance = IH5PFieldInstance>(
    path: string,
  ): TField {
    const field = H5PEditor.findField<TField>(path, this.parent);

    if (!field) {
      throw new Error(`Could not find field with path \`${path}\``);
    }

    return field;
  }

  private render(backendUrl: string): void {
    this.root?.render(
      <QueryClientProvider client={queryClient}>
        <AppChooseTopicWidget
          backendUrl={backendUrl}
          topicId={this.params?.topicId}
          subTopicId={this.params?.subTopicId}
          setValue={params => {
            this.setValue(this.field, params);
            this.trigger("change", params);
          }}
        />
      </QueryClientProvider>,
    );
  }
}
