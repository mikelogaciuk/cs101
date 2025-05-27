# WSL from Docker

You can create a **WSL distribution** using a **Dockerfile**; the process involves building a Docker container, exporting its filesystem, and then importing it into WSL.

## How so?

### Steps to Pack a WSL Distro Using Dockerfile

1. **Create a Dockerfile**

   - Define the base image and necessary packages:
     ```dockerfile
     FROM ubuntu:latest
     RUN apt update && apt install -y sudo curl vim
     ```

2. **Build the Docker Image**

   - Run the following command:
     ```bash
     docker build -t my-wsl-distro .
     ```

3. **Run the Container**

   - Start a container from the image:
     ```bash
     docker run -d --name wsl_container my-wsl-distro
     ```

4. **Export the Container Filesystem**

   - Save the container as a tar file:
     ```bash
     docker export wsl_container > my-wsl-distro.tar
     ```

5. **Import the Tar File into WSL**

   - Use the WSL import command:
     ```powershell
     wsl --import MyWSLDistro C:\WSL\MyWSLDistro my-wsl-distro.tar
     ```

6. **Verify Installation**
   - Check if the new WSL distro is available:
     ```powershell
     wsl -l -v
     ```

This method allows you to **customize** your WSL environment using Docker before importing it into WSL. You can also automate the process using scripts for easier deployment.

You can also check out [this guide](https://readmedium.com/create-your-own-wsl-distro-using-docker-226e8c9dbffe) for more details!

## After party

Great! Now that you've successfully imported your custom distro into WSL2, here are some key steps to get started:

**1. Start Your WSL Distro**
Run the following command in PowerShell or Command Prompt to launch Rhino Linux:
```powershell
wsl -d RhinoLinux
```

**2. Update Your System**
Once inside the WSL session, update your packages:
```bash
sudo apt update && sudo apt upgrade -y
```

**3. Install Essential Packages**
You may want to install some useful tools:
```bash
sudo apt install curl wget git vim htop
```

**4. Configure WSL for Better Performance**

- Enable systemd (if supported) and custom user:

  ```bash
  sudo nano /etc/wsl.conf
  ```
  Add:
  ```ini
  [user]
  default=username

  [boot]
  systemd=true
  ```

  Save and restart WSL:
  ```powershell
  wsl --shutdown
  ```

**5. Set Up Docker for WSL2**

If you plan to use Docker, install and configure it inside WSL:
```bash
sudo apt install docker.io
```

Then, you can pull the official Rhino Linux image:
```bash
docker pull ghcr.io/rhino-linux/docker:latest
```

And start a container:
```bash
docker run -it --net=host --privileged ghcr.io/rhino-linux/docker:latest bash
```

**6. Customize Your Environment**

You can:
- Set up aliases in `~/.bashrc`
- Configure your shell with `oh-my-zsh`
- Install development tools like Python, Node.js, or Rust

You're ready to dive in! Let me know if you need help with anything specific 🚀
