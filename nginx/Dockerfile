FROM nginx:1.19.2-alpine

RUN apk add --no-cache certbot

COPY nginx.conf /etc/nginx/nginx.conf

# Copy initial SSL certificate files from host machine
RUN mkdir -p /etc/letsencrypt/live/factsprovider.com/
COPY ./dummy.file /etc/letsencrypt/live/factsprovider.com/
RUN certbot certonly --webroot --webroot-path /var/www/html -d factsprovider.com -d www.factsprovider.com --email mmostagirbhuiyan@gmail.com --agree-tos --non-interactive
RUN rm /etc/letsencrypt/live/factsprovider.com/dummy.file
RUN cp /etc/letsencrypt/live/factsprovider.com/fullchain.pem /etc/ssl/certs/nginx.crt
RUN cp /etc/letsencrypt/live/factsprovider.com/privkey.pem /etc/ssl/private/nginx.key

# Add a script to renew the certificate and reload Nginx
COPY renew-certificate.sh /etc/periodic/weekly/renew-certificate
RUN chmod +x /etc/periodic/weekly/renew-certificate

CMD ["nginx", "-g", "daemon off;"]
