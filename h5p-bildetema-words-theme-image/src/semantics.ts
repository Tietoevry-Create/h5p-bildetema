import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Image",
    name: "topicImage",
    type: "image",
  },
  {
    label: "Hotspots",
    name: "hotspots",
    type: "list",
    entity: "Hotspot",
    widget: "none",
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
          label: "Word id",
          name: "wordId",
          type: "text",
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
