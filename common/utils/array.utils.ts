type Primitive = number | string;

/**
 * Finds the difference between two arrays of primitive types (number, string, boolean).
 * Returns a tuple with two arrays: the first array contains elements in arr1 that are not in arr2,
 * and the second array contains elements in arr2 that are not in arr1.
 *
 * @param arr1 - The first array of primitive types.
 * @param arr2 - The second array of primitive types.
 * @returns A tuple with two arrays:
 *   - The first array contains elements from arr1 that are not in arr2.
 *   - The second array contains elements from arr2 that are not in arr1.
 *
 * @example
 * // Example with numbers
 * const nums1 = [1, 2, 3];
 * const nums2 = [2, 4, 6];
 * console.log(findDifference(nums1, nums2)); // Output: [[1, 3], [4, 6]]
 * */
export const findDifference = <T extends Primitive>(
  arr1: T[],
  arr2: T[],
): [T[], T[]] => {
  const get = (set1: Set<T>, set2: Set<T>): T[] => {
    const a: T[] = [];
    for (const e of set1) {
      if (!set2.has(e)) {
        a.push(e);
      }
    }
    return a;
  };

  const set1 = new Set<T>(arr1);
  const set2 = new Set<T>(arr2);

  return [get(set1, set2), get(set2, set1)];
};
