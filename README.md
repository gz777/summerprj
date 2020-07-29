# summerprj
The repo is designated for Knowglet project.

Installation procedure:
1. Pre-requisits
   Python 3.7+
   Docker, Docker-Compose
   git

2. Shell commands
   # clone project to local
   $git clone https://github.com/gz777/summerprj.git
   # browse to knoogle-client folder
   $cd summerprj/knoogle-client
   # build and bring front-end container up
   $docker-compose build && docker-compose up
   # browse to knoogle-server folder
   $cd ../knoogle-server
   # build and bring back-end container up
   $docker-compose build && docker-compose up
      
