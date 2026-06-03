# Madhan S - Portfolio

## Stack
- **Frontend**: React + Vite, Framer Motion (book page transitions + fade animations)
- **Background**: Canvas neural network (animated nodes + connections)
- **Backend**: Node.js + Express + MongoDB

## Running Locally

### Backend
```bash
cd backend
# Edit .env with your MongoDB URI
npm start
```

### Frontend
```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## MongoDB Setup
- Install MongoDB locally OR use MongoDB Atlas (update `MONGO_URI` in `backend/.env`)
- Contact form submissions are saved to the `portfolio` database, `messages` collection

## Sections
- Hero (typed name animation)
- About
- Skills (all tech categories with tags)
- Experience (internship + open source)
- Projects (4 AI/ML projects)
- Achievements (8 hackathon wins)
- Certifications (7 certs)
- Contact (form → MongoDB)
