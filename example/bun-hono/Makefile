SHELL := /bin/bash

install:
	# curl -fsSL https://bun.sh/install | bash
	# npm install -g bun
	# source /root/.bashrc 
	bun add treeder/rend
	bun add hono
	bun install

run:
	bun run --hot app.js

.PHONY: install test build release run
