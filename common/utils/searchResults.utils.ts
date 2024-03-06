import { Labels, NewWord, SearchResult } from "common/types/types";
import { distance, closest } from "fastest-levenshtein";
import { LanguageCode } from "../types/LanguageCode";

const getLabelsArray = (labels: Labels): string[] => {
  return labels.map(el => el.label.split("/").map(l => l.trim())).flat();
};

const findLabelClosestToSearch = (search: string, labels: Labels): string => {
  const labelsArray = getLabelsArray(labels);
  return closest(search, labelsArray);
};

export const sortSearchBylevenshtein = (
  search: string,
  results: SearchResult[],
): SearchResult[] => {
  return results.toSorted((a, b) => {
    const closestA = findLabelClosestToSearch(search, a.translations[0].labels);
    const closestB = findLabelClosestToSearch(search, b.translations[0].labels);
    return distance(search, closestA) - distance(search, closestB);
  });
};

export const sortNewWordsBylevenshtein = (
  search: string,
  results: NewWord[],
  langCode: LanguageCode,
): NewWord[] => {
  return results.toSorted((a, b) => {
    const aLabels = a.translations.get(langCode)?.labels || [];
    const bLabels = b.translations.get(langCode)?.labels || [];
    const closestA = findLabelClosestToSearch(search, aLabels);
    const closestB = findLabelClosestToSearch(search, bLabels);
    return distance(search, closestA) - distance(search, closestB);
  });
};

export const sortSearchByTopic = (results: NewWord[]): NewWord[] => {
  return results.toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

const getSearchPositionValue = (search: string, labels: Labels): number => {
  const equal = 0;
  const endsWith = 1;
  const startsWith = 3;
  const contains = 5;

  const labelsArray = getLabelsArray(labels);
  if (labelsArray.includes(search)) return equal;
  if (labelsArray.filter(l => l.endsWith(search)).length > 0) return endsWith;
  if (labelsArray.filter(l => l.startsWith(search)).length > 0)
    return startsWith;
  return contains;
};

export const sortSearchByPosition = (
  search: string,
  results: SearchResult[],
): SearchResult[] => {
  // const res = sortSearchByTopic(results);
  return results.toSorted((a, b) => {
    return (
      getSearchPositionValue(search, a.translations[0].labels) -
      getSearchPositionValue(search, b.translations[0].labels)
    );
  });
};

export const sortNewWordsByPosition = (
  search: string,
  results: NewWord[],
  langCode: LanguageCode,
): NewWord[] => {
  const res = sortSearchByTopic(results);
  return res.toSorted((a, b) => {
    const aLabels = a.translations.get(langCode)?.labels || [];
    const bLabels = b.translations.get(langCode)?.labels || [];
    return (
      getSearchPositionValue(search, aLabels) -
      getSearchPositionValue(search, bLabels)
    );
  });
};
