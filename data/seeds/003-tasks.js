
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_name: 'reserve seats',
          event_id: 1,
          task_completed: true,
        },
        {
          task_name: 'order food',
          event_id: 2,
          task_completed: false,
        },
        {
          task_name: 'print marketing materials',
          event_id: 3,
          task_completed: true,
        },
      ]);
    });
};
