/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./knexfile.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as Knex from 'knex';
import { Config } from './knexfile';

var knex: Knex;

var knex = Knex(Config.dev);

let app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    console.log("Requested...");
    knex.select('id', 'name')
        .from('users')
        .then(rows => {
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            }

            res.render("hello", { title: "Hi!", message: "Hello Chopper...", users: rows });
            return;
        });
});

app.get('/details/:id', (req, res) => {
    console.log("Requested...");
    knex.select('users.name as userName', 'pets.type', 'pets.name')
        .from('users')
        .leftJoin('pets', 'users.id', 'pets.user_id')
        .where({"users.id": req.params.id})
        .then(rows => {
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]);
            }

            res.render("details", { userName: rows[0].userName, pets: rows });
            return;
        });
});


app.get('/insert', (req, res) => res.render("insert"));

app.post('/insert', (req, res) => {
    knex.insert({ name: req.body.userName }, 'id').into('users')
        .then(ids => {
            return knex.insert(
                [{ name: "Fluffers", type: "cat", user_id: ids[0] },
                    { name: "Spot", type: "dog", user_id: ids[0] }])
                .into('pets');
        })
        .then(_ => {
            res.redirect('/');
        });
});

function startServer() {
    let server = app.listen(3000, function() {
        let host = server.address().address;
        let port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });

    // Handle a SIGINT because Node won't stop when running in Docker
    // without it
    process.on('SIGINT', function() {
        knex.destroy();
        server.close();
        process.exit(0);
    });
}

function createConnection() {
    knex = Knex(Config.dev);
    knex.migrate.latest()
        .then(_ => startServer())
        .catch(err => {
            console.error("Error migrating...")
            knex.destroy();

            setTimeout(createConnection, 2000);
        });
}

createConnection();
