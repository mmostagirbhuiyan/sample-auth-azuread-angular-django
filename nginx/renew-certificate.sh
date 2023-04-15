#!/bin/sh

set -e

# Renew SSL certificate
certbot renew --quiet

# Copy renewed SSL certificate files to Nginx container
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /etc/ssl/certs/nginx.crt
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /etc/ssl/private/nginx.key

# Reload Nginx
nginx -s reload
