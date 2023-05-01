# Using Docker Tools

## Docker Client

Docker Client is a command-line interface (CLI) tool that allows users to interact with Docker. It can be used to create and manage Docker containers, images, networks, and volumes. The Docker Client communicates with the Docker daemon, which is responsible for building, running, and distributing Docker containers.

1. Interact with Docker Engine
2. Build and Manage Images
3. Run and manage Containers 

## Key Container commands

`docker pull [image name]` Pull the docker image from docker hub

`docker run [image name]` Run the pulled image

`docker images` List out all the images available

`docker rmi [image id]` Delete the image

`docker ps` List out all running containers available

`docker ps -a` List out all containers available

`docker rm [container id]` Delete the container

`docker rm -v [container id]` Delete the container along with Volumes

`docker rm -f $(docker ps -a -q)` Delete all containers

`docker run [container id/name]` Runs the docker container

`docker stop [container id/name]` To stop the docker container

`docker network ls` To list out all the available networks