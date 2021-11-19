FROM node:lts-buster-slim

ENV NODE_ENV=production
ARG WorkPath=app
WORKDIR $WorkPath
#COPY ["package.json", "package-lock.json*", "./app/"]
COPY package.json .
COPY package-lock.json* .
COPY yarn.lock .
RUN yarn global add nodemon
RUN yarn
COPY  . .
CMD ["yarn", "start"]