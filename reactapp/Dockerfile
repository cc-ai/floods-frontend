FROM node:8

LABEL maintainer="CC-AI Team <email@domain.com"

WORKDIR /srv/app

# Install app dependencies
COPY package*.json ./
RUN npm install
COPY . /srv/app/

EXPOSE 3000
CMD [ "npm", "start" ]