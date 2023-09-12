FROM oven/bun

WORKDIR /app

COPY package*.json example/
RUN bun install --frozen-lockfile
COPY . .

EXPOSE 3000

WORKDIR /app
CMD ["bun", "run"]
