FROM python:3.7-slim
ENV DEBIAN_FRONTEND=noninteractive
ENV APP_HOME=/backend
RUN apt-get update && apt-get install -y \
	libpq-dev \
	python3-dev \
	gcc \
	libapache2-mod-wsgi-py3 \
	nano

COPY . $APP_HOME
WORKDIR $APP_HOME
RUN pip install -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --noinput
ENV STATIC_ROOT=$APP_HOME/static