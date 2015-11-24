
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', function (table) {
        table.increments().primary();
        table.integer('parent').defaultTo(0);
        table.string('title');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
