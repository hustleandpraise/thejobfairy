
exports.up = function(knex, Promise) {
    return knex.schema.createTable('locations_tweets', function (table) {
        table.increments().primary();
        table.integer('tweet_id').unsigned().references('tweets.id');
        table.integer('location_id').unsigned().references('locations.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('locations_tweets')
};
