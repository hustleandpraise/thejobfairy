
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tweets', function (table) {
        table.increments().primary();
        table.integer('user_id');
        table.string('text');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tweets')
};
