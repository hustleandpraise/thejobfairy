
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags_tweets', function (table) {
        table.increments().primary();
        table.integer('tweet_id').unsigned().references('tweets.id');
        table.integer('tag_id').unsigned().references('tags.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tags_tweets')
};
