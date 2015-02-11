.PHONY: staging upload clean package clean build loadEnv

staging: upload
	ssh -o StrictHostKeyChecking=no -i ~/.ssh/vvvnt.pem ubuntu@staging.moonrakr.co sudo /usr/local/bin/update-vvvnt.sh frontend

prod: upload
	ssh -o StrictHostKeyChecking=no -i ~/.ssh/vvvnt.pem ubuntu@avant.org sudo /usr/local/bin/update-vvvnt.sh frontend

build: clean
	boot2docker up
	docker-compose build
	docker-compose start &
	echo $?
	docker-compose run dev run build

upload: package loadEnv
	aws s3 cp dist.latest.tar.gz s3://fanny-pack/frontend/releases/dist.latest.tar.gz

package: build
	tar czf dist.latest.tar.gz _dist

clean:
	rm -fr _dist

loadEnv:
	. .env
