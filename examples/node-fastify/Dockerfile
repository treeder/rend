FROM node:20

WORKDIR /app

COPY package*.json example/
RUN npm ci
COPY . .

EXPOSE 3000

WORKDIR /app
CMD ["node", "server.js"]
