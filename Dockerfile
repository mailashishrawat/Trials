# To build the docker image run: docker build -t <IMAGE NAME> .
# To view images run: docker images
# To run the image run: docker run -p 8080:8080 -d <IMAGE NAME>

FROM node:latest AS build

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json ./
RUN npm install --production --no-audit
COPY . .
RUN npm run build 

FROM node:current-alpine3.15 as runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
#COPY ./protos/proxy /usr/src/app/protos/proxy
#COPY ./dist /usr/src/app/dist


EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
