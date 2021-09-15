FROM node:12.0-alpine

WORKDIR /var/www/movies-service

ENV PORT=3001
ENV DATABASE_NAME=EntertainMe
ENV COLLECTION_NAME=Movies

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node","app.js"]