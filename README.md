# Telegraph

## Installation & usage

### Installation

- Clone or download the repo.
- Open terminal and navigate to telegraph folder.

### Usage

Run `bash _scripts/startDev.sh`

- starts client, api & db services
- runs db migrations
- seeds db for development
- serves client on localhost:8080
- serves api on localhost:3000

Run `bash _scripts/startTest.sh`

- starts api & db services
- runs db migrations
- attaches to server container and triggers full test run
- no ports mapped to local host

Run `bash _scripts/startCoverageTest.sh`

- starts api & db services
- runs db migrations
- attaches to server container and triggers full test run coverage
- no ports mapped to local host

Run `bash _scripts/teardown.sh`

- stop all running services
- removes containers
- removes volumes

## Changelog

- Users can write a post with a title, name and message
- Users can view all posts
- Users can search for anything by entering a query in the search bar
- Deployed client-side on Vercel: https://somethingstupid.vercel.app/
- Deployed api and database on Heroku: https://something-stupid-api.herokuapp.com/
