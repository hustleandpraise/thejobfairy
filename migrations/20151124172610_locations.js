
exports.up = function(knex, Promise) {
    return knex.schema.createTable('locations', function (table) {
        table.increments().primary();
        table.integer('parent').defaultTo(0);
        table.string('title');
        table.string('slug');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('locations')
};
