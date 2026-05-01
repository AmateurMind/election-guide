# ElectionGuide AI

![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=flat-square&logo=node.js)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Run-blue?style=flat-square&logo=google-cloud)

ElectionGuide AI is a full-stack election education platform with an AI chat assistant, an interactive timeline, a voting guide, and analytics powered by BigQuery and BigQuery ML.

## Live URLs

| Service     | URL                                                                                                                                | Status      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Frontend UI | [https://electionguide-frontend-746853930624.us-central1.run.app](https://electionguide-frontend-746853930624.us-central1.run.app) | 🟢 Deployed |
| Backend API | [https://electionguide-backend-746853930624.us-central1.run.app](https://electionguide-backend-746853930624.us-central1.run.app)   | 🟢 Deployed |

## Overview

The repository is split into a Next.js frontend and an Express backend:

- `frontend/` - Next.js App Router UI built with TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Recharts.
- `backend/` - Express API with Gemini, Firestore, BigQuery, and Natural Language API integrations.
- `cloud/` - BigQuery schema, seed data, and ML SQL.
- `docker/` - Dockerfiles for container-based deployment.

## Features

- AI chat for election-related questions.
- Interactive election timeline views.
- Step-by-step voting guide content.
- Analytics dashboards with turnout and regional trend data.
- Natural-language query handling for data access.

## Prerequisites

- Node.js 20 or newer.
- npm.
- A Google Cloud project with the required APIs enabled.
- A Firebase service account JSON file for Firestore access.

## Local Setup

Run the backend and frontend in separate terminals.

### Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

The backend starts on `http://localhost:4000` by default.

### Frontend

Create `frontend/.env.local` with the API URL, then install and start the app.

```bash
cd frontend
npm install
npm run dev
```

Example frontend environment value:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

The frontend starts on `http://localhost:3000` by default.

## Environment Variables

### Backend

```bash
PORT=4000
GEMINI_API_KEY=your_key
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
GCP_PROJECT_ID=your_project_id
BIGQUERY_DATASET=election_data
```

### Frontend

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Scripts

### Backend

- `npm run dev` - Start the Express server with nodemon.
- `npm start` - Start the Express server in production mode.
- `npm test` - Run backend tests with Jest.

### Frontend

- `npm run dev` - Start the Next.js dev server.
- `npm run build` - Build the frontend for production.
- `npm start` - Start the production frontend server.
- `npm test` - Run frontend tests with Jest.

## API Endpoints

| Endpoint         | Method | Purpose                                                |
| ---------------- | ------ | ------------------------------------------------------ |
| `/api/chat`      | POST   | Chat with the election assistant                       |
| `/api/timeline`  | GET    | Fetch timeline data                                    |
| `/api/guide`     | GET    | Fetch voting guide content                             |
| `/api/analytics` | GET    | Fetch analytics and ML-driven insights                 |
| `/api/nlp-query` | POST   | Translate a natural-language query into a data request |
| `/health`        | GET    | Health check                                           |

## Testing

```bash
cd backend && npm test
cd frontend && npm test
```

## Deployment

The repo includes Dockerfiles in `docker/` for container-based deployment. For Google Cloud Run, deploy the backend and frontend separately using the corresponding source directories or container images.

## Project Structure

```text
root/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── __tests__/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   └── __tests__/
├── cloud/
│   ├── bigquery/
│   └── ml_models/
├── docker/
└── README.md
```

## Notes

- The backend expects Google Cloud and Firebase credentials before API calls will work.
- If you change the backend URL, update `NEXT_PUBLIC_API_URL` in `frontend/.env.local`.
