// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from "vitest";
import { Word } from "../../../../common/types/types";
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
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
