import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  ThemeImageContainer,
  ThemeImageContainerProps,
} from "./ThemeImageContainer";
import { Topic, Word } from "../../../../common/types/types";
import { LanguageCode } from "../../../../common/types/LanguageCode";
import { makeLanguageCode } from "../../../../common/utils/LanguageCode.utils";

const baseTopic: Topic = {
  id: "id",
  images: [],
  label: "Label",
  labelTranslations: new Map<LanguageCode, Word>([
    [makeLanguageCode("nno"), { id: "id", images: [], label: "Label" }],
  ]),
  subTopics: new Map(),
  words: new Map(),
};

const baseWord: Word = {
  id: "1",
  label: "Bildetema",
  images: [{ src: "" }],
  audio: "",
};

describe(ThemeImageContainer.name, () => {
  const template = ({
    topic,
    themeImageType,
    words,
  }: ThemeImageContainerProps): HTMLElement => {
    const { container } = render(
      <ThemeImageContainer
        topic={topic}
        themeImageType={themeImageType}
        words={words}
        themeImage="test"
        themeOverlays={[]}
      />,
    );
    return container;
  };

  it("Should render nothing if type != vectorImageWithHotspots", () => {
    const container = template({
      topic: { ...baseTopic },
      themeImage: "test",
      themeOverlays: [],
      themeImageType: "nonVectorImageWithHotspots",
      words: [{ ...baseWord }],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("Should only render if type == vectorImageWithHotspots", () => {
    const container = template({
      themeImage: "test",
      themeOverlays: [],
      topic: { ...baseTopic },
      themeImageType: "vectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
