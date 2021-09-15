FROM node:12.0-alpine

WORKDIR /var/www/tv-service

ENV PORT=3002
ENV DATABASE_NAME=EntertainMe
ENV COLLECTION_NAME=TvSeries

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node","app.js"]