# Rhino

## Notepad stuff

```shell
rm -rf ./dist && mkdir -p ./dist && \
docker container rm -f rhino-wsl && \
docker image rm -f rhino-wsl && \
docker build -t rhino-wsl . && \
docker run -d --name rhino-wsl rhino-wsl:latest && \
docker export rhino-wsl > ./dist/rhino.tar && \
mkdir -p /mnt/c/WSL/Rhino && mkdir -p /mnt/c/WSL/dist && \
mv ./dist/rhino.tar /mnt/c/WSL/dist/rhino.tar
```

```ps
wsl.exe --import Rhino C:\WSL\Rhino C:\WSL\dist\rhino.tar --version 2
rm C:\WSL\dist\rhino.tar
```
