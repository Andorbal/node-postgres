
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', table => {
      table.increments();
      table.string('name', 100).notNullable();
      table.date('birth_date')
      table.timestamps();
    })
    .createTable('pets', table => {
      table.increments();
      table.string('name', 50).notNullable();
      table.string('type', 20).notNullable();
      table.integer('user_id').references('id').inTable('users');
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('pets')
    .dropTable('users');
};
