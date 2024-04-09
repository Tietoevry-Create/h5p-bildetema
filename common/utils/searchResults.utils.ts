import { Labels, NewWord } from "common/types/types";
import { distance, closest } from "fastest-levenshtein";
import { LanguageCode } from "../types/LanguageCode";

const getLabelsArray = (labels: Labels): string[] => {
  return labels
    .map(el => el.label.split("/").map(l => l.trim().toLowerCase()))
    .flat();
};

const findLabelClosestToSearch = (search: string, labels: Labels): string => {
  const labelsArray = getLabelsArray(labels);
  return closest(search, labelsArray);
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
  const equalWithin = 1;
  const endsWith = 2;
  const startsWith = 3;
  const contains = 5;

  const lowerCaseSearch = search.toLowerCase();
  const labelsArray = getLabelsArray(labels);
  const labelsSplitBySpace = labelsArray.join(" ").split(" ");
  if (labelsArray.includes(lowerCaseSearch)) return equal;
  if (labelsSplitBySpace.includes(lowerCaseSearch)) return equalWithin;
  if (labelsSplitBySpace.filter(l => l.endsWith(lowerCaseSearch)).length > 0)
    return endsWith;
  if (labelsSplitBySpace.filter(l => l.startsWith(lowerCaseSearch)).length > 0)
    return startsWith;
  return contains;
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
