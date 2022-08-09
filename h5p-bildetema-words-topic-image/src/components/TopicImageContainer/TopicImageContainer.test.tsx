import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  TopicImageContainer,
  TopicImageContainerProps,
} from "./TopicImageContainer";
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

describe(TopicImageContainer.name, () => {
  const template = ({
    topic,
    topicImageType,
    words,
  }: TopicImageContainerProps): HTMLElement => {
    const { container } = render(
      <TopicImageContainer
        aspectRatio={1}
        topic={topic}
        topicImageType={topicImageType}
        words={words}
        topicImage="test"
        topicOverlays={[]}
      />,
    );
    return container;
  };

  it("should render an empty div if type != vectorImageWithHotspots or nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topic: { ...baseTopic },
      topicImage: "test",
      topicOverlays: [],
      topicImageType: "3dSceneWithHotspots",
      words: [{ ...baseWord }],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("should render if type == vectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topicImage: "test",
      topicOverlays: [],
      topic: { ...baseTopic },
      topicImageType: "vectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });

  it("should render if type == nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topicImage: "test",
      topicOverlays: [],
      topic: { ...baseTopic },
      topicImageType: "nonVectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
