FROM node:22-alpine3.22

WORKDIR /app

RUN apk update && apk upgrade \
    && npm install -g npm@latest

COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
