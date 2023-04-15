# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && \
    npm run build

# Final stage
FROM ubuntu:18.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    apache2 \
    apache2-utils
RUN a2enmod rewrite

# Copy apache config
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf
# Copy angular artifacts from the build stage
COPY --from=build /app/dist /var/www/html/dist

EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]
