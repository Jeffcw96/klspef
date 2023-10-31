IMAGE_NAME = klspef

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run -p -d 3000:3000 $(IMAGE_NAME)

.PHONY: build run