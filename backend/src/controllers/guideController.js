const { getFirestore } = require('../services/firestore');

/**
 * GET /api/guide
 * Returns voting guide steps, optionally filtered by ?search=keyword
 */
async function getGuide(req, res, next) {
  try {
    const db = getFirestore();
    const snapshot = await db
      .collection('guide')
      .orderBy('step', 'asc')
      .get();

    let steps = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const { search } = req.query;
    if (search) {
      const q = search.toLowerCase();
      steps = steps.filter(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
      );
    }

    res.json({ steps });
  } catch (err) {
    next(err);
  }
}

module.exports = { getGuide };
