# Setting up
To setup the project simply run `make setup`

# Scaling up nodes
```
$ docker-compose up --scale chrome=15
# Spawns 15 additional node-chrome and node-firefox instances linked to the hub
```

# Console
To view the selenium hub grid console go to http://DOCKER_MACHINE_IP:4444/grid/console