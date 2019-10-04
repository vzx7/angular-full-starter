[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Angular fullstack starter

This project is a boilerplate for web development built on top of [Nest.js](https://nestjs.com/), [GraphQL](https://graphql.org/), [MongoDB](https://www.mongodb.com/) and [Angular](https://angular.io/). For design and styles we used [Angular Material](https://material.angular.io/) and [SCSS](https://sass-lang.com/). You can simply build an application based on this starter.

## Getting Started
### Requirements
  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v6.9 or newer
  * Text editor or IDE pre-configured with Angular/TSlint
### Directory Layout

Before you start, take a moment to see how the project structure looks like:
```
├── /node_modules/                    # 3rd-party libraries and utilities
├── /client/                          # Client
│   ├── /src/                         # The source code of the application
│       ├── /app/                     # Angular application
│       ├── /assets/                  # Static files
│       ├── /environments/            # Environment variables
│       ├── /browserslist             # File is currently used by autoprefixer to adjust CSS to support the below specified browsers
│       ├── /main.js                  # Startup script
│       └── ...                       # Other regular files
├── /servers/                         # Servers for API and static
│       ├── /api/                     # GraphQL server schema and data models (api)
│       ├── /prod-static/             # The server for static files
│       ├── /scripts/                 # Scripts for CLI
│       ├── /docker-compose.yml       # Docker-compose file
│       ├── /docker.development.env   # Settings for development
│       └── /README.md                # Configurations for client-side and server-side bundles
├── package.json                      # The list of 3rd party libraries and utilities
└── ...                               # Other regular files
```

### Quick Start
#### 1. Get the starter

You can start by cloning the latest version of Angular fullstack starter on your
local machine by running:

```shell
$ git clone -b master --single-branch https://github.com/vzx7/angular-full-starter.git MyApp
$ cd MyApp
```
#### 2. Install MongoDB

You can use the Docker or install it locally or use a remote server.

##### 2.1 If you use Docker

[Install](https://docs.docker.com/compose/install/) docker-compose.

```shell
$ cd MyApp/servers/scripts/
$ ./mongo_up.sh
```
##### 2.1 If you use MongoDB localy

[Install](https://www.mongodb.com/download-center) MongoDB and run it on port 27017 (default).

#### 3. Dependency Installation

```shell
$ cd MyApp
$ npm install
```

#### 4. Run the project for developmen
##### 4.1 Start server.

```shell
$ cd MyApp
$ npm run server:dev
```
##### 4.2 Start client.
```shell
$ cd MyApp
$ npm run client:dev
```

#### 5. Build the project in production

```shell
$ cd MyApp
$ npm run build
```
#### 6. Run the project in production

```shell
$ cd MyApp
$ npm run start:prod
```

## Features

This boilerplate is the basis for the project and implements CRUD and file uploads. The plans are to make an authorization module, while this is in progress. We invite you to cooperation, it will be cool if someone implements authorization and will improve this starter.

