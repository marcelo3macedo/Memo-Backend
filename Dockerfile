FROM node:16-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

RUN npm install ts-node-dev@1.1.6 -g

RUN npm i -g typescript@4.2.4

RUN yarn add tsconfig-paths

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev:server" ]