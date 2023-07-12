FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000

CMD ["cd", "example", "&&", "node", "server.js"]