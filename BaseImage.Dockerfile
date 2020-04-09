FROM node:12.13.1-alpine
RUN apk add --no-cache --virtual .gyp python make g++

#RUN npm install --production --silent
#RUN npm del .build-deps
