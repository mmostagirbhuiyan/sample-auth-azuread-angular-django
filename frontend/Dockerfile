FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    apache2 \
    apache2-utils
RUN a2enmod rewrite

# Copy apache config
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf
# Copy angular artifacts
COPY ./dist /var/www/html/dist

EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
