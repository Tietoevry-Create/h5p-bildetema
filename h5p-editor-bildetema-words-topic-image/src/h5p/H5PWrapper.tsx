import type { H5PFieldGroup, IH5PWidget, Image } from "h5p-types";
import { H5P, H5PEditor, H5PWidget } from "h5p-utils";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../App";
import { SetValueContext } from "../contexts/SetValueContext";
import { getTopics } from "../../../common/utils/data.utils";
import { LanguageCode } from "../../../common/types/LanguageCode";
import { Word } from "../../../common/types/types";

type Field = H5PFieldGroup;
export type Params = {
  image: Image;
};

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

    let image = this.params?.image;
    let words:Map<LanguageCode, Word[]> = new Map();

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-bildetema-words-topic-image");

    console.info("this", this);
    
    const topicsField = (H5PEditor as any).findField("../topics", this.parent);
    console.info("topicsField", topicsField);

    const topicField = (H5PEditor as any).findField("topic", topicsField);
    console.info("topicField", topicField);

    
    const imageField = (H5PEditor as any).findField("../themeImage", this.parent);
    
    if(!image){
      console.info("imageField", imageField);
      

      if(imageField && imageField.params){
        image = {...imageField.params, path: H5P.getPath(imageField.params.path, H5PEditor.contentId) };
      }
    }
    console.info("image", image);
    const root = createRoot(this.wrapper);
    root.render(
      <SetValueContext.Provider value={this.setValue}>
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
      if(imageField.params){
        image = {...imageField.params, path: H5P.getPath(imageField.params.path, H5PEditor.contentId) };
      }
      
      
      root.render(
        <SetValueContext.Provider value={this.setValue}>
          <App image={image} words={words}/>
        </SetValueContext.Provider>,
      );
      
    });


    topicsField.on("change", (e:any) => {
      console.info("topicField change event", (H5PEditor as any).findField("../topics", this.parent));
      const newTopics = (H5PEditor as any).findField("../topics", this.parent);
      console.info("event", e);
      console.info("topic Field", (H5PEditor as any).findField("topic", topicsField));
      console.info("../topic Field", (H5PEditor as any).findField("../topic", topicsField));

      console.info("../topics.topic Field", (H5PEditor as any).findField("../topics.topic", this.parent));
      // const topic = topicField.getValue();
      console.info("topic changed to");
      if(newTopics.params){
        console.info("topicsField.params", topicsField.params);
      }

      fetchTopic(e.data.topic, e.data.subTopic).then(newWords => {
        words = newWords;
        root.render(
          <SetValueContext.Provider value={this.setValue}>
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
