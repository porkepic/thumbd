FROM node:16
# FROM node:16-alpine

RUN apt-get update && apt-get install -y \
  imagemagick \
  && rm -rf /var/lib/apt/lists/*
# RUN apk add --no-cache imagemagick

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 5000
CMD ["npm", "start"]
