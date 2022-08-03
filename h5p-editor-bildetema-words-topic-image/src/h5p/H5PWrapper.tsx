import type {
  H5PFieldGroup,
  H5PGroup,
  IH5PEditorImageField,
  IH5PFieldInstance,
  IH5PWidget,
  Image,
} from "h5p-types";
import { H5P, H5PEditor, H5PWidget } from "h5p-utils";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { LanguageCode } from "../../../common/types/LanguageCode";
import { Word } from "../../../common/types/types";
import { getTopics } from "../../../common/utils/data.utils";
import { App } from "../App";
import { Hotspot } from "../types/Hotspot";
import { SetValueContext } from "../contexts/SetValueContext";
import { Params as ChooseTopicParams } from "./ChooseTopicH5PWrapper";

type Field = H5PFieldGroup;
export type Params = Array<Hotspot>;

export class H5PWrapper extends H5PWidget<Field, Params> implements IH5PWidget {
  private image: Image | undefined;

  private root: Root | undefined;

  private words: Map<LanguageCode, Array<Word>> = new Map();

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-image` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-image");

    const selectedTopicField = this.findField<H5PGroup>("../selectedTopic");
    const imageField = this.findField<IH5PEditorImageField>("../topicImage");

    imageField.changes.push(() => {
      this.image = H5PWrapper.fetchImage(imageField);
      this.render();
    });

    selectedTopicField.on("change", async e => {
      const { data } = e as { data: ChooseTopicParams };
      const newWords = await H5PWrapper.fetchTopic(data.topic, data.subTopic);

      this.words = newWords;
      this.render();
    });

    this.image = H5PWrapper.fetchImage(imageField);
    this.render();
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }

  private static fetchImage(field: IH5PEditorImageField): Image | undefined {
    if (field && field.params) {
      return {
        ...field.params,
        path: H5P.getPath(field.params.path, H5PEditor.contentId),
      };
    }
    return undefined;
  }

  private static async fetchTopic(
    topicId: string,
    subTopicId: string | undefined,
  ): Promise<Map<LanguageCode, Word[]>> {
    const topics = await getTopics();
    const topic = topics.find(t => t.id === topicId);

    if (subTopicId) {
      return (
        topic?.subTopics.get(subTopicId)?.words ??
        new Map<LanguageCode, Word[]>()
      );
    }
    return topic?.words ?? new Map<LanguageCode, Word[]>();
  }

  private render(): void {
    if (!this.root) {
      this.root = createRoot(this.wrapper);
    }

    this.root.render(
      <SetValueContext.Provider value={this.setValueForField}>
        <App
          image={this.image}
          words={this.words}
          initialHotspots={this.params?.filter(Boolean) ?? []}
        />
      </SetValueContext.Provider>,
    );
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

  private setValueForField = (params: Params): void => {
    // @ts-expect-error The first element for some reason becomes an empty string. Therefore, we need to put something in front which will be substituted.
    this.setValue(this.field, [false, ...params]);
  };
}
