/**
 * One-time seed script — run manually:
 *   node scripts/seedFirestore.js
 *
 * Populates the `timeline` and `guide` Firestore collections.
 */

require("dotenv").config({ path: "../.env" });
const admin = require("firebase-admin");
const path = require("path");

admin.initializeApp({
  credential: admin.credential.cert(
    path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  ),
});

const db = admin.firestore();

const timelineEvents = [
  {
    date: "2024-01-15",
    title: "Voter Registration Opens",
    description:
      "Citizens can begin registering to vote online or at local offices.",
    icon: "register",
  },
  {
    date: "2024-03-01",
    title: "Primary Election Season Begins",
    description: "Political parties hold primaries to select their candidates.",
    icon: "primary",
  },
  {
    date: "2024-07-15",
    title: "Voter Registration Deadline",
    description: "Last day to register to vote before the general election.",
    icon: "deadline",
  },
  {
    date: "2024-10-20",
    title: "Early Voting Starts",
    description:
      "Eligible voters can cast ballots early at designated polling stations.",
    icon: "early",
  },
  {
    date: "2024-11-05",
    title: "General Election Day",
    description: "The main election day — polls open from 7 AM to 8 PM.",
    icon: "election",
  },
  {
    date: "2024-11-20",
    title: "Results Certification",
    description: "Official vote counts are certified by election authorities.",
    icon: "results",
  },
  {
    date: "2025-01-20",
    title: "Inauguration Day",
    description: "Elected officials are sworn into office.",
    icon: "inauguration",
  },
];

const guideSteps = [
  {
    step: 1,
    title: "Check Your Eligibility",
    description:
      "Ensure you meet age, citizenship, and residency requirements to vote.",
    tip: "Most places require you to be 18+ and a citizen.",
  },
  {
    step: 2,
    title: "Register to Vote",
    description:
      "Sign up with your local election authority online, by mail, or in person.",
    tip: "Register early — deadlines are usually 15–30 days before the election.",
  },
  {
    step: 3,
    title: "Find Your Polling Place",
    description:
      "Locate your assigned polling station using your registration details.",
    tip: "Your polling place may change between elections.",
  },
  {
    step: 4,
    title: "Know the Candidates",
    description:
      "Research the candidates and ballot measures before election day.",
    tip: "Look for official voter guides from your local government.",
  },
  {
    step: 5,
    title: "Cast Your Vote",
    description:
      "Visit your polling station on election day with valid ID and cast your ballot.",
    tip: "Polls are usually open 7 AM – 8 PM. Lines at midday are usually shorter.",
  },
  {
    step: 6,
    title: "Track Your Ballot",
    description:
      "If voting by mail, track your ballot status on your state's election website.",
    tip: "Request your mail ballot early to allow time for delivery.",
  },
];

async function seed() {
  console.log("🌱 Seeding Firestore...");

  const timelineBatch = db.batch();
  timelineEvents.forEach((event) => {
    const ref = db.collection("timeline").doc();
    timelineBatch.set(ref, event);
  });
  await timelineBatch.commit();
  console.log(`✅ Seeded ${timelineEvents.length} timeline events`);

  const guideBatch = db.batch();
  guideSteps.forEach((step) => {
    const ref = db.collection("guide").doc();
    guideBatch.set(ref, step);
  });
  await guideBatch.commit();
  console.log(`✅ Seeded ${guideSteps.length} guide steps`);

  console.log("🎉 Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
