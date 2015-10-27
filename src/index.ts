/// <reference path="../typings/tsd.d.ts" />

import {  Config } from './knexfile';
import * as Knex from 'knex';

let knex = Knex(Config['dev']);

knex('pets')
  .truncate()
  .then(() => knex('users').del())
  .then(() => knex.insert({name: 'John Doe'}, 'id').into('users'))
  .then(ids => {
    return knex.insert(
        [{name: "Fluffers", type: "cat", user_id: ids[0]},
        {name: "Spot", type: "dog", user_id: ids[0]}])
      .into('pets');
  })
  .then(() => {
    return knex.select('users.name as userName', 'pets.type', 'pets.name')
      .from('users')
      .innerJoin('pets', 'users.id', 'pets.user_id');
  })
  .then(rows =>  {
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i]);
    }

    return;
  })
  .then(() => knex.destroy())
  .catch(function(err) {
    console.error(err);
    knex.destroy();
  });
