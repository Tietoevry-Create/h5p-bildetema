import { assert, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { TopicViewItem } from "./TopicViewItem";

describe(TopicViewItem.name, () => {
  it("should render", () => {
    const item = {
      id: "1",
      topicImage: {
        path: "https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
        alt: "",
      },
      label: "Sheep in the distance",
      description: "",
      widthPercentage: 50,
      heightPercentage: 25,
      xPercentagePosition: 3,
      yPercentagePosition: 5,
      dialog: {
        text: "Dialog text",
        hasNote: true,
        showAddLinks: false,
      },
    };

    const onClick = (): void => {
      console.info("Clicked");
    };

    const { container } = render(
      <TopicViewItem item={item} onClick={onClick} />,
    );

    expect(container.querySelector("button")).toBeTruthy();
  });
});
