FROM node:10.13.0-alpine

RUN apk add bash --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY ./docker-entrypoint.sh ./

RUN npm install
# If you are building your code for production
run npm run tsc

# Bundle app source
COPY . .

RUN chmod 777 /usr/src/app/docker-entrypoint.sh \
    && ln -s /usr/src/app/docker-entrypoint.sh /

ENTRYPOINT [ "dockerize", "-wait", "tcp://db:5432", "-timeout", "40s", "/usr/src/app/docker-entrypoint.sh"  ]

EXPOSE 3000

