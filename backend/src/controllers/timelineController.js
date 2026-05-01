const { getFirestore } = require("../services/firestore");

/**
 * GET /api/timeline
 * Returns election timeline events ordered by date.
 */
async function getTimeline(req, res, next) {
  try {
    const db = getFirestore();
    const snapshot = await db
      .collection("timeline")
      .orderBy("date", "asc")
      .get();

    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTimeline };
