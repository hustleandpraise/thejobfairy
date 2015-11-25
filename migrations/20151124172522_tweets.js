
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tweets', function (table) {
        table.increments().primary();
        table.integer('user_id');
        table.bigInteger('tweet_id');
        table.text('text');
        table.date('tweet_created_at');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tweets')
};
