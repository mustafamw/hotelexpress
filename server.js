const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

import { MongoDB } from './mongodb/mongodb';
import { routes } from './routes/routes';
import { swaggerOption } from './swagger/swagger';

MongoDB.connect();

expressSwagger(swaggerOption);

app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(3000);

