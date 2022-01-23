FROM 727482340929.dkr.ecr.us-east-1.amazonaws.com/docker-hub/node12:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app

RUN npm install -g nodemon
RUN npm ci

EXPOSE 3030

CMD ["nodemon", "index.js"]