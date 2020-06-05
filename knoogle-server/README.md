# Knoogle Server

[![Build Status](https://travis-ci.com/jerryturcios08/knoogle-server.svg?token=PEjeVcsaSqBvcdxUqKgr&branch=master)](https://travis-ci.com/jerryturcios08/knoogle-server)

This repository contains the code needed for Knoogle's backend web service.
The code found in this repository serves as a REST API for Knoogle.

## Set up development environment using Docker

The following are a list of prerequisites

1. At least Docker 18.09.2
2. At least Git 2.21.0

To grab the code for this project, run the terminal command below.

```
$ git clone https://github.com/jerryturcios08/knoogle-server.git
```

Go into the folder and run the following command.

```
$ docker-compose build
$ docker-compose up
```

A new Docker container will be created. The container will install the pip
packages needed for the project. Once the process finishes, a new environemnt
will start for development. To stop the container, use CONTROL+C.
