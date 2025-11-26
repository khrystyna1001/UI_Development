FROM node:22-alpine AS base
WORKDIR /usr/src/app

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

RUN apk add --no-cache bash git \
    && npm i --unsafe-perm -g npm@latest expo-cli@latest 

ARG REACT_NATIVE_PACKAGER_HOSTNAME
ENV REACT_NATIVE_PACKAGER_HOSTNAME=$REACT_NATIVE_PACKAGER_HOSTNAME

RUN chown -R node:node /usr/src/app
USER node

FROM base AS dependencies
WORKDIR /usr/src/app

COPY package*.json ./ 
RUN npm ci --prefer-offline --no-audit


FROM dependencies AS build
WORKDIR /usr/src/app
COPY . ./
RUN npm run build

FROM dependencies AS development
WORKDIR /usr/src/app

EXPOSE 19000 19001 19002 19003 19006 8081

CMD ["npx", "expo", "start"]