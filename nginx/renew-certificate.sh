#!/bin/sh

certbot renew --quiet && \
cp /etc/letsencrypt/live/factsprovider.com/fullchain.pem /etc/ssl/certs/nginx.crt && \
cp /etc/letsencrypt/live/factsprovider.com/privkey.pem /etc/ssl/private/nginx.key && \
nginx -s reload
