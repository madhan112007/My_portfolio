const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to seed database'))
  .catch(err => console.error(err));

const Project = mongoose.model('Project', new mongoose.Schema({ title: String, stack: [String], description: String, github: String, status: String }));
const Experience = mongoose.model('Experience', new mongoose.Schema({ company: String, role: String, date: String, points: [String] }));
const SkillGroup = mongoose.model('SkillGroup', new mongoose.Schema({ category: String, skills: [String] }));
const Achievement = mongoose.model('Achievement', new mongoose.Schema({ title: String, description: String, tags: [String] }));
const Certification = mongoose.model('Certification', new mongoose.Schema({ name: String, issuer: String, date: String, color: String }));

const projects = [
  { title: "AI-Powered Parametric Insurance Platform", stack: ["FastAPI", "Flutter", "XGBoost", "AWS", "Gemini 2.5"], description: "Zero-touch insurance platform for gig workers with automated disruption detection and fraud prevention. Deployed on AWS with Razorpay payouts and Firebase FCM.", github: "https://github.com/madhan112007", status: "Live" },
  { title: "AI-Powered Precision Agriculture System", stack: ["PyTorch", "YOLOv8", "ViT", "HuggingFace"], description: "Cloud-based crop analysis pipeline combining ViT, YOLOv8, and ResNet18 for crop identification, ripeness detection, and plant health assessment.", status: "Live" },
  { title: "Accident Hotspot Prediction", stack: ["Python", "XGBoost", "Scikit-learn", "Folium"], description: "Geospatial ML pipeline to forecast accident-prone zones with interactive hotspot maps adopted for urban-planning decisions.", github: "https://github.com/madhan112007", status: "Live" },
  { title: "AI Image Classification (CNN/TensorFlow)", stack: ["TensorFlow", "Keras", "OpenCV"], description: "CNN achieving 90%+ accuracy on multi-class image datasets with data augmentation and systematic hyperparameter tuning.", github: "https://github.com/madhan112007", status: "Live" }
];

const experiences = [
  { company: "Sri Eshwar College of Engineering", role: "Technical Event Organizer", date: "2025 – Present", points: ["Leading and coordinating technical events during national-level cultural fests and symposiums", "Designing competitive coding challenges and technical workshops to foster innovation among participants", "Managing event logistics and ensuring smooth execution of high-engagement technical competitions"] },
  { company: "Independent", role: "Open Source Contributor", date: "Mar 2026 – Present", points: ["Joplin (React Native/TypeScript): Fixed Android deep-link crash for 10M+ users", "ESP-Website (Django/Python): Fixed missing static asset bug restoring site functionality"] },
  { company: "Sri Eshwar College of Engineering", role: "Student Mentor", date: "Nov 2025 – Mar 2026", points: ["Mentoring 1st-year students to enhance their communication skills and overcome language barriers", "Sharing academic experiences and guiding juniors in building a strong foundation in AI & Data Science", "Assisting students with aptitude preparation and resolving technical doubts in programming and core concepts"] },
  { company: "Aptitude Guru Hem", role: "Full Stack Developer Intern", date: "Dec 2025", points: ["Built MERN-stack farm-to-table e-commerce platform with real-time inventory sync", "Implemented 'Recipe-to-Cart' feature cutting cart-building time by ~60%", "Optimised Redux checkout pipeline, reducing UI re-renders by ~35%"] }
];

const skills = [
  { category: "AI / ML", skills: ["Python", "TensorFlow", "Keras", "PyTorch", "Scikit-learn", "YOLOv8", "ViT", "XGBoost", "OpenCV", "HuggingFace", "Reinforcement Learning", "Computer Vision"] },
  { category: "Languages", skills: ["Python", "C/C++", "Java", "SQL", "Dart"] },
  { category: "Web / Full Stack", skills: ["FastAPI", "Flutter", "React", "Node.js", "MongoDB", "PostgreSQL", "MySQL", "Neo4j", "Redis", "Celery"] },
  { category: "Cloud & DevOps", skills: ["AWS (EC2/RDS)", "Docker", "Git", "GitHub", "Linux", "Google Colab"] },
  { category: "Robotics & IoT", skills: ["ESP32", "Raspberry Pi", "Embedded C", "CoppeliaSim", "Blynk", "Sensor Integration"] }
];

const achievements = [
  { title: "Top 5 Finalist — GuideWire DevTrails Hackathon 2026", description: "Pitched prototype at DevSummit 2026 Bangalore among 4,000+ teams / 18,000+ participants.", tags: ["Hackathon", "Top 5", "GuideWire"] },
  { title: "PROJECTOPIA Winners — MECHNOTRON 2K26", description: "First place in project expo at national-level technical symposium.", tags: ["Winner", "National"] },
  { title: "Paper Presentation Winners — CRPTRA 2K26", description: "Best paper award at national-level research conference.", tags: ["Research", "Winner"] },
  { title: "Semi-Finalist — e-Yantra Robotics Competition (eYRC 2025), IIT Bombay", description: "Top 30 teams nationally, completed Task 5 of 6 across 8-month competition.", tags: ["IIT Bombay", "Robotics", "Top 30"] },
  { title: "National Finalist — PEC Hacks 3.0", description: "Top 50 out of 4,000+ teams; won ORKES track prize.", tags: ["Hackathon", "Top 50", "National"] },
  { title: "Finalist — SAP Hackfest 2025", description: "Top 20 after 5 elimination rounds among 1,000+ teams.", tags: ["SAP", "Top 20"] },
  { title: "1st Place — Createathon, SECE", description: "Won intra-college 1-day hackathon.", tags: ["Winner", "Hackathon"] },
  { title: "4th Runner-Up — Selfie Hackathon 2.0, SECE", description: "Placed 4th among 100+ teams.", tags: ["Hackathon"] }
];

const certifications = [
  { name: "Design Thinking – A Primer", issuer: "NPTEL", date: "Feb 2026", color: "red" },
  { name: "Database Management Systems", issuer: "HackerRank", date: "Nov 2025", color: "emerald" },
  { name: "Foundations of Java", issuer: "Oracle", date: "Aug 2025", color: "brightRed" },
  { name: "Python Programming", issuer: "HackerRank", date: "Aug 2025", color: "emerald" },
  { name: "Programming in Python (89%)", issuer: "NPTEL", date: "May 2025", color: "red" },
  { name: "Robotics and AI", issuer: "Great Learning", date: "Feb 2025", color: "blue" },
  { name: "C and C++ Programming", issuer: "IIT Bombay", date: "Dec 2024", color: "navy" }
];

const seed = async () => {
  await Project.deleteMany({});
  await Project.insertMany(projects);

  await Experience.deleteMany({});
  await Experience.insertMany(experiences);

  await SkillGroup.deleteMany({});
  await SkillGroup.insertMany(skills);

  await Achievement.deleteMany({});
  await Achievement.insertMany(achievements);

  await Certification.deleteMany({});
  await Certification.insertMany(certifications);

  console.log('Database seeded!');
  process.exit();
};

seed();
