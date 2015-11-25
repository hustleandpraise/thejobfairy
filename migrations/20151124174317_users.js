
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments().primary();
        table.bigInteger('twitter_id');
        table.string('username');
        table.string('avatar');
        table.boolean('verified');
        table.string('email');
        table.string('password');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
