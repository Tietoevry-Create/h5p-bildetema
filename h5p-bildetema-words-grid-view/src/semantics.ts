import { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
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
            label: "Image URL",
            name: "imageUrl",
            type: "text",
          },
        },
        {
          label: "Audio URL",
          name: "audio",
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
    fields: [
      // For this to work in Bildetema, the translations needs to be added in h5p-bildetema's semantics as well
      {
        label: "Play audio",
        name: "playAudio",
        default: "Play audio",
        type: "text",
      },
      {
        label: "Pause audio",
        name: "pauseAudio",
        default: "Pause audio",
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
    ],
  },
  {
    label: "Show written words",
    name: "showWrittenWords",
    type: "boolean",
    default: true,
    importance: "low",
  },
];
