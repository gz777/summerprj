# Knowglet Project
The repo is designated for Knowglet project.

## Installation procedure:
### 1. Prerequisites
   - Python 3.7+
   - Docker, Docker-Compose
   - git

### 2. Shell commands
   > clone the repo to local
   ```shell
   $git clone https://github.com/gz777/summerprj.git
   ``` 
   > browse to knoogle-client folder
   ```shell
   $cd summerprj/knoogle-client
   ```
   > build and bring the front-end container up
   ```shell
   $docker-compose build
   $docker-compose up
   ```
   or
   ```shell
   $docker-compose up --build
   ```
   > browse to knoogle-server folder
   ```shell
   $cd ../knoogle-server
   ```
   > build and bring the back-end container up
   ```shell
   $docker-compose build
   $docker-compose up
   ```
   or
   ```shell
   $docker-compose up --build
   ```
 
