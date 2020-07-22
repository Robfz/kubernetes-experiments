FROM node:alpine

WORKDIR /project

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src

CMD ["node", "src/main.js"]
