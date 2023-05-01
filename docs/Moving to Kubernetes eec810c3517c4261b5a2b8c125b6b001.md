# Moving to Kubernetes

## What is Kubernetes?

Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.

## Features

1. **`Automated rollouts and rollbacks`** - Kubernetes progressively rolls out changes to your application or its configuration, while monitoring application health to ensure it doesn't kill all your instances at the same time. If something goes wrong, Kubernetes will rollback the change for you. Take advantage of a growing ecosystem of deployment solutions.
2. **`Storage orchestration`** - Automatically mount the storage system of your choice, whether from local storage, a public cloud provider such as [AWS](https://aws.amazon.com/products/storage/) or [GCP](https://cloud.google.com/storage/), or a network storage system such as NFS, iSCSI, Ceph, Cinder.
3. **`Secret and configuration management`** - Deploy and update secrets and application configuration without rebuilding your image and without exposing secrets in your stack configuration.
4. **`Batch execution`** - In addition to services, Kubernetes can manage your batch and CI workloads, replacing containers that fail, if desired.
5. **`IPv4/IPv6 dual-stack`** - Allocation of IPv4 and IPv6 addresses to Pods and Services
6. **`Service discovery and load balancing`** - No need to modify your application to use an unfamiliar service discovery mechanism. Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.
7. **`Self-healing`** - Restarts containers that fail, replaces and reschedules containers when nodes die, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve.
8. **`Automatic bin packing`** - Automatically places containers based on their resource requirements and other constraints, while not sacrificing availability. Mix critical and best-effort workloads in order to drive up utilization and save even more resources.
9. `**Horizontal scaling**` - Scale your application up and down with a simple command, with a UI, or automatically based on CPU usage.
10. **`Designed for extensibility`** - Add features to your Kubernetes cluster without changing upstream source code.

## Kubernetes Big Picture

![Screenshot from 2023-04-29 10-30-36.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_10-30-36.png)

In Kubernetes, a cluster is made up of one or more nodes, which are the worker machines that run containerized applications. Each cluster also has a master node, which is responsible for managing the cluster and its nodes. The master node runs the Kubernetes control plane, which controls the entire cluster. Pod is having containers.

## Running Kubernetes Locally

We can run Kubernetes locally following ways - 

1. Minikube
2. Docker Desktop

### Minikube

Visit this link - [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/) 

You will see first step is to select your system configuration and as per the configuration, it will give you the commands to install minikube

![Screenshot from 2023-04-29 12-17-27.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_12-17-27.png)

I’m using Ubuntu so **copy the first command and run in terminal** - 

```docker
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

**Install Minikube**

```docker
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

**Start the cluster**

```docker
minikube start
```

**Install kubectl**

```docker
sudo snap install kubectl --classic
```

### Docker Desktop

Its very easy to use Kubernetes using Docker Desktop - 

1. Open the Docker Desktop app on Mac/Windows
2. Go to Kubernetes tab
3. And check the first and second options such as - `**Enable Kubernetes**` and **`Deploy Docker Stacks to Kubernetes by default`**
4. Press the Apply button
5. And that’s it! Now you can use Kubernetes locally on Mac/Windows Machine

## Kubernetes Key Concepts

**Deployment**

1. Describe desired state
2. Can be used to replicate pods
3. Support rolling updates and rollbacks

**Services**

1. Pods live and die
2. Services abstract pod IP addresses from consumers
3. Load balances between pods

## Migration from Docker Compose to Kubernetes

There are several ways to migrate from Docker Compose to Kubernetes - 

1. Compose on Kubernetes
2. Kompose

**Compose on Kubernetes**

Compose on Kubernetes provides a way to use Docker Compose files to define and deploy applications on a Kubernetes cluster. This allows developers to use the familiar Docker Compose syntax to define their applications and then deploy them to a Kubernetes cluster. Compose on Kubernetes translates the Docker Compose files into Kubernetes resources, such as pods, services, and deployments, and deploys them to the Kubernetes cluster.

Visit the link to see the steps - https://github.com/docker/compose-on-kubernetes. This repository is now archived. 

You can run this command to deploy docker compose file to kubernetes 

```docker
docker stack deploy --orchestrator=kubernetes -c docker-compose.yml hellokube
```

**Kompose**

Kompose is a conversion tool that allows you to convert Docker Compose files to Kubernetes manifests. It is a convenience tool that simplifies the process of going from local Docker development to managing your application with Kubernetes. Kompose takes a Docker Compose file as input and generates Kubernetes resources, such as pods, services, and deployments, as output.

To install Kompose, visit this link - [https://kompose.io/installation/](https://kompose.io/installation/) 

Run the command to install it as per your Operating system. I’m doing it for ubuntu

```docker
curl -L https://github.com/kubernetes/kompose/releases/download/v1.28.0/kompose-linux-amd64 -o kompose
```

```docker
chmod +x kompose
```

```docker
sudo mv ./kompose /usr/local/bin/kompose
```

## Convert the docker-compose.yml file to Kubernetes files

```docker
kompose convert
```

After running above command you should see the different files created in your project directory as per the services defined in docker-compose.yml file

![Screenshot from 2023-04-29 13-15-56.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_13-15-56.png)

If you want to create a single file instead of different file, you can run this command

```docker
kompose convert --out test.yml
```

## Key Commands

`**kubectl version**` - To get the version

`**kubectl get [deployments | services | pods]**` - Get information about deployments, services, pods etc

`**kubectl run nginx-server --image=nginx:alpine**` - Used to create and run a particular image in a pod.

`**kubectl apply -f [fileName | folderName]**` -  Used to apply a configuration to a Kubernetes resource by specifying a file or a folder containing configuration files.

`**kubectl port-forward [name-of-pod] 8080:80**` - Used to create a port forward from a local port to a port on a pod in a Kubernetes cluster.

## Run a single container

To run a single container, we can use kubectl run command. In this case we are running nginx

```docker
kubectl run nginx-server --image=nginx:alpine
```

You can run command `kubectl get deployments` to see the new deployment.

You can also see the pods by running command `kubectl get pods` . It should give output like this 

![Screenshot from 2023-04-29 15-49-15.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_15-49-15.png)

Now to access this Nginx server, we need to forward the port - 

```docker
kubectl port-forward nginx-server 8080:80
```

So now, if you goto [http://localhost:8080/](http://localhost:8080/) You should see the default page of Nginx

![Screenshot from 2023-04-29 15-51-45.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_15-51-45.png)

If you want to delete deployment then run command - `kubectl delete deployment [deployment_name]`

You can also delete the pod using the command `kubectl delete pod [pod name]`

## Run multiple containers with yaml files

First we will create a new folder in our project’s root directory `**.k8s**` and move all kubernet yaml files inside. We are doing it so that we can run all file at a time otherwise we need to provide filenames one-by-one. 

![Screenshot from 2023-04-29 16-05-22.png](Moving%20to%20Kubernetes%20eec810c3517c4261b5a2b8c125b6b001/Screenshot_from_2023-04-29_16-05-22.png)

Create these resources in Kubernets

```docker
kubectl apply -f ./.k8s
```

Now all resources should be running. Run command `kubectl get services` to see all services running, Run `kubectl get pods` to see all pods running etc.

**Port forwarding**

```docker
kubectl port-forward node-6f59884447-cdxcb 8080:3000
```

## Stop and Remove containers

```docker
kubectl delete -f [fileName | folderName]
```

So in our case it will be `kubectl delete -f ./.k8s`

Now if you will check for running pods, services it should show no resources.