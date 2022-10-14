import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import * as React from "react";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

describe(Breadcrumbs.name, () => {
  const template = ({
    breadCrumbs,
    currentLanguageCode,
  }: BreadcrumbsProps): HTMLElement => {
    const { container } = render(
      <HashRouter>
        <Breadcrumbs
          breadCrumbs={breadCrumbs}
          currentLanguageCode={currentLanguageCode}
          rtl={false}
        />
        ,
      </HashRouter>,
    );
    return container;
  };

  it("Should render nothing if there are no links", () => {
    const container = template({
      breadCrumbs: [],
      currentLanguageCode: "nob",
      rtl: false,
    });

    expect(container.textContent).toEqual(",");
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("a")).toBeFalsy();
    expect(container.querySelector("span")).toBeFalsy();
  });

  it("Should only render a h1 if there are only one link", () => {
    const container = template({
      breadCrumbs: [{ label: "Tema", path: "/tema" }],
      currentLanguageCode: "nob",
      rtl: false,
    });
    expect(container.textContent).toEqual("Tema,");
    expect(container.querySelector("h1")).toBeTruthy();
    expect(container.querySelector("a")).toBeFalsy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("should render breadcrumbs if there are multiple links", () => {
    const container = template({
      breadCrumbs: [
        { label: "Tema", path: "/tema" },
        { label: "Dyr", path: "/tema/dyr" },
      ],
      currentLanguageCode: "nob",
      rtl: false,
    });
    expect(container.textContent).toContain("Dyr,");
    expect(container.querySelector("span")).toBeTruthy();
    expect(container.querySelector("a")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
