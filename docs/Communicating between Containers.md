# Communicating between Containers

In our application we might have multiple containers for web server, database and cashing server. So to communicate with each other we need to link the containers.

There are two ways to link the containers -

1. Using the Legacy linking (Linking container by name)
2. Adding containers to a Bridge Network 

The main difference between legacy linking and adding containers to a bridge network is that legacy linking is a deprecated feature, while adding containers to a bridge network is the recommended way to connect containers. Legacy linking uses the **`--link`** flag to establish a connection between two containers, and once the connection is established, the linked containers can communicate with each other using environment variables. However, the **`--link`** flag is a legacy feature and may eventually be removed. On the other hand, adding containers to a bridge network employs a software bridge that enhances communication between containers that are connected to it. The software bridge prevents containers that are not connected to it from getting or establishing communication. After installing Docker, the default bridge network is created automatically, and all newly started containers will connect automatically to the default bridge network.

## Using Legacy Linking

To use the legacy linking, we need to follow following steps -

1. Run a container with a Name
2. Link to Running Container by Name
3. Repeat for Additional Containers

**Run container with name**

```jsx
docker run -d --name [container name] [image-name]
```

for example:- `docker run -d —name mongodb mongo`

Here name is **`mongodb`** and image is **`mongo`**

**Link to Running Container by Name**

```jsx
docker run -d -p 8080:3000 --link mongodb:mongodb abhishekkraj/node
```

Here, `**—link**` is used to link to the named container. First **`mongodb`** is name of linked container and second(RHS) `**mongodb**` is linked container alias. 

## Adding Container to a Bridge Network

Bridge network is a type of network that allows containers to communicate with each other while providing isolation from other networks. When you launch Docker containers without a custom bridge network setup, Docker launches them in the default bridge network. The default bridge network has a different IP subnet and there's no way for it to route via the host IP address.

**Advantages of using bridge network over legacy linking**

Bridge networks provide better isolation and security between containers, automatic DNS resolution, and better scalability. With bridge networks, containers can communicate with each other using their names or aliases, which makes it easier to manage and scale applications. Bridge networks also provide better security by isolating containers from other networks and preventing direct communication between containers on different bridge networks. In contrast, legacy linking requires you to manually specify the IP address and port of the container you want to link to, which can be error-prone and difficult to manage at scale. Additionally, legacy linking does not provide automatic DNS resolution, which can make it difficult to manage large-scale applications. Overall, bridge networks are a more modern and recommended approach to networking in Docker, while legacy linking is considered a legacy feature and is not recommended for production use.

**Steps to create a Container Network**

1. Create a Custom Bridge Network
2. Run Containers in the Network

**Create a Custom Bridge Network**

```jsx
docker network create --driver bridge isolated_network
```

Here **`create`** is used to create a custom network. **`bridge`** is used to use a Bridge Network and **`isolated_name`** is name of custom network. 

**Run containers in the Container Network**

```jsx
docker run -d --net-isolated_network --name mongodb mongo
```

Here, **`—net`** is used to run container in network and **`mongodb`** is name of container will be used to Link to this container by name. 

**Inspect Network**

```jsx
docker network inspect isolated_network
```

It will inspect the network and show the details like below - 

![Screenshot from 2023-04-25 11-33-52.png](Communicating%20between%20Containers/Screenshot_from_2023-04-25_11-33-52.png)

Here you can see the name, id, driver, subnet, gateway, attached containers etc.

**Start containers inside network**

1. Start Mongo DB - `docker run -d --net=isolated_network --name mongodb mongo`
2. Start Node JS - `docker run -d --net=isolated_network --name nodeapp -p 8080:3000 abhishekkraj/node`