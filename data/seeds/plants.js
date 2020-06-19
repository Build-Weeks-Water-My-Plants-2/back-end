exports.seed = function (knex) {
  return knex('plant').truncate()
    .then(function () {
      return knex('plant').insert([{
          id: 1,
          nickname: 'snake plant',
          species: 'Dracaena trifasciata',
          h2O_frequency: '3',
          avatar_url: 'plant_img',
          happiness: true,
          last_watered_at: '06/19/2020'
        },
        {
          id: 1,
          nickname: 'Blue Glow',
          species: 'Agave',
          h2O_frequency: '7',
          avatar_url: 'succulent_img',
          last_watered_at: '06/18/2020'
        }
      ]);
    });
};