FROM node:16.6.1-alpine

WORKDIR /app

COPY package.json .

RUN npm install


EXPOSE 6969


COPY . .

CMD [ "npm", "start"]