var knexfile_1 = require('./knexfile');
var knex = require('knex');
var k = knex(new knexfile_1.Configuration());
k('pets')
    .truncate()
    .then(function () { return k('users').del(); })
    .then(function () { return k.insert({ name: 'John Doe' }, 'id').into('users'); })
    .then(function (ids) {
    return k.insert([{ name: "Fluffers", type: "cat", user_id: ids[0] },
        { name: "Spot", type: "dog", user_id: ids[0] }])
        .into('pets');
})
    .then(function () {
    return k.select('users.name as userName', 'pets.type', 'pets.name')
        .from('users')
        .innerJoin('pets', 'users.id', 'pets.user_id');
})
    .then(function (rows) {
    for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);
    }
    return;
})
    .then(function () { return k.destroy(); })
    .catch(function (err) {
    console.error(err);
    k.destroy();
});
