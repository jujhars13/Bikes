setup:
	- cd integration && npm install && cd ..

integration:
	- cd integration && DOCKER_MACHINE_IP=192.168.99.100 node index.js && cd ..