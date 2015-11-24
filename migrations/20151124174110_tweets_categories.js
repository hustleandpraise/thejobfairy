
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories_tweets', function (table) {
        table.increments().primary();
        table.integer('tweet_id').unsigned().references('tweets.id');
        table.integer('category_id').unsigned().references('categories.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories_tweets')
};
