FROM mhart/alpine-node:latest

WORKDIR /gateway

COPY . .

RUN yarn

RUN yarn compile

EXPOSE 4000

CMD ["yarn", "start:prod"]
