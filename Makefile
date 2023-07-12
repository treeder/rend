
install:
	npm install fastify-cli --global
	npm install

run:
	cd example && fastify start --watch app.js

.PHONY: install test build docker release run
