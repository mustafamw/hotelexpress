# Web Development API Task

Prerequisite - Must be installed if you're not using a Docker: 
- MongoDB 
- Node

## Available Scripts
In the project directory, you can run:

If you are using a Docker Container, run the command below:
>docker-compose up

If you are installing a locally, run the command below:

>npm start

The config file ("config/config.js") which contains all the configuration for the application. "npm start" by default uses the development environment.

Will install the package.json and then runs the app. When the app is ready then the Browser will open up the swagger API Docs automatically otherwise visit http://localhost:3000/api-docs/ *unless the config file ("config/config.js") have been changed then refer to the configuration* :
```
{
    'application': {
        'domain': 'localhost',
        'port': 3000
    },
    'swagger': {
        'path': '/api-docs'
    }
}
```

Docker Repository:
https://cloud.docker.com/u/mustalio/repository/docker/mustalio/hotelexpress

Github:
https://github.com/webmanic/hotelexpress

Live Link:
http://hushtech.co.uk/api-docs/#/

