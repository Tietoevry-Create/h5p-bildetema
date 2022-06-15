FROM node:18.0.0 as builder
RUN apt-get update && apt-get install vim less -y
RUN npm install -g h5p
RUN mkdir -p /dev-h5p/cp

WORKDIR /dev-h5p
ADD . .
ADD ./docker-php-entrypoint docker-php-entrypoint

# Install packages in main projects and all sub projects
RUN npm install 

# Build sub projects
RUN cd h5p-bildetema                     && npm run build && rm -rf node_modules
# RUN cd h5p-bildetema-words-grid-view     && npm run build && rm -rf node_modules
# RUN cd h5p-bildetema-words-theme-image   && npm run build && rm -rf node_modules
# RUN cd h5p-bildetema-words-tree-view     && npm run build && rm -rf node_modules
RUN rm -rf node_modules 

FROM kentis123/drupal-h5p:drupal-7

COPY --from=builder /dev-h5p sites/default/files/h5p/development
COPY --from=builder /dev-h5p/docker-php-entrypoint /usr/local/bin/docker-php-entrypoint
RUN chmod +x /usr/local/bin/docker-php-entrypoint

RUN ./vendor/bin/drush vset theme_default seven
