/// <reference path="../typings/tsd.d.ts" />

import {  Config } from './knexfile';
import * as Knex from 'knex';

let k = Knex(Config['dev']);

k('pets')
  .truncate()
  .then(() => k('users').del())
  .then(() => k.insert({name: 'John Doe'}, 'id').into('users'))
  .then(ids => {
    return k.insert(
        [{name: "Fluffers", type: "cat", user_id: ids[0]},
        {name: "Spot", type: "dog", user_id: ids[0]}])
      .into('pets');
  })
  .then(() => {
    return k.select('users.name as userName', 'pets.type', 'pets.name')
      .from('users')
      .innerJoin('pets', 'users.id', 'pets.user_id');
  })
  .then(rows =>  {
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i]);
    }

    return;
  })
  .then(() => k.destroy())
  .catch(function(err) {
    console.error(err);
    k.destroy();
  });
