import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type {
  H5PField,
  H5PGroup,
  IH5PFieldInstance,
  IH5PWidget,
} from "h5p-types";
import { H5PEditor, H5PWidget } from "h5p-utils";
import { Root, createRoot } from "react-dom/client";
import { AppChooseTopicWidget } from "../App_ChooseTopicWidget";
import { BackendUrlField, Field } from "../types/Fields";

export type Params = {
  topicId: string;
  subTopicId?: string;
};

const queryClient = new QueryClient();

export class ChooseTopicH5PWrapper
  extends H5PWidget<Field, Params>
  implements IH5PWidget {
  changes: Array<() => void> = [];

  private backendUrl = "";

  private root: Root | undefined;

  appendTo($container: JQuery<HTMLElement>): void {
    const backendUrlField = this.findField<H5PGroup<string>>(
      "backendUrl",
    ) as unknown as H5PField & { $input: JQuery };
    this.backendUrl = (backendUrlField as BackendUrlField).value ?? "";

    backendUrlField.$input.get(0)?.addEventListener("change", e => {
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
