const request = require('supertest');

// Mock Firestore
jest.mock('../src/services/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          docs: [
            { id: 'ev1', data: () => ({ date: '2024-11-05', title: 'Election Day', description: 'Main election day', icon: 'election' }) },
            { id: 'ev2', data: () => ({ date: '2024-01-15', title: 'Registration Opens', description: 'Register to vote', icon: 'register' }) },
          ],
        }),
      })),
    })),
  })),
}));

const app = require('../src/app');

describe('GET /api/timeline', () => {
  it('should return 200 with events array', async () => {
    const res = await request(app).get('/api/timeline');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('events');
    expect(Array.isArray(res.body.events)).toBe(true);
    expect(res.body.events.length).toBeGreaterThan(0);
  });

  it('each event should have required fields', async () => {
    const res = await request(app).get('/api/timeline');
    const event = res.body.events[0];
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('date');
    expect(event).toHaveProperty('title');
  });
});
