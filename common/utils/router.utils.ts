import { CurrentTopics, Language, Topic, TopicIds } from "../types/types";
import { labelToUrlComponent } from "./string.utils";

export const getLanguagePath = (
  language: Language,
  { topicId, subTopicId }: TopicIds,
  search: string,
  topicsFromDB?: Topic[],
): string => {
  if (!topicId) return `/${language.code}${search}`;

  const topic = topicsFromDB?.find(el => el.id === topicId);
  const topicWord = topic?.labelTranslations.get(language.code);
  if (!topicWord) return `/${language.code}${search}`;

  const topicPath =
    topicWord.label !== ""
      ? labelToUrlComponent(topicWord.label)
      : labelToUrlComponent(topicWord.id);
  if (!subTopicId) return `/${language.code}/${topicPath}${search}`;

  const subTopicWord = topic?.subTopics
    .find(sTopic => sTopic.id === subTopicId)
    ?.labelTranslations.get(language.code);
  if (!subTopicWord) return `/${language.code}/${topicPath}${search}`;
  const subTopicPath =
    subTopicWord.label !== ""
      ? labelToUrlComponent(subTopicWord.label)
      : labelToUrlComponent(subTopicWord.id);
  return `/${language.code}/${topicPath}/${subTopicPath}${search}`;
};

export const getPath = ({
  language,
  search,
  currentTopics,
}: {
  currentTopics: CurrentTopics;
  language: Language;
  search: string;
}): string => {
  const { topic, subTopic } = currentTopics;
  const topicPathLabel = topic?.translations.get(language.code)?.labels.at(0)
    ?.label;
  if (!topicPathLabel) return `/${language.code}${search}`;
  const topicPath = labelToUrlComponent(topicPathLabel);
  const subTopicPathLabel = subTopic?.translations
    .get(language.code)
    ?.labels.at(0)?.label;
  if (!subTopicPathLabel) return `/${language.code}/${topicPath}${search}`;
  const subTopicPath = labelToUrlComponent(subTopicPathLabel);
  return `/${language.code}/${topicPath}/${subTopicPath}${search}`;
};

export const uriComponentToTopicPath = (uriComponent: string): string => {
  return labelToUrlComponent(decodeURIComponent(uriComponent));
};
