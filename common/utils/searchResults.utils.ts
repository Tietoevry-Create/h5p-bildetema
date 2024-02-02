import { Labels, SearchResult } from "common/types/types";
import { distance, closest } from "fastest-levenshtein";

const findLabelClosestToSearch = (search: string, labels: Labels): string => {
  const labelsArray = labels
    .map(el => el.label.split("/").map(l => l.trim()))
    .flat();
  return closest(search, labelsArray);
};

export const orderSearchBylevenshtein = (
  search: string,
  results: SearchResult[],
): SearchResult[] => {
  return results.toSorted((a, b) => {
    const closestA = findLabelClosestToSearch(search, a.translations[0].labels);
    const closestB = findLabelClosestToSearch(search, b.translations[0].labels);
    return distance(search, closestA) - distance(search, closestB);
  });
};
