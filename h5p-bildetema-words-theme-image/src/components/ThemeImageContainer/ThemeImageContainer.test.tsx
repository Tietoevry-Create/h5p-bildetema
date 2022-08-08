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
        aspectRatio={1}
        topic={topic}
        themeImageType={themeImageType}
        words={words}
        themeImage="test"
        themeOverlays={[]}
      />,
    );
    return container;
  };

  it("should render an empty div if type != vectorImageWithHotspots or nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topic: { ...baseTopic },
      themeImage: "test",
      themeOverlays: [],
      themeImageType: "3dSceneWithHotspots",
      words: [{ ...baseWord }],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("should render if type == vectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      themeImage: "test",
      themeOverlays: [],
      topic: { ...baseTopic },
      themeImageType: "vectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });

  it("should render if type == nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      themeImage: "test",
      themeOverlays: [],
      topic: { ...baseTopic },
      themeImageType: "nonVectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
