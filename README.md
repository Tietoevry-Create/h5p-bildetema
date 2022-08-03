# H5P Content Types for Bildetema

Bildetema is composed of the following H5P content types.

| Content Type                  | Description                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| h5p-bildetema                 | The overall content type contains and parses the dictionary to be used, handles language and instantiates sub-content-types as needed |
| h5p-bildetema-words-grid-view | Shows the images, words and sounds for a given topic in a grid view                                                                   |

## Development

### Docker

The application can be run in a Docker container. To do so, run these commands:

1. To build the container image the first time: `npm run docker:build`
1. To run the container with logging attached: `npm run docker:run`. To run in detached mode, run `npm run docker:run-no-logs`
1. Open as many terminal windows as you need and `cd` into each `h5p-` directory you want to do changes in. Run `npm start` to watch the files and rebuild them on change.

### Storybook

Each project comes with [Storybook](https://storybook.js.org). Storybook provides hot module reloading and is the best option when editing React components where H5P is not involved. Whenever you're changing any code that depends on H5P, developing in the Docker environment is usually the best option.
