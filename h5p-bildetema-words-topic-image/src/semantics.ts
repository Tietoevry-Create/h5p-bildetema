import type {
  H5PBehaviour,
  H5PField,
  H5PFieldSelect,
  H5PL10n,
  ReadonlyDeep,
} from "h5p-types";
import { languageOptions } from "../../common/constants/languages";

export const semantics = [
  {
    label: "Image",
    name: "topicImage",
    type: "image",
  },
  {
    label: "Backend Url",
    name: "backendUrl",
    default: "https://cdn-prodbildetema.azureedge.net/data/database.json",
    description: "The Url to the json database",
    type: "text",
  },
  {
    label: "Current language",
    name: "currentLanguage",
    type: "select",
    widget: "none",
    optional: true,
    options: languageOptions,
    default: "eng",
  } satisfies H5PFieldSelect,
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
              {
                label: "Index",
                name: "index",
                type: "number",
              },
            ],
          },
        },
        {
          label: "Ellipse radius",
          name: "ellipseRadius",
          type: "number",
        },
        {
          label: "Rotation",
          name: "rotation",
          type: "number",
        },
        {
          label: "Color",
          name: "color",
          type: "select",
          default: "burgundy",
          options: [
            {
              label: "Burgundy",
              value: "burgundy",
            },
            {
              label: "Blue magenta",
              value: "blueMagenta",
            },
            {
              label: "Orange",
              value: "orange",
            },
            {
              label: "Black transparent",
              value: "blackTransparent",
            },
            {
              label: "White",
              value: "white",
            },
          ],
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
    fields: [
      // For this to work in Bildetema, the translations needs to be added in h5p-bildetema's semantics as well
      {
        label: "No topic selected",
        name: "noTopicSelected",
        default: "No topic selected.",
        type: "text",
      },
      {
        label: "Play audio",
        name: "playAudio",
        default: "Play audio",
        type: "text",
      },
      {
        label: "Stop audio",
        name: "stopAudio",
        default: "Stop audio",
        type: "text",
      },
      {
        label: "Language code",
        name: "htmlLanguageCode",
        description:
          "Two character language code, used for setting language in code (English: en, Norwegian Bokmål: nb)",
        default: "en",
        type: "text",
      },
    ],
  },
  {
    label: "Show written words",
    name: "showWrittenWords",
    type: "boolean",
    default: true,
    importance: "low",
  },
  {
    label: "Show articles",
    name: "showArticles",
    type: "boolean",
    default: false,
    importance: "low",
  },
] as const satisfies ReadonlyDeep<Array<H5PField | H5PBehaviour | H5PL10n>>;
