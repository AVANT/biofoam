.PHONY: staging upload clean package clean build loadEnv

include $(readlink .env)

dev:
	npm install
	npm start

dev-exp:
	docker-compose up data dev

staging: upload
	ssh -o StrictHostKeyChecking=no -i $(AVANT_KEY_PATH) $(AVANT_USER)@$(AVANT_STAGING_URL) sudo /usr/local/bin/update-vvvnt.sh frontend

prod: upload
	ssh -o StrictHostKeyChecking=no -i $(AVANT_KEY_PATH) $(AVANT_USER)@$(AVANT_PRODUCTION_URL) sudo /usr/local/bin/update-vvvnt.sh frontend

build: docker_host
	docker-compose up data build

docker_host: clean
	boot2docker up

upload: package
	AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) AWS_DEFAULT_REGION=$(AWS_DEFAULT_REGION) aws s3 cp dist.latest.tar.gz s3://fanny-pack/frontend/releases/dist.latest.tar.gz

package: build
	tar czf dist.latest.tar.gz _dist

clean:
	rm -fr _dist

