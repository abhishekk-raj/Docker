# Hooking Source code into a Container

## Layered File System

One of the key features of containerization is the ability to isolate an application and its dependencies from the underlying host system. This is typically accomplished through the use of a layered file system.

A layered file system is a way of combining multiple file systems into a single, unified view. Each layer can contain its own set of files and directories, and changes made to one layer will not affect the others. By using a layered file system, it is possible to create a lightweight, portable environment that can be easily moved from one host system to another.

When hooking source code into a container, it is important to consider how the layered file system will be used. Typically, the source code will be mounted as a read-only layer, while any build artifacts or generated files will be written to a separate layer. This helps to ensure that the source code remains unchanged, while still allowing the container to build and execute the application as needed.

![Screenshot from 2023-04-21 09-29-24.png](Hooking%20Source%20code%20into%20a%20Container%208470165ec3bc4d349c82b22522b29669/Screenshot_from_2023-04-21_09-29-24.png)

Images are Read-Only, we cannot modify it. So we can create another layer on top of it that is Container Layer, here we can do both Read and Write. 

And this is the basic difference between Docker Image and Container. If Container gets deleted then the writable layer will also get deleted. 

![Screenshot from 2023-04-21 09-35-43.png](Hooking%20Source%20code%20into%20a%20Container%208470165ec3bc4d349c82b22522b29669/Screenshot_from_2023-04-21_09-35-43.png)

We can create multiple containers from an Image. We can store our source code in Docker Container, but problem with container is when you will delete the container, source code and other files will also get deleted. 

## Containers and Volumes

What is a Volume?

It’s a special type of directory in a container typically referred to as a “data volume”. It can be shared and reused among containers. 

If we update the image, it will not affect a data volume. Data volumes are actually persisted even after the container is deleted. 

![Screenshot from 2023-04-21 10-44-36.png](Hooking%20Source%20code%20into%20a%20Container%208470165ec3bc4d349c82b22522b29669/Screenshot_from_2023-04-21_10-44-36.png)

When we write to a volume that means when we write our source code to the docker container it actually writes it to `/var/www` path that is really an alias to the mounted folder on Docker Host. 

Docker Host hosts the Docker Containers. If we are running docker on Linux system or Windows or Mac the Operating System is the host for container. 

In Docker, the container's writable layer is not persistent and is deleted when the container is deleted. However, by using a volume that is mounted to a folder on the Docker host, you can write data to this folder instead of the container's Read/Write layer. This allows you to preserve important data such as source code or log files even if the container is deleted. This is particularly useful for applications that generate large amounts of data or for long-running containers that need to persist data across restarts. By using volumes, you can ensure that your data is safe and accessible even if the container is deleted or recreated.

## Creating a Data Volume

We run docker container using the following command - 

```tsx
docker run -p 8080:3000 node
```

But if we want to use a custom data volume then we will have to use the following command - 

```docker
docker run -p 8080:3000 -v /var/www node 
```

Here `-v` is used to create a Volume and `/var/www` is a Container Volume. 

To locate a Volume, we can use the command below - 

```docker
docker inspect mycontainer
```

It will give a very long output with all the details…

![Screenshot from 2023-04-21 11-30-17.png](Hooking%20Source%20code%20into%20a%20Container%208470165ec3bc4d349c82b22522b29669/Screenshot_from_2023-04-21_11-30-17.png)

Here we can see the source and destination. In the source I have mounted it to the directory of Docker Host i.e my Ubuntu computer.

## Customising the Host Location for a Data Volume

I above screenshot as you can see I’m using the Volume from my Host computer. So if you want to customise the Host Location for a Data Volume then run the following command - 

```docker
docker run -p 8080:3000 -v $(pwd):/var/www node
```

Here `-v` used to create a Volume, `$(pwd)` is Host Location i.e your Host machine’s volume and `/var/www` is a Container Volume. 

## Create Source Code and Run from Docker Container

**Create a sample Node JS project**

1. Create a sample project on your computer - `mkdir NodeSample`
2. Goto the project directory and initiate node application - `npm init -y`
3. Install dependencies - `npm install express`
4. Open project in code editor - `code .`
5. Create a new file index.js in root directory 

```jsx
const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

1. Update the package.json scripts to add this - `"start": "node index.js"`
2. Run the project locally to see if everything working fine on `[http://localhost:3000](http://localhost:3000/)
3. If everything working correctly then stop the local server

**Run the NodeJS project from Docker container**

```jsx
docker run -p 8080:3000 -v $(pwd):/var/www -w "/var/www" node npm start
```

This will run the application on Docker and expose the port 8080. Now goto link [http://localhost:8080/](http://localhost:8080/) and see if you see the exact same result that you saw after running locally.

**Update Source Code**

Goto code editor and make some changes to the index.js file

```jsx
app.get('/', (req, res) => {
  res.send('Hello World! This is a test');
});
```

To see the changes - 

1. Stop the Docker Container - `docker stop [container id]`
2. And start the container again - `docker start [container id]`

> *Note:- Now we are running our project from container so if we don’t have node installed locally on machine, it will not matter.*
> 

## Removing container and Volume

When you delete the container it doesn’t delete the attached volume itself. To delete the volume along with container we need to run following command - 

```jsx
docker rm -v [container id]
```

It will delete the volume if you have only specified the source directory like - `docker run -p 8080:3000 -v var/www node npm start`

But if you have specified the both source and destination directory then there will be no impact.