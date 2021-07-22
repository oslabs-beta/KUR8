FROM node:latest

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install zingchart-react --legacy-peer-deps
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]