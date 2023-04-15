# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Final stage
FROM httpd:2.4
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY ./000-default.conf /usr/local/apache2/conf/httpd.conf
EXPOSE 80
CMD ["httpd-foreground"]
