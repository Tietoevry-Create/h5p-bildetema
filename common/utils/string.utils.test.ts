import { describe, expect, it } from "vitest";
import { labelToUrlComponent } from "./string.utils";

describe("labelToUrlComponent", () => {
  it("Should replace spaces with hyphens", () => {
    expect(labelToUrlComponent("string with spaces")).toBe(
      "string-with-spaces",
    );
  });
  it("Should replace capital letters with lowercase letters", () => {
    expect(labelToUrlComponent("String With Capital Letters")).toBe(
      "string-with-capital-letters",
    );
  });
  it("Should replace slash with %2F", () => {
    expect(labelToUrlComponent("something/something/else")).toBe(
      "something%2Fsomething%2Felse",
    );
  });
  it("Should return the same string if there are no special characters", () => {
    expect(labelToUrlComponent("return-this(string)")).toBe(
      "return-this(string)",
    );
  });
});
