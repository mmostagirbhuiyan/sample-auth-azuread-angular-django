FROM nginx:1.19.2-alpine

RUN apk add --no-cache certbot

COPY nginx.conf /etc/nginx/nginx.conf

# Add a script to renew the certificate and reload Nginx
COPY renew-certificate.sh /etc/periodic/weekly/renew-certificate
RUN chmod +x /etc/periodic/weekly/renew-certificate

# Copy the initial SSL certificate files
COPY cert.pem /etc/ssl/certs/nginx.crt
COPY cert.key /etc/ssl/private/nginx.key

CMD ["nginx", "-g", "daemon off;"]
