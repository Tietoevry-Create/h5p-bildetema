import { render } from "@testing-library/react";
import { Word } from "common/types/types";
import { describe, expect, it } from "vitest";
import {
  TopicImageContainer,
  TopicImageContainerProps,
} from "./TopicImageContainer";

const baseWord: Word = {
  id: "1",
  label: "Bildetema",
  images: [{ src: "" }],
  audioFiles: [],
};

describe(TopicImageContainer.name, () => {
  const template = ({
    topicImageType,
    words,
  }: TopicImageContainerProps): HTMLElement => {
    const { container } = render(
      <TopicImageContainer
        aspectRatio={1}
        topicImageType={topicImageType}
        words={words}
        topicImage="test"
        topicOverlays={[]}
        showWrittenWords={false}
        showArticles={false}
      />,
    );
    return container;
  };

  it("should render an empty div if type != vectorImageWithHotspots or nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topicImage: "test",
      topicOverlays: [],
      topicImageType: "3dSceneWithHotspots",
      words: [{ ...baseWord }],
      showWrittenWords: true,
      showArticles: false,
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("should render if type == vectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topicImage: "test",
      topicOverlays: [],
      topicImageType: "vectorImageWithHotspots",
      words: [],
      showWrittenWords: true,
      showArticles: false,
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });

  it("should render if type == nonVectorImageWithHotspots", () => {
    const container = template({
      aspectRatio: 1,
      topicImage: "test",
      topicOverlays: [],
      topicImageType: "nonVectorImageWithHotspots",
      words: [],
      showWrittenWords: true,
      showArticles: false,
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
