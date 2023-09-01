FROM node:20

WORKDIR /app

COPY example/package*.json example/
RUN cd example && npm ci
COPY . .

EXPOSE 3000

WORKDIR /app/example
CMD ["node", "server.js"]
