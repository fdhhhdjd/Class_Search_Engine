# Get file .env
include .env
export $(shell sed 's/=.*//' .env)

# Folder constants
DOCKER_COMPOSE := docker-compose.yml
DOCKER_EXEC_APP := api_backend_service
DOCKER_EXEC_CACHE := redis-search

# Run auto
default:
	docker ps

run-build:
	sudo docker-compose -f $(DOCKER_COMPOSE) up -d --build
	make remove-image-none

run-dev:
	docker-compose -f $(DOCKER_COMPOSE) up -d

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down

into-source:
	docker exec -it  $(DOCKER_EXEC_APP) sh

into-source-redis:
	docker exec -it  $(DOCKER_EXEC_CACHE) sh

remove-image-none:
	docker images --filter "dangling=true" -q --no-trunc | xargs -r docker rmi || true                       

