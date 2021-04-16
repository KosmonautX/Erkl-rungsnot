FROM node:12.22

RUN mkdir -p /app

WORKDIR /app

ADD package*.json ./
RUN npm install

COPY . /app/