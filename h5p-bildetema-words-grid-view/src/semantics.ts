import type { H5PBehaviour, H5PField, H5PL10n } from "h5p-types";
import { H5PFieldType } from "../../common/types/H5PFieldType";

export const semantics: Readonly<Array<H5PField | H5PBehaviour | H5PL10n>> = [
  {
    label: "Bildetema Words Grid View Words",
    name: "bildetema-words-grid-view-words",
    type: H5PFieldType.Group,
    importance: "high",
    fields: [
      {
        label: "Words",
        name: "words",
        type: H5PFieldType.List,
        entity: "Word",
        importance: "low",
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
    ],
  },
  {
    name: "behaviour",
    type: H5PFieldType.Group,
    label: "Behavioral settings",
    importance: "low",
    fields: [],
  },
  {
    name: "l10n",
    type: H5PFieldType.Group,
    common: true,
    label: "Localize",
    fields: [
      {
        label: "Play audio",
        name: "playAudio",
        default: "Play audio",
        type: H5PFieldType.Text,
      },
      {
        label: "Pause audio",
        name: "pauseAudio",
        default: "Pause audio",
        type: H5PFieldType.Text,
      },
    ],
  },
  {
    label: "Show written words",
    name: "bildetema-words-grid-view-show",
    type: H5PFieldType.Boolean,
    default: true,
    importance: "low",
  },
];
