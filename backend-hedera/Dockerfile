# Base image
FROM node:20-alpine
ARG SERVICE

# Create app directory
WORKDIR /usr/src/app

COPY ./backend-hedera/package.json .
COPY ./backend-hedera/yarn.lock .

# Install app dependencies
RUN yarn install
RUN yarn add concurrently@8.2.2
# Bundle app source 
COPY ./backend-hedera .

RUN yarn build:api
RUN yarn build:custodian