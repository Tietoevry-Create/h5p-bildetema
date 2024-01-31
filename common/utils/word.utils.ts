import { LanguageCode } from "../types/LanguageCode";
import { Labels, SearchResult, Topic, TopicWord, Word, searchResultTranslations } from "../types/types";

export const toSingleLabel = (
  labels: Labels,
  includeArticle = false,
): string => {
  return labels
    .map(el =>
      el.article && includeArticle ? `${el.article} ${el.label}` : el.label,
    )
    .join(" / ");
};

export const extractWordLabel = (
  word: Word | TopicWord,
  includeArticle: boolean,
): string => {
  const isTopicWord = "label" in word;
  if (isTopicWord) {
    const articleInWord = "article" in word;
    return articleInWord && includeArticle
      ? `${word.article as string} ${word.label as string}`
      : (word.label as string);
  }
  if (!word.labels) {
    // Word has not been updated yet or is missing labels
    return "";
  }
  return toSingleLabel(word.labels, includeArticle);
};

export const wordsIncludesArticles = (words: Word[]): boolean => {
  return words.some(word => {
    const isTopicWord = "article" in word;
    if (isTopicWord) return !!(word.article as string);
    return word.labels?.some(el => el.article);
  });
};



const findTranslationsForWord = (
  word: Word,
  topic: Topic,
  languagesToFind: LanguageCode[],
): searchResultTranslations[] => {
  if (languagesToFind.length === 0) {
    return [];
  }
  const results: searchResultTranslations[] = [];
  languagesToFind.forEach(lc => {
    const translation = topic.words.get(lc)?.find(w => w.id === word.id);
    if (translation) {
      results.push({
        langCode: lc,
        audioFiles: translation.audioFiles,
        labels: translation.labels,
      });
    }
  });

  return results;
};


export const searchForWord = (
  s: string,
  langCode: LanguageCode,
  topicsFromDB?: Topic[],
  languagesToFind: LanguageCode[] = [],
): SearchResult[] => {
  const searchQuery = s.toLowerCase();
  const resWords = topicsFromDB
    ?.map(topic => {
      const topicWords = topic.words.get(langCode);
      if (topicWords?.length) {
        const p = topicWords
          .filter(w => {
            return w.labels.some(label => label.label.includes(searchQuery));
          })
          .map(w => {
            const searchResult: SearchResult = {
              id: w.id,
              images: w.images,
              translations: [
                {
                  langCode,
                  labels: w.labels,
                  audioFiles: w.audioFiles,
                },
                ...findTranslationsForWord(w, topic, languagesToFind),
              ],
              topicId: topic.id,
            };
            return searchResult;
          });
        return p;
      }
      return topic.subTopics
        .map(subTopic => {
          const subTopicWords = subTopic.words.get(langCode);
          if (subTopicWords?.length) {
            return subTopicWords
              .filter(w => {
                return w.labels.some(label => label.label.includes(searchQuery));
              })
              .map(w => {
                const searchResult: SearchResult = {
                  id: w.id,
                  images: w.images,
                  translations: [
                    {
                      langCode,
                      labels: w.labels,
                      audioFiles: w.audioFiles,
                    },
                    ...findTranslationsForWord(w, subTopic, languagesToFind),
                  ],
                  topicId: topic.id,
                  subTopicId: subTopic.id,
                };

                return searchResult;
              });
          }
          return [];
        })
        .flat();
    })
    .flat()
    .filter(Boolean);

  const resWordsWithoutDuplicates = [
    ...new Map(resWords?.map(w => [w.id, w])).values(),
  ];

  return resWordsWithoutDuplicates ?? [];
};