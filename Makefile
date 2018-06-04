build:
	-	cd integration && docker build -t cucumber .

setup:
	- cd integration && npm install && cd ..

start:
	- docker-compose up --scale chrome=5