const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const morgan = require('morgan');

//Values
const PORT = 3030;

//Middlewares
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));
app.use(express.urlencoded( { limit: '50mb', extended: true } ));
app.use(express.json());
app.use(morgan('dev'));

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//Endpoints
app.get('/', (request, response) => {
    response.status(200).send("Server - Up and Running");
});

app.use('/user', require('./routes/User'));

//Server running
server.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`);
});