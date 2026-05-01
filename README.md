# ElectionGuide AI 🗳️

An AI-powered election education platform built with Next.js, Express, Firebase Firestore, BigQuery ML, and Google Cloud.

## Tech Stack
- **Frontend**: Next.js (App Router, TypeScript), Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Cloud & AI**: Google Cloud Run, BigQuery, BigQuery ML, Google Cloud Natural Language API, Gemini API

## Project Structure
```
.
├── frontend/        # Next.js app
├── backend/         # Express API
├── cloud/
│   ├── bigquery/   # SQL schemas & seed data
│   └── ml_models/  # BigQuery ML scripts
├── docker/          # Dockerfiles
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- gcloud CLI authenticated
- Firebase project + service account key

### Backend
```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env.local   # fill in your values
npm install
npm run dev
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=4000
GEMINI_API_KEY=your_gemini_key
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
GCP_PROJECT_ID=election-495012
BIGQUERY_DATASET=election_data
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Deployment
Both services are deployed on Google Cloud Run.
```bash
gcloud run deploy electionguide-backend --source ./backend --region us-central1
gcloud run deploy electionguide-frontend --source ./frontend --region us-central1
```

## License
MIT
