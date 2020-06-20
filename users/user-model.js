const db = require('../data/db-config.js');

function find() {
  return db('user');
}

function findBy(filter) {
  return db('user').where(filter).orderBy('id');
}


function findById(id) {
  return db('user').where({id: id}).first();
}

async function add(user) {
  try {
    const [id] = await db("user").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}

async function update(userId, userData) {
  try {
    await db("user").where({id: userId}).update(userData);
    return findById(userId);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update
}
