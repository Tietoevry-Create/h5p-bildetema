import * as React from "react";
import { useQuery } from "react-query";
import { getTopics } from "../../common/utils/data.utils";
import { ThemeImageContainer } from "./components/ThemeImageContainer/ThemeImageContainer";
import { Topic, Word } from "../../common/types/types";
import { OverlayType } from "./types/OverlayType";

export type AppProps = {
  params: any;
  imagePath: string;
};

const App: React.FC<AppProps> = ({ params, imagePath }) => {
  console.info("App", params);
  const [topics, setTopics] = React.useState<Topic[] | undefined>([]);
  const [topic, setTopic] = React.useState<Topic | undefined>(undefined);
  const [overlays, setOverlays] = React.useState<Array<OverlayType>>([]);
  const [words, setWords] = React.useState<Array<Word>>([]);

  // const { isLoading: isLoadingTopics, data: topics } = useQuery(
  //   "topicsFromDB",
  //   getTopics,
  // );


  React.useEffect(() => {
    getTopics().then(fetchedTopics => { setTopics(fetchedTopics); });
  }, []);

  React.useEffect(() => {
    console.info("topics", topics);
    const rootTopic = topics?.find((t) => t.id === params["bildetema-words-topic-view"].topics.topic);
    const subTopic = rootTopic?.subTopics.get(params["bildetema-words-topic-view"].topics.subTopic);
    if(subTopic){
      setTopic(subTopic);
    } else {
      setTopic(rootTopic);
    }
  }, [topics]);

  React.useEffect(() => {
    const paramHotspots = params["bildetema-words-topic-view"].hotspots[0];
    console.info("paramHotspots", paramHotspots);
    const computedOverlays = paramHotspots
      .filter((hotspot:any) => hotspot && hotspot !== null && hotspot.points?.length > 0)
      .map((hotspot:any):OverlayType => {
        return {
          id: hotspot.id,
          wordId: hotspot.id,
          outline: `<polygon points="${hotspot.points?.map((point:any) => `${point.x},${point.y}`).join(" ")}" style="fill:lime;stroke:purple;stroke-width:1"/>`,
        };
      });
    console.info("computedOverlays", computedOverlays);
    setOverlays(computedOverlays);
    
    const computedWords = paramHotspots
      .filter((hotspot:any) => hotspot && hotspot.points?.length > 0)
      .map((hotspot:any):Word => hotspot.word);
    setWords(computedWords);
    console.info("computedWords", computedWords);
  }, [params]);

  return (<div>
    <ThemeImageContainer 
      topic={topic}
      themeImage={imagePath}
      themeImageType="nonVectorImageWithHotspots"
      themeOverlays={overlays}
      words={words}

    />
    
    <h1> {JSON.stringify(params)}</h1></div>);
};

export default App;
