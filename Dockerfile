FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install nodemon -g

COPY package.json /usr/src/app/

RUN npm install

EXPOSE 3333

CMD [ "npm", "run", "dev:server" ]