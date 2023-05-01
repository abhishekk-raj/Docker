# Introduction

## What is Docker

Docker is a containerization platform that allows developers to create, deploy, and run applications in containers. Containers are a lightweight and portable way to package and distribute code, making it easier to move applications between environments. Docker provides a consistent and reliable environment for running applications, regardless of the underlying infrastructure.

- Its lightweight, open, secure platform
- Simplify building, shipping, running apps
- Shipping container system for code
- Runs natively on Linux or windows server
- Runs on windows or Mac Development machines (with a virtual machine)
- Relies on “images” and “containers”

## Docker Image

A Docker image is a read-only template that contains a set of instructions for creating a container. It includes the application code, runtime, system tools, libraries, and settings needed to run the application. Images are built from a Dockerfile, which is a text file that contains instructions for building an image. Once an image is built, it can be stored in a registry and used to create containers that can run the application.

## Docker Container

A Docker container is a lightweight, standalone, and executable package that includes everything needed to run an application. It is created from an image and contains the application code and all its dependencies. Containers can be easily moved between environments, ensuring consistent behavior regardless of the underlying infrastructure. Docker provides tools for managing containers, such as starting, stopping, and scaling them to meet the needs of the application.

## Where does Docker run?

Docker runs natively on Linux and Windows Server operating systems. It can also run on Windows or Mac development machines using a virtual machine. This allows developers to create, test, and deploy applications in a consistent environment regardless of the underlying infrastructure. Docker also provides tools for managing containers, such as Docker Compose and Docker Swarm, which can be used to orchestrate multiple containers across distributed systems.

## Docker Container vs Virtual Machine

Docker containers are more lightweight and faster to start up than virtual machines, as they share the same kernel as the host system. This means that they use fewer resources and can be scaled more easily. Virtual machines, on the other hand, provide a more isolated environment and can run multiple operating systems on the same hardware, making them more flexible in some use cases. However, they require more resources and take longer to start up than Docker containers.

[container-vs-vm-inline1_tcm19-82163.avif](Introduction%204d96d164c8b84df7ab13d05af288b3cc/container-vs-vm-inline1_tcm19-82163.avif)

## Docker Benefits

1. Accelerate Developer onboarding
2. Eliminate app conflicts 
3. Environment consistency
4. Ship software faster

## Docker Tools

**Docker Desktop**

- Provides image and container tools like Docker Client, Docker Compose and Docker Kitematic
- Available for both Windows 10 Pro and Mac
- It uses Hyper-V for windows and Hyperkit for Mac to run VMs
- Works on Windows, Mac, Linux (Docker Engine)

**Docker Tool vs Docker Desktop**

Docker Toolbox

Works with windows 7 or 8

Uses VirtualBox

Will use docker machine

Docker Desktop

Works with Windows 10+ Pro or Mac

Hyper-V/Hyperkit