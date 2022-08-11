import { H5PBehaviour, H5PField, H5PFieldType, H5PL10n } from "h5p-types";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Words",
    name: "words",
    type: H5PFieldType.List,
    entity: "Word",
    importance: "low",
    widget: "none",
    field: {
      label: "Item",
      name: "wordItems",
      importance: "low",
      type: H5PFieldType.Group,
      fields: [
        {
          label: "Word",
          name: "label",
          type: H5PFieldType.Text,
        },
        {
          label: "Images",
          name: "images",
          type: H5PFieldType.List,
          entity: "Image",
          field: {
            label: "Image URL",
            name: "imageUrl",
            type: H5PFieldType.Text,
          },
        },
        {
          label: "Audio URL",
          name: "audio",
          type: H5PFieldType.Text,
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
