// sortingUtils.ts
import { Option } from "common/types/types";

/**
 * Sorts options based on their selection status.
 *
 * @param options The list of options to sort.
 * @param selectedIds The list of currently selected option IDs.
 * @returns A sorted list of options, with selected options appearing first.
 */
export const sortBySelectionStatus = (
  options: Option[],
  selectedIds: string[],
): Option[] => {
  return options.sort((a, b) => {
    const isSelectedA = selectedIds.includes(a.id);
    const isSelectedB = selectedIds.includes(b.id);

    if (isSelectedA && !isSelectedB) return -1;
    if (!isSelectedA && isSelectedB) return 1;
    return 0;
  });
};
