
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vendors', (tbl) => {
    tbl.increments();
    tbl
        .string('vendor_name');
    tbl
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    tbl
        .string('contact_number', 255);
    tbl
        .string('contact_email', 255);
  })
};

exports.down = function(knex, Promise) {

};
