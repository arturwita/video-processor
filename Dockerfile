FROM node:18-alpine3.17 AS base

ENV SRC=/usr/local

WORKDIR /usr/src/app

EXPOSE 3000

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
