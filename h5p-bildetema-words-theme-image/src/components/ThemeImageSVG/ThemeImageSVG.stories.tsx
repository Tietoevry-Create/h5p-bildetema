/* eslint-disable import/no-extraneous-dependencies */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ThemeImageSVG } from "./ThemeImageSVG";

const cat = `<?xml version="1.0"?>
<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:svg="http://www.w3.org/2000/svg" id="svg2" viewBox="0 0 400 380" version="1.0">
  <path id="path1891" fill-rule="evenodd" d="m151.35 307.2h113c0-16.06-1.15-19.25-27.75-19.25 4.25-12.75 21.52-43.59 31.12-43.59 8.5 0 18.63 0.47 18.63 19.84 0 22 37.02 57.48 46 43 13.38-21.56-23-14.98-23-67 0-71.15 41.52-61.02 41.52-101 0-20-5.52-22.7-5.52-37 0-18.893 16.65-17.796 13.41-33.465-2.24-10.823-3.99-19.503-5.29-32.591-0.93-9.287-1.23-19.185-10.87-18.787-11.33 0.468-15.63 20.417-33.25 21.848-17.58 1.427-32.57-14.967-39.38-12.625-6.74 2.321-4.62 20.625-0.62 33.625 6.29 20.432 20 46.995-5 50.995s-68 8-99 49-29.86 89.12-42 104c-40.759 49.96-82.526 29.45-82.526 71 0 18.61 31.525 32 36.525 26s-42.485-23.87 10.646-45c45.395-18.04 49.445-21.72 63.355-9z"/>
  <metadata>
    <rdf:RDF>
      <cc:Work>
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/"/>
        <dc:publisher>
          <cc:Agent rdf:about="http://openclipart.org/">
            <dc:title>Openclipart</dc:title>
          </cc:Agent>
        </dc:publisher>
        <dc:title>Cat silhouette</dc:title>
        <dc:date>2006-11-03T05:40:34</dc:date>
        <dc:description>Silhouette of a cat.&#xD;\n&#xD;\nFrom http://commons.wikimedia.org/wiki/Image:Cat_silhouette.svg</dc:description>
        <dc:source>http://openclipart.org/detail/1198/cat-silhouette-by-liftarn</dc:source>
        <dc:creator>
          <cc:Agent>
            <dc:title>liftarn</dc:title>
          </cc:Agent>
        </dc:creator>
        <dc:subject>
          <rdf:Bag>
            <rdf:li>animal</rdf:li>
            <rdf:li>cat</rdf:li>
            <rdf:li>clip art</rdf:li>
            <rdf:li>clipart</rdf:li>
            <rdf:li>externalsource</rdf:li>
            <rdf:li>image</rdf:li>
            <rdf:li>media</rdf:li>
            <rdf:li>png</rdf:li>
            <rdf:li>public domain</rdf:li>
            <rdf:li>silhouette</rdf:li>
            <rdf:li>svg</rdf:li>
            <rdf:li>wikimedia commons</rdf:li>
          </rdf:Bag>
        </dc:subject>
      </cc:Work>
      <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/">
        <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
        <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
      </cc:License>
    </rdf:RDF>
  </metadata>
</svg>`;

export default {
  label: "Molecules/ToppicGrid",
  component: ThemeImageSVG,
} as ComponentMeta<typeof ThemeImageSVG>;

const Template: ComponentStory<typeof ThemeImageSVG> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemeImageSVG {...args} />
);

export const SvgComponent = Template.bind({});
SvgComponent.args = {
  words: [
    {
      id: "1",
      label: "Øre",
      images: [""],
      audio: "",
    },
    {
      id: "2",
      label: "Pote",
      images: [""],
      audio: "",
    },
  ],
  image: cat,
  overlays: [
    {
      id: "1",
      wordId: "ID000ØRE",
      outline:
        '<rect width="10%" height="10%" x="65%" y="5%" style="fill:none;stroke:red;stroke-width:3;stroke:red;"></rect>',
    },
    {
      id: "2",
      wordId: "ID000POTE",
      outline:
        '<rect width="10%" height="10%" style="fill:none;stroke:red;stroke-width:3;stroke:red;" y="72%" x="75%"></rect>',
    },
  ],
};
