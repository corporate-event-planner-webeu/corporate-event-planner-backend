
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          event_title: 'Monthly Meetup',
          event_description: 'A monthly meetup',
          event_date: '22-09-2019',
          event_time: '16:00 PM',
          attendees: 'Michael Morrison',
          budget: 1600,
          user_id: 1,
        },
        {
          event_title: 'Tech Conference',
          event_description: 'a great tech conference',
          event_date: '25-08-2019',
          event_time: '10:00 PM',
          attendees: 'Michael Morrison',
          budget: 600,
          user_id: 2,
        },
        {
          event_title: 'Negotiations Skills',
          event_description: 'a session on negotiation',
          event_date: '20-08-2019',
          event_time: '12:00 PM',
          attendees: 'Michael Morrison',
          budget: 600,
          user_id: 3,
        }
      ]);
    });
};
