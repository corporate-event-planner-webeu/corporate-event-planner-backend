
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'lana@testemail.com',
          first_name: 'lana',
          last_name: 'lang',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          company: 'Best Tech Co',
          role: 'admin'
        },
        {
          email: 'anton@testemail.com',
          first_name: 'anton',
          last_name: 'kent',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          company: 'Marketing Gods',
          role: 'admin',
        },
        {
          email: 'jasmine@testemail.com',
          first_name: 'jasmine',
          last_name: 'lane',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          company: 'Life Coaching Inc',
          role: 'admin',
        },
      ]);
    });
};
