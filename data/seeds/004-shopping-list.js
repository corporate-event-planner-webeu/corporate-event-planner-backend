
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shopping_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('shopping_list').insert([
        {
          item_name: 'Water bottles',
          event_id: 1,
          item_price: 150,
          item_acquired: true
        },
        {
          item_name: 'Company cards',
          event_id: 2,
          item_price: 150,
          item_acquired: true
        },
        {
          item_name: 'Balloons',
          event_id: 3,
          item_price: 150,
          item_acquired: false
        }
      ]);
    });
};
