
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl
      .string('email', 255)
      .notNullable()
      .unique();
    tbl
        .string('first_name', 255)
        .notNullable();
    tbl
        .string('last_name', 255).defaultTo('')
        .notNullable();
    tbl
      .string('password', 255)
      .notNullable();
    tbl
      .string('company', 255)
      .notNullable();
    tbl
      .string('role', 255)
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
