FROM node:12.0-alpine

WORKDIR /var/www/entertainme-orchestrator

ENV PORT=4000
ENV DATABASE_NAME=EntertainMe
ENV MOVIES_SERVICES_PATH=http://movies-service:3001
ENV TV_SERIES_SERVICES_PATH=http://tv-service:3002

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node","app.js"]