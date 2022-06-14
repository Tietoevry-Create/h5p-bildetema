#!/bin/bash
mounts=""

for lib in h5p*/
do
    echo $lib
    mounts="${mounts} -v ${PWD}/${lib}:/var/www/html/sites/default/files/h5p/development/${lib}"
done

[ -d font-awesome/ ] && mounts="${mounts} -v ${PWD}/font-awesome:/var/www/html/sites/default/files/h5p/development/font-awesome"

echo $mounts

docker run --rm -p $1:80 $mounts kentis123/drupal-h5p:drupal-7
# docker run --rm -d -p $2:80 $mounts $1