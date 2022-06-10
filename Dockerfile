FROM node:18.0.0 as builder
RUN apt-get update && apt-get install vim less -y
RUN npm install -g h5p
RUN mkdir -p /dev-h5p/cp

WORKDIR /dev-h5p
ADD h5p-bildetema h5p-bildetema
ADD ./docker-php-entrypoint docker-php-entrypoint
RUN cd h5p-bildetema && npm install && npm run build; exit 0

FROM kentis123/drupal-h5p:drupal-7

COPY --from=builder /dev-h5p sites/default/files/h5p/development
COPY --from=builder /dev-h5p/docker-php-entrypoint /usr/local/bin/docker-php-entrypoint
RUN chmod +x /usr/local/bin/docker-php-entrypoint
