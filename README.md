# reverse-proxy
By [Hesamsrk](https://www.linkedin.com/in/hesamsrk/)
## What is it?

A fully functional, configurable yet simple `reverse-proxy` which you can use it to manage and secure your existing applications.

This application uses [Express](https://www.npmjs.com/package/express)
, [typescript](https://www.npmjs.com/package/typescript)
, [JWT](https://jwt.io/)
, [MYSQL](https://www.mysql.com/), [Sequelize-typescript](https://www.npmjs.com/package/Sequelize-typescript)
and [http-proxy](https://www.npmjs.com/package/http-proxy)

## How to run it?

- This application is dockerized for ease of use, so you need to install [docker](https://docs.docker.com/get-docker/) and [docker-compsoe](https://docs.docker.com/compose/install/) to run this program.
- After running docker and docker-compose simply run:
```
docker run --rm --name mydatabase -e MYSQL_ROOT_PASSWORD=13731378 -e MYSQL_DATABASE=reverseProxy mysql

docker build -t reverse-proxy .

docker run --it --rm --name reverse-proxy-app -e DATABASE_HOST=mydatabase
```


```
# for linux and mac
sudo docker-compose up

# OR

# for windows
docker-compose up
```

### Add new services

You can change the `services.config.ts` file to add new services or configure existing ones.

```typescript
import { ServiceConfigs } from "./src/types/service";

export const services: ServiceConfigs[] = [
  {
    name: "httpbin",
    hostname: "httpbin.org",
    protocol: "http",
  },
];
```

## Run locally

If you don't want to use docker to run this application for any reason you can still run it on your local machine:

- Install nodejs.
- Install mysql.
- Configure enviroment-variables:
  `.env`
  ```
  PORT=6969
  JWT_SECRET=avadakdora
  JWT_REFRESH_SECRET=vingardiumleviousa
  DATABASE_HOST=mydatabase
  DATABASE_PORT=3306
  DATABASE_USERNAME=root
  DATABASE_PASSWORD=13731378
  DATABASE_NAME=reverseProxy
  ORIGINS=localhost:3000
  APP_NAME=reverseProxyApp
  ```
- Run these commands in the project root:

```
npm install
npm run syncdb
npm start
```
