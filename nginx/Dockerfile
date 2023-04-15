FROM nginx:1.19.2-alpine
COPY ./fullchain.pem /etc/nginx/cert.pem
COPY ./privkey.pem /etc/nginx/cert.key
COPY ./nginx.conf /etc/nginx/nginx.conf