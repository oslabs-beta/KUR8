FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
#  2 yml files, 1 for client, 1 for server