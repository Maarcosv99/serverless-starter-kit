FROM node:16.15

WORKDIR /usr/app/

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 4000