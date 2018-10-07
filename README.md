## Machinable

Quickly define API resources for production usage or prototyping.

### Build with docker
```bash
$ make build
```

### Start with docker
```bash
$ make up
```

```bash
# specify port without Makefile
$ docker run -d --restart=always -p 127.0.0.1:5000:80 anothernick/machinable-ui:0.1.0
```

### Local dev
```bash
$ yarn install
$ yarn start
```

### Other commands
```bash
# rebuild image without cache
$ make rebuild

# stop running container
$ make stop

# remove running container
$ make remove

# stop and remove container, images, and volumes
$ make clean
```
