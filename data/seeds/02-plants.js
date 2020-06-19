exports.seed = function (knex) {
  return knex('plant').truncate()
    .then(function () {
      return knex('plant').insert([{
          nickname: 'snake plant',
          species: 'Dracaena trifasciata',
          h2O_frequency: 3,
          avatar_url: 'plant_img',
          happiness: true,
          last_watered_at: '06/19/2020',
          user_id: 1
        },
        {
          nickname: 'Blue Glow',
          species: 'Agave',
          h2O_frequency: 7,
          avatar_url: 'succulent_img',
          happiness: true,
          last_watered_at: '06/18/2020',
          user_id: 2
        }
      ]);
    });
};