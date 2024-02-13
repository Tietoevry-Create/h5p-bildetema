import { Meta, StoryObj } from "@storybook/react";
import { SearchResultCard } from "./SearchResultCard";

export default {
  title: "Components/SearchResultCard",
  component: SearchResultCard,
} satisfies Meta<typeof SearchResultCard>;

type Story = StoryObj<typeof SearchResultCard>;

export const Default: Story = {
  args: {
    searchResult: {
      id: "V0002",
      images: [
        {
          src: "https://cdn-prod-bildetema.azureedge.net/images/large/V0002a.jpeg",
          srcSets: [
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/small/V0002a.jpeg",
              width: 200,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/medium/V0002a.jpeg",
              width: 350,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/large/V0002a.jpeg",
              width: 600,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/xlarge/V0002a.jpeg",
              width: 1000,
            },
          ],
        },
        {
          src: "https://cdn-prod-bildetema.azureedge.net/images/large/V0002b.jpeg",
          srcSets: [
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/small/V0002b.jpeg",
              width: 200,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/medium/V0002b.jpeg",
              width: 350,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/large/V0002b.jpeg",
              width: 600,
            },
            {
              src: "https://cdn-prod-bildetema.azureedge.net/images/xlarge/V0002b.jpeg",
              width: 1000,
            },
          ],
        },
      ],
      translations: [
        {
          langCode: "nob",
          labels: [
            {
              label: "mor / mamma",
              article: "en",
            },
          ],
          audioFiles: [
            {
              // "extension": "mp3",
              mimeType: "audio/mp3",
              url: "https://cdn-prod-bildetema.azureedge.net/audio/nob/V0002.mp3",
            },
          ],
        },
        {
          langCode: "nob",
          audioFiles: [
            {
              // "extension": "mp3",
              mimeType: "audio/mp3",
              url: "https://cdn-prod-bildetema.azureedge.net/audio/nob/V0002.mp3",
            },
          ],
          labels: [
            {
              label: "mor / mamma",
              article: "en",
            },
          ],
        },
      ],
      topicId: "T009",
      subTopicId: "T109",
      order: 0,
    },
  },
};

// export const SingleBreadcrumb: Story = {
//   args: {
//     SearchResultCard: [{ label: "Tema", path: "/tema" }],
//   },
// };

// export const EmptyBreadcrumb: Story = {
//   args: {
//     SearchResultCard: [],
//   },
// };

