import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Image",
    name: "topicImage",
    type: "image",
  },
  {
    label: "Selected topic",
    name: "selectedTopic",
    type: "group",
    widget: "chooseTopicWidget",
    fields: [
      {
        label: "Topic id",
        name: "topicId",
        type: "text",
      },
      {
        label: "Sub topic id",
        name: "subTopicId",
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
    widget: "bildetemaWordsTopicImage",
    field: {
      label: "Hotspot",
      name: "hotspot",
      type: "group",
      fields: [
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
          label: "Word",
          name: "word",
          type: "group",
          fields: [
            {
              label: "Id",
              name: "id",
              type: "text",
            },
            {
              label: "Label",
              name: "label",
              type: "text",
            },
            {
              label: "Images",
              name: "images",
              type: "list",
              entity: "Image",
              field: {
                label: "Image",
                name: "image",
                type: "group",
                fields: [
                  {
                    label: "Src",
                    name: "src",
                    type: "text",
                  },
                  {
                    label: "Src sets",
                    name: "srcSets",
                    type: "list",
                    entity: "Src set",
                    field: {
                      label: "Src set",
                      name: "srcSet",
                      type: "group",
                      fields: [
                        {
                          label: "Src",
                          name: "src",
                          type: "text",
                        },
                        {
                          label: "Width",
                          name: "width",
                          type: "number",
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
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