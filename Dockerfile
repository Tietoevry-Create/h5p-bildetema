FROM node:18.0.0 as builder
RUN apt-get update && apt-get install vim less -y
RUN npm install -g h5p
RUN mkdir -p /dev-h5p/cp

WORKDIR /dev-h5p
ADD . .
ADD ./docker-php-entrypoint docker-php-entrypoint

# Install Chromium separately instead of installing via npm, as that doesn't work on M1 CPUs

# vvvvvv Uncomment these if running on an ARM CPU (Macs with M1, M2)
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# RUN apt-get install chromium -y
# ^^^^^^ Uncomment these if running on an ARM CPU (Macs with M1, M2)

# Install packages in main projects and all sub projects
RUN npm install 
RUN npm run build
RUN rm -rf ./**/node_modules

FROM kentis123/drupal-h5p:drupal-7

COPY --from=builder /dev-h5p sites/default/files/h5p/development
COPY --from=builder /dev-h5p/docker-php-entrypoint /usr/local/bin/docker-php-entrypoint
COPY h5p-patches/h5p.module /var/www/html/sites/all/modules/h5p/h5p.module
RUN chmod +x /usr/local/bin/docker-php-entrypoint

RUN ./vendor/bin/drush vset theme_default seven

