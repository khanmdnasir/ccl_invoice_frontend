FROM node:16-alpine
RUN apk update && apk add git
COPY package.json /frontend/package.json
COPY yarn.lock /frontend/yarn.lock
WORKDIR /frontend
COPY . .
RUN yarn
RUN yarn build
