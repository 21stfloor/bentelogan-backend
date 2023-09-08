const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser'); // Import body-parser

app.use(bodyParser.json());
app.use('/api', routes);



app.listen(3000)
