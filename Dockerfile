FROM node:13-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3333

ENTRYPOINT ["npm", "run"]