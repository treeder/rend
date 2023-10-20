SHELL := /bin/bash

install:
	curl -fsSL https://bun.sh/install | bash
	# source /root/.bashrc 
	bun install

run:
	bun run --hot app.js

.PHONY: install test build release run
