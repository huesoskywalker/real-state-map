FROM cypress/base

WORKDIR /e2e

COPY cypress/package*.json ./

RUN yarn install

# RUN mkdir cypress

COPY . .

CMD ["yarn", "cypress:run"]