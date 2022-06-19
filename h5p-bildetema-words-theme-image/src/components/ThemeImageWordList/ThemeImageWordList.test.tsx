import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  ThemeImageWordList,
  ThemeImageWordListProps,
} from "./ThemeImageWordList";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";

const baseWord = {
  id: "1",
  label: "Bildetema",
  images: [""],
  audio: "",
};

describe(ThemeImageWordList.name, () => {
  const template = ({ words }: ThemeImageWordListProps): HTMLElement => {
    const { container } = render(<ThemeImageWordList words={words} />);
    return container;
  };

  it("Should render nothing if wordList is Empty", () => {
    const container = template({
      words: [],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("Should one child when words hase one element", () => {
    const container = template({
      words: [{ ...baseWord }],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(1);
  });
});
