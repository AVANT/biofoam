.PHONY: staging upload clean package clean build loadEnv

# VARS=$(shell cat .env)
IGNORE := $(shell bash -c "cat .env | sed 's/=/:=/' | sed 's/^/export /' > .makeenv")
include .makeenv

staging: upload
	ssh -o StrictHostKeyChecking=no -i ${AVANT_KEY_PATH} ${AVANT_USER}@${AVANT_STAGING_URL} sudo /usr/local/bin/update-vvvnt.sh frontend

prod: upload
	ssh -o StrictHostKeyChecking=no -i ${AVANT_KEY_PATH} ${AVANT_USER}@{AVANT_PRODUCTION_URL} sudo /usr/local/bin/update-vvvnt.sh frontend

build: clean
	boot2docker up
	docker-compose build
	docker-compose scale data=1
	docker-compose run dev run build

upload: package
	aws s3 cp dist.latest.tar.gz s3://fanny-pack/frontend/releases/dist.latest.tar.gz

package: build
	tar czf dist.latest.tar.gz _dist

clean:
	rm -fr _dist
