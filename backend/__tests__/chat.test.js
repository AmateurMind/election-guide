const request = require('supertest');

// Mock Gemini before app is loaded
jest.mock('../src/services/gemini', () => ({
  chat: jest.fn().mockResolvedValue('The election process involves...'),
}));

const app = require('../src/app');

describe('POST /api/chat', () => {
  it('should return 200 with a reply', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Explain election process' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('reply');
    expect(typeof res.body.reply).toBe('string');
  });

  it('should return 400 when message is missing', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when message is empty string', async () => {
    const res = await request(app).post('/api/chat').send({ message: '   ' });
    expect(res.statusCode).toBe(400);
  });
});
