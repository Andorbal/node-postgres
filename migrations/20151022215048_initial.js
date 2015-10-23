
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments();
      table.string('name', 100).notNullable();
      table.date('birth_date')
      table.timestamps();
    })
    .createTable('pets', function (table) {
      table.increments();
      table.string('name', 50).notNullable();
      table.string('type', 20).notNullable();
      table.integer('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('pets')
    .dropTable('users');
};
