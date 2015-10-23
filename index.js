var config = require('./knexfile');
var knex = require('knex')(config.development);

knex
  .truncate('pets')
  .then(function() {
    return knex('users').del();
  })
  .then(function() {
    return knex.insert({name: 'John Doe'}, 'id').into('users');
  })
  .then(function(ids) {
    return knex.insert(
        [{name: "Fluffers", type: "cat", user_id: ids[0]},
        {name: "Spot", type: "dog", user_id: ids[0]}])
      .into('pets');
  })
  .then(function() {
    return knex.select('users.name as userName', 'pets.type', 'pets.name')
      .from('users')
      .innerJoin('pets', 'users.id', 'pets.user_id');
  })
  .then(function(rows) {
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i]);
    }

    return;
  })
  .then(function() {
    knex.destroy();
  })
  .catch(function(err) {
    console.error(err);
    knex.destroy();
  });
