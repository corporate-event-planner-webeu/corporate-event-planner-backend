
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vendors').del()
    .then(function () {
      // Inserts seed entries
      return knex('vendors').insert([
        {
          vendor_name: 'Luca Lotz',
          event_id: 1,
          contact_number: '01152147245',
          contact_email: 'luca@testvendor.com'
        },
        {
          vendor_name: 'Antonia Frame',
          event_id: 2,
          contact_number: '01152147245',
          contact_email: 'antonia@testvendor.com'
        },
        {
          vendor_name: 'Mateo Mile',
          event_id: 3,
          contact_number: '01152147245',
          contact_email: 'mateo@testvendor.com'
        },
      ]);
    });
};
