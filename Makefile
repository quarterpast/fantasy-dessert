export SHELL := /bin/bash
export PATH  := $(shell npm bin):$(PATH)

test: test.js
	mocha test.js

test.js: test.sjs index.sjs
	sjs -m './index.sjs' test.sjs -o test.js