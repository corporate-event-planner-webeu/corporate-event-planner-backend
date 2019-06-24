
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', (tbl) => {
    tbl.increments();
    tbl
        .string('task_name', 255)
        .notNullable();
    tbl
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    tbl
        .boolean('task_completed').defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tasks');
};
