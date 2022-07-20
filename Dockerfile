FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

EXPOSE 3333