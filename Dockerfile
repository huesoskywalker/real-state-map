#Official Bun runtimeimage
FROM oven/bun:1.0.3

#Set the working directory
WORKDIR /src

#Copy package*.json
COPY package*.json ./

#Install dependencies
RUN bun install

#Copy the source code
COPY . .

#Set NODE Environment
ENV NODE_ENV=development

#Expose the port the app runs on
EXPOSE 3000

#Start the app
ENTRYPOINT [ "./entrypoint.sh" ]
