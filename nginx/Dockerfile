FROM nginx:1.19.2-alpine

RUN apk add --no-cache certbot

COPY nginx.conf /etc/nginx/nginx.conf

# Copy initial SSL certificate files
COPY /etc/letsencrypt/live/factsprovider.com/fullchain.pem /etc/nginx/cert.pem
COPY /etc/letsencrypt/live/factsprovider.com/privkey.pem /etc/nginx/cert.key

# Add a script to renew the certificate and reload Nginx
COPY renew-certificate.sh /etc/periodic/weekly/renew-certificate
RUN chmod +x /etc/periodic/weekly/renew-certificate

CMD ["nginx", "-g", "daemon off;"]
