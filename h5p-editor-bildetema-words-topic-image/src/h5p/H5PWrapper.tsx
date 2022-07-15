import type { H5PFieldGroup, IH5PWidget, Image } from "h5p-types";
import { H5P, H5PEditor, H5PWidget } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../App";
import { SetValueContext } from "../contexts/SetValueContext";
import { getTopics } from "../../../common/utils/data.utils";
import { LanguageCode } from "../../../common/types/LanguageCode";
import { Word } from "../../../common/types/types";
import { Hotspot } from "../components/Svg/Svg";

type Field = H5PFieldGroup;
export type Params = Array<Hotspot>;

export class H5PWrapper extends H5PWidget<Field, Params> implements IH5PWidget {
  appendTo($container: JQuery<HTMLElement>): void {
    console.info("editor-bildetema-wors-topic-image", "appendTo");
    console.info("params", this.params);
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-bildetema-words-topic-image` to.",
      );
      return;
    }

    
    let words:Map<LanguageCode, Word[]> = new Map();

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-image");

    const topicsField = (H5PEditor as any).findField("../topics", this.parent);

    
    const imageField = (H5PEditor as any).findField("../themeImage", this.parent);
    
    const fetchImage = (field:any):Image|undefined => {
      if(field && field.params){
        return {...field.params, path: H5P.getPath(field.params.path, H5PEditor.contentId) };
      }
      return undefined;
    };

    let image = fetchImage(imageField);

    console.info("image", image);
    const root = createRoot(this.wrapper);
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const setValueForField = (params:Params):void => {
      console.info("setValueForField", params, " on ", this.field);
      this.setValue(this.field, params);
    };
    root.render(
      <SetValueContext.Provider value={setValueForField}>
        <App image={image} words={words}/>
      </SetValueContext.Provider>,
    );
    
    const fetchTopic = async (topicId:string, subTopicId:string|undefined):Promise<Map<LanguageCode, Word[]>> => {
      const topics = await getTopics();
      // const newTopics = (H5PEditor as any).findField("../topics", this.parent);
      const topic = topics.find(t => t.id === topicId);
      if(subTopicId){
        return topic?.subTopics.get(subTopicId)?.words ?? new Map<LanguageCode, Word[]>();
      }
      return topic?.words ?? new Map<LanguageCode, Word[]>();
    };
    
    imageField.changes.push(() => {
      image = fetchImage(imageField);
      
      root.render(
        <SetValueContext.Provider value={setValueForField}>
          <App image={image} words={words}/>
        </SetValueContext.Provider>,
      );
      
    });


    topicsField.on("change", (e:any) => {
      fetchTopic(e.data.topic, e.data.subTopic).then(newWords => {
        words = newWords;
        root.render(
          <SetValueContext.Provider value={setValueForField}>
            <App image={image} words={words}/>
          </SetValueContext.Provider>,
        );
      });
    });
  }

  validate(): boolean {
    return true;
  }

  remove(): void {
    this.wrapper.parentElement?.removeChild(this.wrapper);
  }
}
