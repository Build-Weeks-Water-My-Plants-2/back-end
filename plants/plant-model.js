const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find(userId) {
    return db('plant').where({
        user_id: userId
    });
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
