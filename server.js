const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//const authenticate = require('./auth/authenticate.js');
//const authRouter = require('./auth/auth-router.js');
//const userRouter = require('./users/user-router.js');
//const plantRouter = require('./plants/plant-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/auth', authRouter);
// server.use('/users', authenticate, userRouter);
// server.use('/plants', authenticate, plant);

module.exports = server;
