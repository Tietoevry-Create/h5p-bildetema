import { STATIC_PATH } from "../constants/paths";
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
  pathname,
}: {
  currentTopics: CurrentTopics;
  language: Language;
  search: string;
  pathname: string;
}): string => {
  if (
    pathname.includes(STATIC_PATH.COLLECTIONS) ||
    pathname.includes(STATIC_PATH.SEARCH)
  ) {
    // Regex replaces lang=currentLangCode with lang=langCode
    const query = search.replace(/lang=.*?(?=&|$)/g, `lang=${language.code}`);
    return pathname + query;
  }
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
