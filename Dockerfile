FROM node:20.5-slim
ENV NODE_ENV development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json","package-lock.json", "/usr/src/app/"]

RUN npm install
COPY . .
