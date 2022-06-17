import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import {
  ThemeImageContainer,
  ThemeImageContainerProps,
} from "./ThemeImageContainer";
import { ThemeImageTypes } from "../../types/ThemeImageTypes";

const baseWord = {
  id: "1",
  label: "Bildetema",
  images: [""],
  audio: "",
};

describe(ThemeImageContainer.name, () => {
  const template = ({
    theme,
    themeImageType,
    words,
  }: ThemeImageContainerProps): HTMLElement => {
    const { container } = render(
      <ThemeImageContainer
        theme={theme}
        themeImageType={themeImageType}
        words={words}
      />,
    );
    return container;
  };

  it("Should render nothing if type != vectorImageWithHotspots", () => {
    const container = template({
      theme: { ...baseWord },
      themeImageType: "nonVectorImageWithHotspots",
      words: [],
    });

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toEqual(0);
  });

  it("Should only render if type == vectorImageWithHotspots", () => {
    const container = template({
      theme: { ...baseWord },
      themeImageType: "vectorImageWithHotspots",
      words: [],
    });
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("div")?.children.length).toBeGreaterThan(0);
  });
});
