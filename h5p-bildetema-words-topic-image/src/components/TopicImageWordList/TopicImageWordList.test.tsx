import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  TopicImageWordList,
  TopicImageWordListProps,
} from "./TopicImageWordList";

const baseWord = {
  id: "1",
  label: "Bildetema",
  images: [{ src: "" }],
  audio: "",
};

describe(TopicImageWordList.name, () => {
  const template = ({
    words,
    currentWordId,
  }: TopicImageWordListProps): HTMLElement => {
    const { container } = render(
      <TopicImageWordList words={words} currentWordId={currentWordId} />,
    );
    return container;
  };

  it("Should render nothing if wordList is Empty", () => {
    const container = template({
      currentWordId: undefined,
      words: [],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("Should one child when words hase one element", () => {
    const container = template({
      currentWordId: undefined,
      words: [{ ...baseWord }],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(1);
  });
});
