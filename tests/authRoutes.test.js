const bcrypt = require('bcryptjs');
const server = require('../api/server');
const request = require('supertest');
const db = require('../data/dbConfig');

describe('authRoutes', () => {

  let token;
  beforeAll(async () => {
    const testUser = { email: 'test1@test.com',
            first_name: 'test1',
            password: bcrypt.hashSync('123456', 10),
            company: 'test1',
            role: 'admin' };
    await request(server).post('/api/register').send(testUser);
    const res = await request(server).post('/api/auth/login').send({ email: 'test1@test.com', password: '123456' });
    token = JSON.parse(res.text).token;
  });

  afterAll(async () => {
    db.destroy();
  });

  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('POST, /api/auth/register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should return status code 201 Created when request is successful', async () => {
      const user = { email: 'test1@test.com',
        first_name: 'test1',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin'  };
      const response = await request(server).post('/api/auth/register').send(user);

      expect(response.status).toBe(201);
    });
    it('should return the newly created user when request is successful', async () => {
      const newUser = { email: 'test1@test.com',
        first_name: 'test1',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin'  };
      const res = await request(server).post('/api/auth/register').send(newUser);
      const user = await JSON.parse(res.text);
      expect(user.id).toBe(1);
      expect(user.email).toBe(newUser.email);
    });
    it('should return status code 400 Bad Request if email is missing', async () => {
      const newUser = { email: '',
        first_name: 'test1',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin'  };
      const response = await request(server).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if password is missing', async () => {
      const newUser = { email: 'test1@test.com',
        first_name: 'test1',
        password: '',
        company: 'test1',
        role: 'admin'   };
      const response = await request(server).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return status code 400 Bad Request if first_name is missing', async () => {
      const newUser = { email: 'test1@test.com',
        first_name: '',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin'   };
      const response = await request(server).post('/api/auth/register').send(newUser);
      expect(response.status).toBe(400);
    });
    it('should return JSON', async () => {
      const newUser = { email: 'test1@test.com',
        first_name: 'test1',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin'   };
      const res = await request(server).post('/api/auth/register').send(newUser);
      expect(res.type).toBe('application/json');
    });
    it('should return errorMessage: "This email has already been taken" if the name is already in the database', async () => {
      const newUser = { email: 'test1@test.com',
        first_name: 'test1',
        password: bcrypt.hashSync('123456', 10),
        company: 'test1',
        role: 'admin' };
      await request(server).post('/api/auth/register').send(newUser);

      await request(server).post('/api/auth/register').send(newUser)
          .then((response) => {
            expect(response.body.errorMessage).toEqual('This email has already been taken.');
          });
    });
  });
});
