
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments().primary();
        table.string('title');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tags')
};
