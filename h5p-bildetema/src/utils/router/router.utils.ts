import { LanguageCode } from "../../../../common/types/LanguageCode";
import { Language, Topic, TopicIds } from "../../../../common/types/types";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";
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
  languageId: string,
  languagesFromDB: Array<Language>,
): Language | undefined => {
  const langCode = makeLanguageCode(languageId);
  const language = languagesFromDB.find(el => el.code === langCode);

  return language;
};

export const validRoute = (
  topicsFromDB: Array<Topic> | undefined,
  languagesFromDB: Array<Language> | undefined,
  favLanguages: Array<Language>,
  setTopicIds: (topicIds: TopicIds) => void,
  langId: string | undefined,
  topicLabel: string | undefined,
  subTopicId: string | undefined,
  addFavoriteLanguage: (language: Language, favorite: boolean) => void,
): TopicsAndWords => {
  if (!topicsFromDB || !langId) {
    return {};
  }

  if (!languagesFromDB) {
    setTopicIds({});
    return {};
  }

  const language = langIdToLanguage(langId, languagesFromDB);
  if (!language) {
    setTopicIds({});
    return {};
  }

  const languageIsAlreadyFavorited = favLanguages.find(
    el => language.code === el.code,
  );

  if (!languageIsAlreadyFavorited) {
    addFavoriteLanguage(language, true);
  }

  if (!topicLabel) {
    setTopicIds({});
    return { topics: topicsFromDB, language };
  }

  const topic = findTopic(topicsFromDB, language, topicLabel);
  if (!topic) {
    setTopicIds({});
    return {};
  }

  const subTopics = Array.from(topic.subTopics.values());

  if (!subTopicId) {
    setTopicIds({ topicId: topic.id });

    if (subTopics.length) return { topics: subTopics, language };
    return { words: topic.words.get(language.code), language };
  }

  const subTopic = findTopic(subTopics, language, subTopicId);

  setTopicIds({ topicId: topic.id, subTopicId: subTopic?.id });
  return {
    words: subTopic?.words.get(language.code),
    language,
    currentTopic: { topicId: topic?.id, subTopicId: subTopic?.id },
  };
};
