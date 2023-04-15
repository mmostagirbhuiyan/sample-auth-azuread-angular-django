FROM nginx:1.19.2-alpine

# Install Certbot
RUN apk add --no-cache certbot

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Obtain SSL certificate from Let's Encrypt and copy to Nginx container
RUN certbot certonly --webroot --webroot-path /var/www/html -d yourdomain.com -d www.yourdomain.com --email mmostagirbhuiyan@gmail.com --agree-tos --non-interactive && \
    cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /etc/ssl/certs/nginx.crt && \
    cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /etc/ssl/private/nginx.key && \
    rm -rf /var/cache/apk/*

# Add a script to renew the certificate and reload Nginx
COPY renew-certificate.sh /etc/periodic/weekly/renew-certificate
RUN chmod +x /etc/periodic/weekly/renew-certificate

CMD ["nginx", "-g", "daemon off;"]
