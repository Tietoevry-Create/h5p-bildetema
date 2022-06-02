import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as React from "react";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

describe(Breadcrumbs.name, () => {
  const template = ({ breadcrumbs }: BreadcrumbsProps): HTMLElement => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs breadcrumbs={breadcrumbs} />,
      </MemoryRouter>,
    );
    return container;
  };

  it("No breadcrumbs should render nothing", () => {
    const container = template({ breadcrumbs: [] });

    expect(container.childElementCount).toEqual(0);
  });

  it("Single breadcrumb should render nothing", () => {
    const container = template({
      breadcrumbs: [{ label: "Tema", path: "/tema" }],
    });
    expect(container.childElementCount).toEqual(0);
  });

  it("Multiple breadcrumbs should render something", () => {
    const container = template({
      breadcrumbs: [
        { label: "Tema", path: "/tema" },
        { label: "Dyr", path: "/tema/dyr" },
      ],
    });
    expect(container.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
