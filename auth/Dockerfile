FROM mhart/alpine-node:latest

WORKDIR /auth

COPY . .

RUN yarn

RUN yarn compile

EXPOSE 4001

CMD ["yarn", "start:prod"]
