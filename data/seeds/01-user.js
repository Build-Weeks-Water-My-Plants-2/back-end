exports.seed = function (knex) {
  return knex('user').truncate()
    .then(function () {
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