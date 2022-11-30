const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const mockReview = {
  stars: 1,
  detail: 'absolute shit',
};

describe('review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  const registerAndLogin = async (userProps = {}) => {
    const password = userProps.password ?? mockUser.password;
    const agent = request.agent(app);
    const user = await UserService.create({ ...mockUser, ...userProps });
    const { email } = user;
    await agent.post('/api/v1/users/sessions').send({ email, password });
    return [agent, user];
  };
  it('/reviews/:id deletes a review', async () => {
    const [agent] = await registerAndLogin();
    const postResp = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send(mockReview);
    console.log('body', postResp.body);
    const resp = await agent.delete('/api/v1/reviews/4');
    expect(resp.status).toBe(200);

    const reviewResp = await agent.get('/api/v1/reviews/4');
    expect(reviewResp.status).toBe(404);
  });
});
