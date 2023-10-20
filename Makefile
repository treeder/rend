
install:
	npm install fastify-cli --global
	cd examples && npm install

run:
	cd examples/bun-hono && make run

.PHONY: install test build docker release run
