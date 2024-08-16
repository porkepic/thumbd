FROM node:16
# FROM node:16-alpine

RUN apt-get update && apt-get install -y \
  imagemagick \
  && rm -rf /var/lib/apt/lists/*
# RUN apk add --no-cache imagemagick

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 5000
RUN npm install
CMD ["npm", "start"]
