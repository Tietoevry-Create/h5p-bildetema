import { H5PBehaviour, H5PField, H5PL10n, ReadonlyDeep } from "h5p-types";

export const semantics = [
  {
    label: "Words",
    name: "words",
    type: "list",
    entity: "Word",
    importance: "low",
    widget: "none",
    field: {
      label: "Item",
      name: "wordItems",
      importance: "low",
      type: "group",
      fields: [
        {
          label: "Id",
          name: "id",
          type: "text",
        },
        {
          label: "Word",
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
                optional: true,
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
        {
          label: "Audio files",
          name: "audioFiles",
          type: "list",
          entity: "Audio file",
          field: {
            label: "Audio file",
            name: "audioFile",
            type: "group",
            fields: [
              {
                label: "Mime type",
                name: "mimeType",
                type: "select",
                default: "audio/webm",
                options: [
                  {
                    label: "WebM",
                    value: "audio/webm",
                  },
                  {
                    label: "MP3",
                    value: "audio/mp3",
                  },
                  {
                    label: "WAV",
                    value: "audio/x-wav",
                  },
                ],
              },
              {
                label: "Url",
                name: "url",
                type: "text",
              },
            ],
          },
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
        label: "Previous image label",
        name: "prevImageLabel",
        default: "Previous image",
        type: "text",
      },
      {
        label: "Next image label",
        name: "nextImageLabel",
        default: "Next image",
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
