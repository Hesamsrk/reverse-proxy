FROM node:16.6.1-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV PORT 6969

EXPOSE $PORT

COPY . .

RUN npm run syncdb

CMD [ "npm", "start"]