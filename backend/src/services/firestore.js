const admin = require("firebase-admin");
const path = require("path");

let db;

function getFirestore() {
  if (!db) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS),
        ),
      });
    }
    db = admin.firestore();
  }
  return db;
}

module.exports = { getFirestore };
