const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to madhan_portfolio'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Schemas & Models ---

const projectSchema = new mongoose.Schema({
  title: String,
  stack: [String],
  description: String,
  github: String,
  status: String
});
const Project = mongoose.model('Project', projectSchema);

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  date: String,
  points: [String]
});
const Experience = mongoose.model('Experience', experienceSchema);

const skillGroupSchema = new mongoose.Schema({
  category: String,
  skills: [String]
});
const SkillGroup = mongoose.model('SkillGroup', skillGroupSchema);

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String]
});
const Achievement = mongoose.model('Achievement', achievementSchema);

const certificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: String,
  color: String
});
const Certification = mongoose.model('Certification', certificationSchema);

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// --- Routes ---

app.get('/api/projects', async (req, res) => {
  const data = await Project.find();
  res.json(data);
});

app.get('/api/experience', async (req, res) => {
  const data = await Experience.find();
  res.json(data);
});

app.get('/api/skills', async (req, res) => {
  const data = await SkillGroup.find();
  res.json(data);
});

app.get('/api/achievements', async (req, res) => {
  const data = await Achievement.find();
  res.json(data);
});

app.get('/api/certifications', async (req, res) => {
  const data = await Certification.find();
  res.json(data);
});

app.post('/api/contact', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
