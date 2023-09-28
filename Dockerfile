#Official Node runtimeimage
FROM node:latest

#Set the working directory
WORKDIR /application

#Copy package*.json
COPY package*.json ./

#Install dependencies
RUN yarn install

#Copy the source code
COPY . .

#Expose the port the app runs on
EXPOSE 3000


ENTRYPOINT [ "./entrypoint.sh" ]
