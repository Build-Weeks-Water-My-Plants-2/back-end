const db = require('..data/db-config.js');
const {
    get
} = require('../users/user-router');

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
    }).first();
}

function add(plant) {
    db('plant').insert(plant)
        .then((ids) => {
            const [ids] = ids;
            return findById(ids);
        })
        .catch(err) {
            console.log(err)
        }
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