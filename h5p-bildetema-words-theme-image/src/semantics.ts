import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Bildetema Words Topic View",
    name: "bildetema-words-topic-view",
    type: "group",
    importance: "high",
    fields: [
      {
        label: "Image",
        name: "topicImage",
        type: "image",
      },
      {
        label: "Topic",
        name: "selectedTopic",
        type: "group",
        widget: "chooseTopicWidget",
        fields: [
          {
            label: "Topic",
            name: "topic",
            type: "text",
          },
          {
            label: "SubTopic",
            name: "subTopic",
            type: "text",
            optional: true,
          },
        ],
      },
      {
        label: "Hotspots",
        name: "hotspots",
        type: "list",
        entity: "Hotspot",
        field: {
          label: "Hotspot",
          name: "hotspot",
          type: "group",
          widget: "bildetemaWordsTopicImage",
          fields: [
            {
              name: "id",
              label: "Id",
              type: "text",
              // widget: "uuid",
            },
            {
              label: "Points",
              name: "points",
              type: "list",
              entity: "Point",
              field: {
                label: "Point",
                name: "point",
                type: "group",
                fields: [
                  {
                    label: "X",
                    name: "x",
                    type: "number",
                  },
                  {
                    label: "Y",
                    name: "y",
                    type: "number",
                  },
                ],
              },
            },
            {
              label: "Word id",
              name: "wordId",
              type: "text",
            },
          ],
        },
      },
    ],
  },
  {
    name: "behaviour",
    type: "group",
    label: "Behavioral settings",
    importance: "low",
    fields: [],
  },
  {
    name: "l10n",
    type: "group",
    common: true,
    label: "Localize",
    fields: [],
  },
];
