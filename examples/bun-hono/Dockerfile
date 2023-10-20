FROM oven/bun

WORKDIR /app

COPY package*.json bun.lockb ./
RUN bun install --production
COPY . .

CMD ["bun", "run", "app.js"]
