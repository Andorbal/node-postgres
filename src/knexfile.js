var Configuration = (function () {
    function Configuration() {
        this.client = 'postgresql';
        this.connection = {
            host: 'localhost',
            database: 'node-postgres-dev',
            user: 'postgres',
            password: 'mysecretpassword'
        };
        this.pool = {
            min: 2,
            max: 10
        };
        this.migrations = {
            tableName: 'knex_migrations'
        };
    }
    return Configuration;
})();
exports.Configuration = Configuration;
