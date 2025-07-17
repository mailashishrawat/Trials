# To build the docker image run: docker build -t <IMAGE NAME> .
# To view images run: docker images
# To run the image run: docker run -p 8080:8080 -d <IMAGE NAME>

FROM docker.wdf.sap.corp:50000/cxm/node-alpine:18.19.0 as build

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production --no-audit  --legacy-peer-deps
COPY . .
RUN npm run build

FROM docker.wdf.sap.corp:50000/cxm/node-alpine:18.19.0 as runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
#COPY ./protos/proxy /usr/src/app/protos/proxy
COPY ./dist /usr/src/app/dist


EXPOSE 48961

CMD [ "npm", "run", "start:prod" ]
