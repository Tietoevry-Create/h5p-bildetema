import { Word } from "common/types/types";
import {
  getNewData,
  getNewWordsFromId,
  newWordsIsTopics,
  newWordsToWords,
} from "common/utils/data.utils";
import type {
  H5PField,
  H5PGroup,
  H5PImage,
  IH5PEditorImageField,
  IH5PFieldInstance,
  IH5PWidget,
} from "h5p-types";
import { H5P, H5PEditor, H5PWidget } from "h5p-utils";
import { Root, createRoot } from "react-dom/client";
import { App } from "../App";
import { SetValueContext } from "../contexts/SetValueContext";
import { Hotspot } from "../types/Hotspot";
import { Params as ChooseTopicParams } from "./ChooseTopicH5PWrapper";
import { BackendUrlField, Field } from "../types/Fields";

export type Params = Array<Hotspot>;

export class H5PWrapper extends H5PWidget<Field, Params> implements IH5PWidget {
  private image: H5PImage | undefined;

  private root: Root | undefined;

  private topicId = "";

  private subTopicId: string | undefined = undefined;

  private backendUrl = "";

  private words: Array<Word> = [];

  appendTo($container: JQuery<HTMLElement>): void {
    const backendUrlField = this.findField<H5PGroup<string>>(
      "backendUrl",
    ) as unknown as H5PField & { $input: JQuery };

    this.backendUrl = (backendUrlField as BackendUrlField).value ?? "";

    backendUrlField.$input.get(0)?.addEventListener("change", e => {
      this.backendUrl = (e.target as HTMLInputElement).value;
      this.trigger("backend-url-changed", this.backendUrl);
    });

    this.on("backend-url-changed", async () => {
      const newWords = await H5PWrapper.fetchTopic(
        this.topicId,
        this.subTopicId,
        this.backendUrl,
      );

      this.words = newWords;
      this.render();
    });

    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-image` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-image");

    const selectedTopicField = this.findField<H5PGroup>("selectedTopic");
    const imageField = this.findField<IH5PEditorImageField>("topicImage");

    imageField.changes.push(() => {
      this.image = H5PWrapper.fetchImage(imageField);
      this.render();
    });

    selectedTopicField.on("change", async event => {
      const {
        data: { topicId, subTopicId },
      } = event as { data: ChooseTopicParams };
      this.topicId = topicId;
      this.subTopicId = subTopicId;

      const newWords = await H5PWrapper.fetchTopic(
        topicId,
        subTopicId,
        this.backendUrl,
      );
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

  private static fetchImage(field: IH5PEditorImageField): H5PImage | undefined {
    if (field?.params) {
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
    backendUrl: string,
  ): Promise<Array<Word>> {
    // ): Promise<Map<LanguageCode, Word[]>> {

    // TODO new Data
    const res = await getNewData(backendUrl);
    if (!res) return [];
    if (subTopicId) {
      const newWords = getNewWordsFromId(
        subTopicId,
        res.idToWords,
        res.idToContent,
      );
      return newWordsToWords(newWords, "nob", backendUrl);
    }
    const newWords = getNewWordsFromId(topicId, res.idToWords, res.idToContent);
    // When the words are topics we dont want them to show in the image
    if (newWordsIsTopics(newWords)) return [];
    return newWordsToWords(newWords, "nob", backendUrl);
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
    this.setValue(this.field, params);
  };
}
