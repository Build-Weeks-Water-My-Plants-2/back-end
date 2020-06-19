exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([{
          id: 1,
          username: 'rowValue1',
          password: '123456'
        },
        {
          id: 2,
          username: 'rowValue2',
          password: '123456'
        }
      ]);
    });
};