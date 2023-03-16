SHELL := /bin/bash
npm := $(shell which npm)

setup:
	rm -rf node_modules
	npm install
	
removeDocker:	
	@docker stop zipkin

startZipkin:
	echo 'Starting ZipkinExporter'
	@docker run --rm -d -p 9411:9411 --name zipkin openzipkin/zipkin

startServer:	
	echo 'Starting server'
	npm start


project: setup startServer
all: setup startZipkin startServer