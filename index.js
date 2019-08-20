const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const createMiddleware = require('swagger-express-middleware');
const opn = require('opn');

import { MongoDB } from './mongodb/mongodb';
import { routes } from './routes/routes';
import { config } from './config/config';

const mongoDB = new MongoDB();
mongoDB.connect();

createMiddleware('./swagger/swagger.json', app, function(err, middleware) {

    app.use(middleware.metadata());
    app.use(middleware.parseRequest());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use('/api/v1', routes);
    
    // Error handler to display the validation error as HTML
    app.use(function(err, req, res, next) {
        res.status(err.status);
        res.send({message: err.message});
    });

    app.listen(config.application.port,() => {
        // opens the url in the default browser 
        opn(`${config.application.domain + config.swagger.path}`);
    });
});

