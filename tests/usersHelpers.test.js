const db = require('../data/dbConfig');
const Users = require('../api/helpers/usersHelpers');


describe('usersHelpers', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  afterEach(async () => {
    await db('users').truncate();
  });
  it('should add users to the database', async () => {
    await db('users').insert({
      email: 'test1@test.com',
      first_name: 'test1',
      password: '123456',
      company: 'test3',
      role: 'admin'
    });
    await db('users').insert({
      email: 'test2@test.com',
      first_name: 'test2',
      password: '123456',
      company: 'test2',
      role: 'admin'
    });
    await db('users').insert({
      email: 'test3@test.com',
      first_name: 'test3',
      password: '123456',
      company: 'test3',
      role: 'admin'
    });

    const users = await Users.getUsers();
    expect(users).toHaveLength(3);
  });
  it('should return a list of all users in the database', async () => {
    const users = await Users.getUsers();
    expect(users).toHaveLength(0);
  });
  it('should return a given user from the database by its ID', async () => {
    await db('users').insert({
      email: 'test1@test.com',
      first_name: 'test1',
      password: '123456',
      company: 'test3',
      role: 'admin'
    });
    const result = await Users.getUserById(1);
    expect(result.first_name).toEqual('test1');
    expect(result.id).toEqual(1);
  });
  it('should delete a given user record from the the database', async () => {
    await db('users').insert({
      email: 'test6@test.com',
      first_name: 'test1',
      password: '123456',
      company: 'test3',
      role: 'admin'
    });
    await db('users').insert({
      email: 'test7@test.com',
      first_name: 'test2',
      password: '123456',
      company: 'test2',
      role: 'admin'
    });
    const result = await Users.deleteUser(1);
    const row = await db('users');
    expect(row).toHaveLength(1);
  });
});
