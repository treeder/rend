
install:
	npm install fastify-cli --global
	cd example && npm install

run:
	cd example && fastify start --watch app.js

.PHONY: install test build docker release run
