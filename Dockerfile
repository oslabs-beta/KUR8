FROM node:alpine

#because of issue in crate-react-app
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]