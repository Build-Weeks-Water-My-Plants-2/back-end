const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find() {
    return db('plant');
}

function findById(id) {
    return db('plant').where({
        id: id
    });
}

function add(plant) {
    db('plant').insert(plant)
        .then((ids) => {
            return findById(ids[0]);
        })
        .catch((err) => {
            console.log(err);
        })
}

function update(id, changes) {
    return db('plant')
        .where('id', id)
        .update(changes)
        .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
    return db('plant').where('id', id).del()
}
