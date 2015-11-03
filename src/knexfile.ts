/// <reference path="../typings/tsd.d.ts" />

import * as Knex from 'knex';

export class Config {
    static dev: Knex.Config = {
        client: 'postgresql',
        connection: {
            host: 'db',
            database: 'node_postgres',
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD
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
