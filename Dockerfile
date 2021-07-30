ARG DOCKER_IMAGES_REPO
FROM ${DOCKER_IMAGES_REPO}/manage/php-apache:7.4-node14

COPY . /tmp

RUN cd /tmp \
  && npm ci \
  && npm run build

WORKDIR ${APACHE_DOCUMENT_ROOT}

RUN cp -a /tmp/dist/. ${APACHE_DOCUMENT_ROOT}/
RUN rm -rf /tmp
RUN chown -R www-data:www-data ${APACHE_DOCUMENT_ROOT}
