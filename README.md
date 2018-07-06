# Bikes Tester Exercise

![on my mf bike](app/favicon.png)

## UI Tests

To run UI test do the following steps:

1. Install [Node JS](https://nodejs.org/en/)
2. Install Protractor using command
```bash
npm install -g protractor
```
3. Install and Start webdriver manager
```bash
webdriver-manager update
webdriver-manager start
```
4. Load npm dependencies from `/app` directory (allows to create report)
```bash
npm install
```
5. Run tests using protractor command from `/app` directory, where `{application_url}` is url to served application
```bash
protractor uitest/conf.js --baseUrl="http://{application_url}"
```

By default it will run test within Chrome and Firefox browsers.
You can find report in `/app/tmp/report`.
If you need to change browser settings (`conf.js`), please check out [Protractor](https://www.protractortest.org) documentation.

## Your Challenge

We need you to create an integration test suite to test that the application herein functions correctly and renders according to the user stories.

### Steps

1. Fork this project
2. Make some reasonable assumptions and document
3. Write your integration test suite (as much as you see fit)
4. Document profusely
5. *OPTIONAL Bonus Points* If you have time, attempt to get some bonus points (see below for bonus assessment criteria)

To submit your assessment please send us your GitHub repository URL. You will get bonus points if you send it to us before you've actually finished and work on it iteratively (like real life), your thought processes are of greater interest to us.

**Good Luck!**

## The Scenario

One of our dev team has developed this wonderful Bikes application in [Angular.js](https://angularjs.org/) to meet our customer's requirements.
It reads a blob of [json data](app/bikes.json) and renders a listing of all the bikes according to the following user story:

### The User story

As a user, assuming I have access to a modern web browser (Chrome) with an internet connection and I am visiting the page

- I would like to see a list/grid of bikes based on `/app/bikes.json`
- I would like to see a the name, an image, a description and the class for each bike
- I would like to be able to sort the bikes into a custom order based on class
- I would like my custom order to be saved and not change when I refresh the page
- A JSON object with all the relevant bike data is available at https://jujhar.com/bikes.json; feel free to call that URL directly from your page or host it on your server if you're using one.

In addition the developer has also created some BDD based unit tests using [Jasmine](https://jasmine.github.io/) which can be found in `app/test`
See [getting-the-application-running](https://github.com/jujhars13/test-testers#getting-the-application-running-locally) section to see how to run the test suite.

## Assessment Criteria

Your test suite will be assessed on the following criteria with scoring in order of importance:

1. approach and style
2. code organisation, commenting and documentation
3. use of git
4. how easily the test suite can be easily reproduced and ran on any machine

Again, we care more about criteria 1 and 2 as opposed to 3 and 4, so make sure you devote your time accordingly.

### Bonus Points

To qualify for extra bonus points please also attempt the following if you have time:

1. Sharing your GitHub repo with us early and working on this task iteratively
2. Modify the existing unit test suite + mock data in `app/test/` to satisfy the following BDD criteria:
    - `when we filter by "class: gravel" and "gears: 21" we get one result`

## Assumptions

- Please list any assumptions or scope limitations that you may make
- Organise your test suite and directory structure as you see fit
- Feel free to use any languages and libraries/frameworks

## Getting the Application Running locally
This is a single page static web application and can be ran in a myriad of ways:

### Docker

This application can be run simply using [Docker](https://www.docker.com/).

```bash

docker run -it -v ${PWD}/app:/usr/share/nginx/html:ro -p 80:80 nginx:1.13
```

Then browse to [http://localhost]() to see the application running.
You can also run the [Jasmine](https://jasmine.github.io/) based unit test suite by browsing to [http://localhost/test]() 

### Python

```bash
cd app
python -m SimpleHTTPServer
```

### Local Webserver

It can also be run by simply serving the `app/` directory from any web server on your machine if you're not so familiar with containers.

## Screenshot

Screenshot of application running locally
![bikes application screenshot](https://raw.githubusercontent.com/jujhars13/test-testers/master/screenshot.png)
