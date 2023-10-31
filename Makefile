IMAGE_NAME = klspef

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -d -p 3000:3000 --env-file .env $(IMAGE_NAME) 

.PHONY: build run