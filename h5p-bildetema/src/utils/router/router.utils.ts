import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, Topic, TopicIds } from "../../../../common/types/types";
import { labelToUrlComponent } from "../../../../common/utils/string.utils";
import { TopicsAndWords } from "../../types/TopicsAndWords";

export const getTopicSlug = (
  topic: Topic,
  languageCode: LanguageCode,
): string =>
  encodeURIComponent(
    topic.labelTranslations
      .get(languageCode)
      ?.label.toLowerCase()
      .split(" ")
      .join("-") ?? topic.id.toLowerCase(),
  );

export const findTopic = (
  topics: Topic[],
  language: Language,
  topicValue: string,
): Topic | undefined => {
  const langCode = language.code;
  return topics.find(el => {
    const word = el.labelTranslations.get(langCode);
    if (!word) {
      return false;
    }

    const { label, id } = word;
    if (label !== "") {
      return labelToUrlComponent(label) === labelToUrlComponent(topicValue);
    }

    return labelToUrlComponent(id) === topicValue;
  });
};

export const langIdToLanguage = (
  langCode: LanguageCode,
  languagesFromDB: Array<Language>,
): Language | undefined => {
  const language = languagesFromDB.find(el => el.code === langCode);

  return language;
};

export const validRoute = (
  topicsFromDB: Array<Topic> | undefined,
  languagesFromDB: Array<Language> | undefined,
  favLanguages: Array<Language>,
  setTopicIds: (topicIds: TopicIds) => void,
  langId: LanguageCode | undefined,
  topicLabel: string | undefined,
  subTopicId: string | undefined,
  addFavoriteLanguage: (language: Language, favorite: boolean) => void,
): TopicsAndWords => {
  if (!topicsFromDB || !langId) {
    return {loading:true};
  }

  if (!languagesFromDB) {
    setTopicIds({});
    return {loading:true};
  }

  const language = langIdToLanguage(langId, languagesFromDB);
  if (!language) {
    setTopicIds({});
    return {loading:false};
  }

  const languageIsAlreadyFavorited = favLanguages.find(
    el => language.code === el.code,
  );

  if (!languageIsAlreadyFavorited) {
    addFavoriteLanguage(language, true);
  }

  if (!topicLabel) {
    setTopicIds({});
    return { topics: topicsFromDB, language, loading: false };
  }

  const topic = findTopic(topicsFromDB, language, topicLabel);
  if (!topic) {
    setTopicIds({});
    return {loading: false};
  }

  const subTopics = Array.from(topic.subTopics.values());

  if (!subTopicId) {
    setTopicIds({ topicId: topic.id });

    if (subTopics.length) return { topics: subTopics, language, loading: false};
    return { words: topic.words.get(language.code), language, loading: false };
  }

  const subTopic = findTopic(subTopics, language, subTopicId);

  setTopicIds({ topicId: topic.id, subTopicId: subTopic?.id });
  return {
    words: subTopic?.words.get(language.code),
    language,
    currentTopic: { topicId: topic?.id, subTopicId: subTopic?.id },
    loading: false
  };
};
