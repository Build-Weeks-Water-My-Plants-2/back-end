const knex = require('knex');

const knexConfig = require('../knexfile.js');

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

module.exports = knex(knexConfig[ENVIRONMENT]);
