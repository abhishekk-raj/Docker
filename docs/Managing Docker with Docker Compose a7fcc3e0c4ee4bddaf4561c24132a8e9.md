# Managing Docker with Docker Compose

## What is Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It is used to simplify the process of running multiple containers as a single service. Docker Compose uses a **`.yml`** file to define the services that make up an application, along with their configuration options. 

The **`.yml`** file is called a Compose file, and it can be used to define the containers, networks, and volumes that make up an application. 

Docker Compose allows you to start, stop, and manage multiple containers with a single command. It also provides features such as automatic network creation and linking between containers. With Docker Compose, you can define the configuration of your application once and then use it to deploy your application to different environments, such as development, staging, and production.

## Docker Compose Features

1. Start, stop and rebuild services
2. View the status of running services
3. Stream the log output of running services
4. Run a one-off command on a service

## Docker Compose Workflow

1. Build Services
2. Startup Services
3. Tear Down Services

## Install Docker Compose on Linux

Use the following commands to install Docker Compose - 

```docker
mkdir -p ~/.docker/cli-plugins/
```

```docker
curl -SL https://github.com/docker/compose/releases/download/v2.3.3/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
```

Set the correct permissions so that the `docker compose` command is executable

```docker
chmod +x ~/.docker/cli-plugins/docker-compose
```

Check the version to verify that the installation

```docker
docker compose version
```

## Docker-Compose.yml file

A **`docker-compose.yml`** file is a configuration file used by Docker Compose to define and manage multiple Docker containers as a single application. The file is written in YAML format and contains information about the services, networks, and volumes that make up the application. The **`docker-compose.yml`** file allows developers to define the configuration of their application in a single file, making it easier to deploy and manage complex applications. The file can be used to specify the Docker images to use, the ports to expose, the environment variables to set, and other configuration options.

## Key Service Configuration Options

1. **`build`** - The **`build`** element is used to specify the build context for a service. The build context is the path to the directory containing the Dockerfile and any other files required to build the image.
2. **`environment`** - The **`environment`** element is used to set environment variables for a service. Environment variables are used to pass configuration information to a container at runtime. The **`environment`** element can be specified as a list of key-value pairs, where each key-value pair represents an environment variable.
3. **`image`** - The **`image`** element is used to specify the name and tag of the Docker image to be used for a service.
4. **`networks`** - The **`networks`** element is used to specify the networks that a service should be connected to. Networks are used to enable communication between containers and to isolate containers from each other. Network can be created using Legacy Linking or adding containers to a bridge network.
5. **`ports`** - The **`ports`** element is used to specify the ports that a service should expose. Ports are used to enable communication between containers and between containers and the host system.
6. **`volumes`** - The **`volumes`** element is used to specify the volumes that a service should use. Volumes are used to persist data between container restarts and to share data between containers.

## Docker Compose commands

**`docker compose build`** - Build the services into images

**`docker compose up`** - Run the images as container

`**docker compose up -d**` - Run containers in demon mode

**`docker compose down`** - Stop the containers

**`docker compose logs`** - See the logs

**`docker compose ps`** - list the containers

**`docker compose stop`** - Stop the running services

**`docker compose start`** - Start the services

**`docker compose rm`** - Remove the containers

**`docker compose build IMAGE_NAME`** - Build the particular image

```jsx
docker compose up --no-deps node
```

Here **`—no-deps`** is a command to tell do not create services that node depends on. And **`node`** is the name of image that will be rebuilt ad stop, destroy and recreate only node.

```jsx
docker compose down --rmi all --volumes
```

Here **`—rmi`** all is used to remove all images and **`—volumes`** is used to remove all volumes when you will stop the containers.

## Create docker-compose file

```docker
version: '3'

services:
  node:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:3000"
    networks:
      - nodeapp-network

  mongodb:
    image: mongo
    networks:
      - nodeapp-network

networks:
  nodeapp-network:
    driver: bridge
```

Here, we are using docker-compose version 3. 

Services defines all the services (containers) we are going to create.

networks is used to create a bridge network in which we will be running all the containers.

**Pull Images**

We are not building our own container for mongodb but we are pulling it, so make sure you have mongo image available locally, if not then run following command - 

```docker
docker compose pull
```

It will pull all required images as per our docker-compose file

**Build services**

Now let’s create our images from docker-compose file

```docker
docker compose build
```

Now you can run `docker images` command to see if all the required images are build or not.

**Lets start the services**

```docker
docker compose up -d
```

Run `docker ps` command to see all running containers

## Run NodeJS, MongoDB, Radis with Nginx proxy