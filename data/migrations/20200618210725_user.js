exports.up = function (knex) {
    knex.schema.createTable('user', tb => {
        tb.increments();
        tb.string('username', 255).notNullable().unique();
        tb.string('password', 128).notNullable();
        tb.string('phone_number', 128);
        tb.string('avatar_url');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExist('user');
};