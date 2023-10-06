
install:
	npm install fastify-cli --global
	cd example && npm install

run:
	cd example/bun-hono && make run

.PHONY: install test build docker release run
