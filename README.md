# Telemetry Test App

This is a simple node express server will generate a JSON file with today's top Reddit post alongside opentelemetry metadata.
Once the server has started, a developer can run GET requests to CRUD these files, and view the telemetry in a local Zipkin server.

## Project Requirements
- Node v16+
- NPM v8+
- Docker
- Mac/Linux/WSL2


## Setup

To install and run the servers for the first time, run `make all` at the project root. 
  - This will install all project dependencies, start an Express server at `localhost:8080` and start the Zipkin telemetry server at `localhost:9411`.

- Once you have the `zipkin` docker container running, you can restart the project with `make project` instead.

-- For a more piecemeal setup, you can run the following: 

`npm i //installs dependencies`

`docker run --rm -d -p 9411:9411 --name zipkin openzipkin/zipkin //starts zipkin docker container`

`npm start //starts server`


## Usage

- `npm start` runs the local Express server at `localhost:8080`
- Zipkin is available at `localhost:9411`

### Endpoints
    
- `/` => Will generate a JSON file at `$PROJECT_ROOT/logs` that contains the top Reddit post of the day alongside Telemetry Span Data
- `/delete/:fileId` => will delete a JSON file by its timestamp ID (filename without `.json`) 
- `/update/:fileId/:subreddit` => will set the file's subreddit top post data to the inputted subreddit.
- `/logs` => will display a simple directory of available JSON files.


