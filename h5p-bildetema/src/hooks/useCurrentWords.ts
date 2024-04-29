import { useNewDBContext } from "common/hooks/useNewDBContext";
import { CurrentTopics, NewWord } from "common/types/types";
import { getMainTopics, getNewWordsFromId } from "common/utils/data.utils";
import { uriComponentToTopicPath } from "common/utils/router.utils";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelectedNewWords } from "./useSelectedWords";

export const useCurrentWords = (): NewWord[] => {
  const { topicPaths, idToWords, idToContent } = useNewDBContext();
  const selectedWords = useSelectedNewWords();

  const { pathname } = useLocation();

  const currTopics = useMemo((): CurrentTopics => {
    const [topicUriComponent, subTopicUriComponent] = pathname
      .split("/")
      .slice(2);

    const topicId =
      topicPaths?.get(uriComponentToTopicPath(topicUriComponent)) || "";
    const topic = idToWords?.get(topicId);

    const subTopicId =
      topicPaths?.get(uriComponentToTopicPath(subTopicUriComponent)) || "";
    const subTopic = idToWords?.get(subTopicId);
    return { topic, subTopic };
  }, [idToWords, pathname, topicPaths]);

  if (selectedWords && selectedWords.length > 0) {
    return selectedWords;
  }
  if (currTopics.subTopic?.id) {
    return getNewWordsFromId(currTopics.subTopic?.id, idToWords, idToContent);
  }
  if (currTopics.topic?.id) {
    return getNewWordsFromId(currTopics.topic?.id, idToWords, idToContent);
  }

  return getMainTopics(idToWords, idToContent);
};
