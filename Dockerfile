# Base image
FROM node:20-alpine
ARG SERVICE

# Create app directory
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

# Install app dependencies
RUN yarn install
# Bundle app source 
COPY . .

RUN yarn build:api-service
RUN yarn build:custodian-service
