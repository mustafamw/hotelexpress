const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

import { MongoDB } from './mongodb/mongodb';
import { routes } from './routes/routes';

MongoDB.connect();

app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

app.listen(3000);

