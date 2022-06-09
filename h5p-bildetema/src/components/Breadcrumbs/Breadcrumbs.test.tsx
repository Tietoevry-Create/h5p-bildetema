import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as React from "react";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

describe(Breadcrumbs.name, () => {
  const template = ({ breadcrumbsTest }: BreadcrumbsProps): HTMLElement => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs breadcrumbsTest={breadcrumbsTest} />,
      </MemoryRouter>,
    );
    return container;
  };

  it("Should render nothing if there are no links", () => {
    const container = template({ breadcrumbsTest: [] });

    expect(container.textContent).toEqual(",");
    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("a")).toBeFalsy();
    expect(container.querySelector("span")).toBeFalsy();
  });

  it("Should only render a span if there are only one link", () => {
    const container = template({
      breadcrumbsTest: [{ label: "Tema", path: "/tema" }],
    });
    expect(container.textContent).toEqual("Tema,");
    expect(container.querySelector("span")).toBeTruthy();
    expect(container.querySelector("a")).toBeFalsy();
    expect(container.querySelector("svg")).toBeFalsy();
  });

  it("should render breadcrumbs if there are multiple links", () => {
    const container = template({
      breadcrumbsTest: [
        { label: "Tema", path: "/tema" },
        { label: "Dyr", path: "/tema/dyr" },
      ],
    });
    expect(container.textContent).toEqual("TemaDyr,");
    expect(container.querySelector("span")).toBeTruthy();
    expect(container.querySelector("a")).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
