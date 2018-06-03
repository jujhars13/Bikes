setup:
	- cd integration && npm install && cd ..

start:
	- docker-compose up --scale chrome=5

test:
	- cd integration && npm run test && cd ..