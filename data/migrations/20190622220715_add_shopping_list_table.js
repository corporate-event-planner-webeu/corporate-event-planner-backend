
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_list', (tbl) => {
    tbl.increments();
    tbl
        .string('item_name', 255);
    tbl
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    tbl
        .integer('item_price');
    tbl
        .boolean('item_acquired').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping_list');
};
