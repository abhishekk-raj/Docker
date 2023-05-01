# Setting up Docker Environment

## Install docker on Mac

To install Docker on a Mac, you can download the Docker Desktop application from the Docker website. Once downloaded, open the application and follow the installation instructions. After installation, you can use Docker to run and manage containers on your Mac.

Visit the link given below

[https://www.docker.com/get-started/](https://www.docker.com/get-started/)  

Here you can find options to download Docker for Windows, Mac and Linux

![Screenshot from 2023-04-20 23-12-38.png](Setting%20up%20Docker%20Environment/Screenshot_from_2023-04-20_23-12-38.png)

And then follow the instructions given in below link - 

[https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install/) 

So when you will click on See Docker Desktop for Mac, then you will redirect to the above link. There you can find option to download Docker desktop for Intel/Silicon chip

![Screenshot from 2023-04-20 23-15-47.png](Setting%20up%20Docker%20Environment/Screenshot_from_2023-04-20_23-15-47.png)

## Install Docker On Windows

To install Docker on Windows, you can download the Docker Desktop application from the Docker website. Once downloaded, open the application and follow the installation instructions. After installation, you can use Docker to run and manage containers on your Windows machine.

Visit the link given below:

[https://www.docker.com/get-started/](https://www.docker.com/get-started/)

Here you can find options to download Docker for Windows, Mac and Linux.

And then follow the instructions given in the below link:

[https://docs.docker.com/desktop/windows/install/](https://docs.docker.com/desktop/windows/install/)

![Screenshot from 2023-04-20 23-22-50.png](Setting%20up%20Docker%20Environment/Screenshot_from_2023-04-20_23-22-50.png)

## Docker Kitematic

Docker Kitematic is a graphical user interface (GUI) for Docker that allows you to easily manage Docker containers and images. It provides an intuitive interface for creating and running containers, including the ability to search for and download images from Docker Hub. To install Docker Kitematic, simply download and run the Docker Desktop application and then click on the Kitematic button in the Docker Dashboard.

1. GUI used to provision VMs and work with Images and Containers
2. Visually search for Docker Images
3. Create, Run and Manage Containers

## Install Docker on Linux

To install docker on Ubuntu 22.04, we need to follow these steps - 

**Update existing list of packages**

```docker
sudo apt update
```

**Install a few prerequisite packages which let `apt` use packages over HTTPS**

```docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

**Add the GPG key for the official Docker repository to your system**

```docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

**Add the Docker repository to APT sources**

```docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**Update your existing list of packages again for the addition to be recognized**

```docker
sudo apt update
```

**Make sure you are about to install from the Docker repo instead of the default Ubuntu repo**

```docker
apt-cache policy docker-ce
```

You should see output like this - 

```docker
docker-ce:
  Installed: (none)
  Candidate: 5:20.10.14~3-0~ubuntu-jammy
  Version table:
     5:20.10.14~3-0~ubuntu-jammy 500
        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
     5:20.10.13~3-0~ubuntu-jammy 500
        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
```

**Finally, install Docker**

```docker
sudo apt install docker-ce
```

**Check that Docker is running**

```docker
sudo systemctl status docker
```

It should give similar output like following - 

```docker
Output
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-04-01 21:30:25 UTC; 22s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 7854 (dockerd)
      Tasks: 7
     Memory: 38.3M
        CPU: 340ms
     CGroup: /system.slice/docker.service
             └─7854 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

**Executing the Docker Command Without Sudo**

If you want to avoid typing `sudo` whenever you run the `docker` command, add your username to the `docker` group

```docker
sudo usermod -aG docker ${USER}
```

**To apply the new group membership, log out of the server and back in, or type the following**

```docker
su - ${USER}
```

**Confirm that your user is now added to the docker group by typing**

```docker
groups
```

**If you need to add a user to the `docker` group that you’re not logged in as, declare that username explicitly using**

```docker
sudo usermod -aG docker username
```