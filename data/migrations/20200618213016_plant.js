exports.up = function (knex) {
    knex.schema.createTable('plant', tb => {
        tb.increments(); //primary key
        tb.string('nickname', 255).notNullable();
        tb.string('species', 255);
        tb.integer('h2O_frequency');
        tb.string('avatar_url');
        tb.boolean('happiness').defaultTo(false);
        tb.date('last_watered_at');
        //foreign key
        tb.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExist('plant');
};