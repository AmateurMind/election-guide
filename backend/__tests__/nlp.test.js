const { handleNlpQuery } = require('../controllers/nlpController');

describe('NLP Query', () => {
  it('should return entities and data for valid query', async () => {
    const req = { body: { query: 'highest turnout region' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    // Mock BigQuery and NLP services
    jest.mock('../services/bigquery');
    jest.mock('@google-cloud/language');

    await handleNlpQuery(req, res, next);

    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid query', async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await handleNlpQuery(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'query is required' });
  });
});