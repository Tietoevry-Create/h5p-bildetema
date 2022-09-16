// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Editor } from "./Editor";

export default {
  title: "Components/Editor",
  component: Editor,
  args: {
    initialHotspots: [],
  },
} as ComponentMeta<typeof Editor>;

const cdnURL = "https://cdn-prodbildetema.azureedge.net";

const portraitImage = {
  // path: "https://images.unsplash.com/photo-1537017206014-37e7e84d84c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  path: "https://images.unsplash.com/photo-1617051571090-85766fa13621?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  width: 1000,
  height: 1250,
};

const landscapeImage = {
  path: `${cdnURL}/images/xlarge/V0001a.jpeg`,
  width: 1000,
  height: 667,
};

const Template: ComponentStory<typeof Editor> = args => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Editor {...args} />
);

export const Portrait = Template.bind({});
Portrait.args = {
  image: portraitImage,
  words: [
    { audioFiles: [], label: "Mor", id: "V0002", images: [] },
    { audioFiles: [], label: "Far", id: "V0003", images: [] },
    { audioFiles: [], label: "Sønn", id: "V0005", images: [] },
  ],
  initialHotspots: [],
};

export const Landscape = Template.bind({});
Landscape.args = {
  image: landscapeImage,
  words: [
    { audioFiles: [], label: "Mor", id: "V0002", images: [] },
    { audioFiles: [], label: "Far", id: "V0003", images: [] },
    { audioFiles: [], label: "Sønn", id: "V0005", images: [] },
    { audioFiles: [], label: "Datter", id: "V0006", images: [] },
  ],
  initialHotspots: [],
};

export const WithInitialHotspots = Template.bind({});
WithInitialHotspots.args = {
  image: portraitImage,
  words: [
    { audioFiles: [], label: "Mor", id: "V0002", images: [] },
    { audioFiles: [], label: "Far", id: "V0003", images: [] },
    { audioFiles: [], label: "Sønn", id: "V0005", images: [] },
  ],
  initialHotspots: [
    {
      points: [
        {
          x: 18.439817864200005,
          y: 48.86943836615609,
        },
        {
          x: 18.439817864200005,
          y: 46.82713347921225,
        },
        {
          x: 18.25653655602967,
          y: 42.159008023340625,
        },
        {
          x: 18.073255247859333,
          y: 37.490882567469,
        },
        {
          x: 20.455912254073713,
          y: 32.23924142961342,
        },
        {
          x: 23.20513187662877,
          y: 28.30051057622174,
        },
        {
          x: 25.58778888284315,
          y: 25.237053245805978,
        },
        {
          x: 28.520289813568546,
          y: 22.902990517870165,
        },
        {
          x: 30.90294681978293,
          y: 20.568927789934357,
        },
        {
          x: 32.55247859331596,
          y: 17.797228300510575,
        },
        {
          x: 34.38529167501933,
          y: 15.75492341356674,
        },
        {
          x: 35.66826083221169,
          y: 14.15025528811087,
        },
        {
          x: 35.11841690770068,
          y: 12.25382932166302,
        },
        {
          x: 39.7004496119591,
          y: 10.50328227571116,
        },
        {
          x: 43.54935708353619,
          y: 9.919766593727207,
        },
        {
          x: 49.5976402531573,
          y: 9.482129832239242,
        },
        {
          x: 52.163578567542025,
          y: 10.35740335521517,
        },
        {
          x: 55.82920473094877,
          y: 11.670313639679067,
        },
        {
          x: 58.21186173716315,
          y: 14.15025528811087,
        },
        {
          x: 61.144362667888544,
          y: 16.046681254558717,
        },
        {
          x: 63.527019674102924,
          y: 17.505470459518598,
        },
        {
          x: 65.72639537214697,
          y: 18.526622902990518,
        },
        {
          x: 68.29233368653169,
          y: 19.985412107950403,
        },
        {
          x: 69.57530284372405,
          y: 22.902990517870165,
        },
        {
          x: 69.75858415189438,
          y: 26.549963530269878,
        },
        {
          x: 71.40811592542742,
          y: 29.321663019693656,
        },
        {
          x: 74.15733554798247,
          y: 31.655725747629464,
        },
        {
          x: 75.8068673215155,
          y: 34.13566739606127,
        },
        {
          x: 76.90655517053753,
          y: 36.90736688548505,
        },
        {
          x: 77.08983647870787,
          y: 39.82494529540481,
        },
        {
          x: 77.45639909504854,
          y: 42.4507658643326,
        },
        {
          x: 78.00624301955955,
          y: 45.51422319474836,
        },
        {
          x: 77.45639909504854,
          y: 48.28592268417214,
        },
        {
          x: 60.04467481886652,
          y: 49.161196207148066,
        },
        {
          x: 55.27936080643776,
          y: 44.78482859226842,
        },
        {
          x: 51.79701595120135,
          y: 42.59664478482859,
        },
        {
          x: 48.68123371230562,
          y: 41.42961342086068,
        },
        {
          x: 46.84842063060225,
          y: 39.82494529540481,
        },
        {
          x: 43.54935708353619,
          y: 42.159008023340625,
        },
        {
          x: 41.71654400183281,
          y: 44.49307075127644,
        },
        {
          x: 39.333886995618435,
          y: 46.53537563822028,
        },
        {
          x: 37.134511297574385,
          y: 48.28592268417214,
        },
        {
          x: 36.40138606489304,
          y: 49.74471188913202,
        },
      ].map((point, index) => ({ ...point, index })),
      isDrawingThisPolygon: false,
      word: {
        audioFiles: [],
        label: "Mor",
        id: "V0002",
        images: [],
      },
      rotation: 0,
    },
    {
      points: [],
      isDrawingThisPolygon: false,
      word: {
        audioFiles: [],
        label: "Far",
        id: "V0003",
        images: [],
      },
      rotation: 0,
    },
    {
      points: [],
      isDrawingThisPolygon: false,
      word: {
        audioFiles: [],
        label: "Sønn",
        id: "V0005",
        images: [],
      },
      rotation: 0,
    },
  ],
};
