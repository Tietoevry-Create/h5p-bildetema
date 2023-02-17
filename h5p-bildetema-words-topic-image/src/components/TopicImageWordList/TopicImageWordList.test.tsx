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
  audio: "https://cdn-prodbildetema.azureedge.net/audio/nob/V0888.wav",
};

describe(TopicImageWordList.name, () => {
  const template = ({
    words,
    currentWordId,
    hoveredSVG,
  }: TopicImageWordListProps): HTMLElement => {
    const { container } = render(
      <TopicImageWordList
        words={words}
        currentWordId={currentWordId}
        selectHoveredWord={() => ""}
        selectWord={() => ""}
        hoveredSVG={hoveredSVG}
        showWrittenWords={false}
        showArticles={false}
      />,
    );
    return container;
  };

  it("Should render nothing if wordList is Empty", () => {
    const container = template({
      currentWordId: undefined,
      words: [],
      selectHoveredWord: () => "",
      selectWord: () => "",
      hoveredSVG: undefined,
      showWrittenWords: true,
      showArticles: false,
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("Should one child when words hase one element", () => {
    const container = template({
      currentWordId: undefined,
      words: [{ ...baseWord }],
      selectHoveredWord: () => "",
      selectWord: () => "",
      hoveredSVG: undefined,
      showWrittenWords: true,
      showArticles: false,
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(1);
  });
});
