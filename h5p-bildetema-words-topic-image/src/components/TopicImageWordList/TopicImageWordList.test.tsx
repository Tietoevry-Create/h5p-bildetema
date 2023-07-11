import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  TopicImageWordList,
  TopicImageWordListProps,
} from "./TopicImageWordList";

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
});
