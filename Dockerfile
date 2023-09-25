FROM node:16-alpine
RUN apk update && apk add git
WORKDIR /frontend
COPY package.json /frontend
COPY yarn.lock /frontend
COPY . .
RUN yarn
RUN yarn build
