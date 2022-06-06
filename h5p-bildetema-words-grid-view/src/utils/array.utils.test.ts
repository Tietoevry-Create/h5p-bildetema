import { describe, it, expect } from "vitest";
import { findDuplicates } from "./array.utils";

describe("Array utils", () => {
  describe(findDuplicates.name, () => {
    it("should find all duplicates in a list of strings", () => {
      const array = ["1", "2", "2", "2", "3", "1"];

      const expected = ["2", "1"];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it("should find all duplicates in a list of numbers", () => {
      const array = [1, 2, 2, 3, 1];

      const expected = [2, 1];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it("should find all duplicates in a list of booleans", () => {
      const array = [true, true, false];

      const expected = [true];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });

    it("should find all duplicates in a mixed list", () => {
      const array = [true, true, 1, 1, 1];

      const expected = [true, 1];
      const actual = findDuplicates(array);

      expect(actual).toEqual(expected);
    });
  });
});
