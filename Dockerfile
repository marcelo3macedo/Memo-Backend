FROM node:12-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install --only=dev

COPY . .

EXPOSE 3333

ENTRYPOINT ["sh", "./entrypoint.sh"]