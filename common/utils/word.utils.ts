import { Labels, TopicWord, Word } from "../types/types";

export const toSingleLabel = (labels: Labels, includeArticle = false): string => {
  return labels
    .map(el =>
      el.article && includeArticle ? `${el.article} ${el.label}` : el.label,
    )
    .join(" / ");
}

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
