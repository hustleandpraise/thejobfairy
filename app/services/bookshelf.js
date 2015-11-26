
var Config = require('../config');

var knex = require('knex')({
    client: 'mysql',
    connection: Config.db
});

module.exports = require('bookshelf')(knex);
