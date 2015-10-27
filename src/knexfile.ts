/// <reference path="../typings/tsd.d.ts" />

import * as Knex from 'knex';

export class Config {
  static dev : Knex.Config = {
    client: 'postgresql',
    connection: {
        host: 'localhost',
        database: 'node-postgres-dev',
        user: 'postgres',
        password: 'mysecretpassword'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
  };
}

/*

let config = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'node-postgres-dev',
      user:     'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'node-postgres-staging',
      user:     'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'node-postgres-production',
      user:     'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

exports class Foo {

}

export config;

*/
