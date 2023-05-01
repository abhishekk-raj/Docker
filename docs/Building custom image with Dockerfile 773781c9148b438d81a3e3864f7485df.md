# Building custom image with Dockerfile

## What is Dockerfile?

A Dockerfile is a text document that contains a set of instructions and commands that are used to build a Docker image. It is essentially a script that uses the Docker platform to generate containers automatically. The Dockerfile contains all the commands that a user could call on the command line to assemble an image. The instructions in a Dockerfile include things like specifying the base image, adding files and directories, running commands, and exposing ports. By using a Dockerfile, you can automate the process of building Docker images, making it easier to create and manage containers. Dockerfiles are used to create custom images that can be used to run applications in containers. Once a Dockerfile is created, it can be used to build an image using the **`docker build`**
command.

![Screenshot from 2023-04-22 12-31-43.png](Building%20custom%20image%20with%20Dockerfile%20773781c9148b438d81a3e3864f7485df/Screenshot_from_2023-04-22_12-31-43.png)

1. Dockerfile is just a text file that is used to build Docker images
2. It contains build instructions
3. Instructions create intermediate image that can cached to speed up future builds
4. It’s used with `docker build` command

## Dockerfile Instructions

1. **`FROM`** - The **`FROM`** instruction in a Dockerfile specifies the base image to use for building the Docker image. It must be the first instruction in the Dockerfile. The **`FROM`** instruction is followed by the name of the base image, which can be a public image from Docker Hub or a private image from a registry.
2. `**LABEL**` - The **`LABEL`** instruction is used to add metadata to an image. Labels are key-value pairs that can be used to provide information about the image, such as the version number, description, or maintainer.
3. `**RUN**` - The **`RUN`** instruction is used to execute commands during the build process. It can be used to install packages, update the system, download files, or perform any other necessary tasks during the build process. Multiple **`RUN`** instructions can be used in a Dockerfile to execute different commands. It is important to note that each **`RUN`** instruction creates a new layer, so it is a good practice to chain multiple commands together using the **`&&`** operator to minimize the number of layers created.
4. `**COPY**` - The **`COPY`** instruction is used to copy files and directories from the host machine to the container. It takes two arguments: the source path and the destination path. The source path is the path to the file or directory on the host machine, and the destination path is the path to the file or directory in the container. The **`COPY`** instruction can be used to copy files such as application code, configuration files, or other resources that are required by the application. The **`COPY`** instruction can also be used to copy files between containers. It is important to note that the **`COPY`** instruction only copies files during the build process, and not during runtime. To copy files during runtime, you can use the **`docker cp`** command.
5. `**ENTRYPOINT**` - The **`ENTRYPOINT`** instruction is used to specify the command that should be run when a container is started from the image. The **`ENTRYPOINT`** instruction is followed by the command and any arguments that should be passed to it.
6. `**WORKDIR**` - The **`WORKDIR`** instruction is used to set the working directory for any subsequent instructions in the Dockerfile, such as **`RUN`**, **`CMD`**, **`ENTRYPOINT`**, **`COPY`**, and **`ADD`**. The **`WORKDIR`** instruction is followed by the path to the working directory.
7. `**EXPOSE**` - he **`EXPOSE`** instruction is used to inform Docker that the container will listen on the specified network ports at runtime.
8. **`ENV`** - The **`ENV`** instruction is used to set environment variables that can be used by the container at runtime. The **`ENV`** instruction takes one or more arguments, which are the name and value of the environment variable.
9. `**VOLUME**` - The **`VOLUME`** instruction is used to create a mount point for a volume in the container. The **`VOLUME`** instruction takes one or more arguments, which are the path to the directory that should be treated as a volume. The **`VOLUME`** instruction can be used to create a persistent data volume that can be shared between containers or between the host machine and the container. When a container is started from an image that includes a **`VOLUME`** instruction, Docker will create a new volume and mount it to the specified path.

## Create Dockerfile

In root directory of project, let’s create a new file called **`Dockerfile`**. We can also give some specific name like `**production.dockerfile**`, **`staging.dockerfile`** etc. if we have multiple dockerfiles. In this case let’s create a single Dockerfile - 

```jsx
FROM node:latest

LABEL author="Abhishek Raj"

ENV NODE_ENV=production
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

VOLUME [ "/var/www" ]

RUN npm install

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]
```

## Building a Custom Image

To build a custom image, we can use the command below -

```jsx
docker build -f Dockerfile -t <your username>/node .
```

Here, **`-t`** used for assigning tag, **`-f`** is used to specify the docker file name, but if we use Dockerfile as a docker file name then it’s optional to specify the file name while building `**username**` is tag name and **`.`** is build context.

After building the image let’s run `docker images` to see all images. It will list out all the images like below -

![Screenshot from 2023-04-22 15-13-57.png](Building%20custom%20image%20with%20Dockerfile%20773781c9148b438d81a3e3864f7485df/Screenshot_from_2023-04-22_15-13-57.png)

Here you can see new images is added with the name `abhishekkraj/node`

Now let’s run the docker with newly created image -

```jsx
docker run -d -p 8080:3000 abhishekkraj/node
```

Here -d is used to run docker container in demon mode, so that it will not show the output after running the container and you can use the terminal for other purposes. 

## Publish and Image to Docker Hub

1. To publish an image to Docker Hub, you first need to create an account on it. So just visit [hub.docker.com](http://hub.docker.com) and create an account.
2. Open terminal and go to project directory.
3. Login to docker hub - `docker login`
4. Enter the Username and Password

![Screenshot from 2023-04-22 20-34-54.png](Building%20custom%20image%20with%20Dockerfile%20773781c9148b438d81a3e3864f7485df/Screenshot_from_2023-04-22_20-34-54.png)

1. After successful login, you can push the image to Docker Hub - `docker push abhishekkraj/node`

![Screenshot from 2023-04-22 20-38-51.png](Building%20custom%20image%20with%20Dockerfile%20773781c9148b438d81a3e3864f7485df/Screenshot_from_2023-04-22_20-38-51.png)

1. Now go to Docker Hub and you should be able to see your image there

![Screenshot from 2023-04-22 20-41-25.png](Building%20custom%20image%20with%20Dockerfile%20773781c9148b438d81a3e3864f7485df/Screenshot_from_2023-04-22_20-41-25.png)

So now if you want to use your image, you can pull it directly from Docker Hub and use it.

`docker pull abhishekkraj/node`