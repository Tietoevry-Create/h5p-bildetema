import { Labels, SearchResult } from "common/types/types";
import { distance, closest } from "fastest-levenshtein";

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

export const sortSearchByTopic = (results: SearchResult[]): SearchResult[] => {
  return results.toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

const getPositionValue = (search: string, labels: Labels): number => {
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
  const res = sortSearchByTopic(results);
  return res.toSorted((a, b) => {
    return (
      getPositionValue(search, a.translations[0].labels) -
      getPositionValue(search, b.translations[0].labels)
    );
  });
};
