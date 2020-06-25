const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticated = require('./auth/authenticated-middleware.js');
// const authorized = require('./auth/authorized-middleware.js');
const authRouter = require('./auth/auth-router.js');
const userRouter = require('./users/user-router.js');
const plantRouter = require('./plants/plant-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', authenticated, userRouter);
server.use('/plants', authenticated, plantRouter);


module.exports = server;
