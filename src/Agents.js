import plannerMD from '../files/PLANNER_AGENT.md?raw';
import predictionMD from '../files/PREDICTION_AGENT.md?raw';
import medicalMD from '../files/MEDICAL_AGENT.md?raw';
import lawyerMD from '../files/LAWYER_AGENT.md?raw';
import learningMD from '../files/LEARNING_AGENT.md?raw';

export const agents = [
  {
    id: "planner",
    name: "Planner AI",
    role: "Expert productivity coach",
    color: "#0ea5e9",
    gradient: "#0ea5e9, #6366f1",
    floatClass: "float-a",
    capabilities: ["Timetable Creation", "Goal Breakdown", "Smart Scheduling", "Habit Tracking", "Priority Matrix"],
    suggestions: ["Create my weekly schedule", "Help me break down my goals", "Build a morning routine"],
    description: "Your elite AI productivity coach for scheduling, goal breakdown, timetable creation, habit tracking, and priority systems.",
    system: plannerMD
  },
  {
    id: "oracle",
    name: "Oracle AI",
    role: "Futuristic trend analyst",
    color: "#a855f7",
    gradient: "#a855f7, #ec4899",
    floatClass: "float-b",
    capabilities: ["Future Trend Analysis", "Career Roadmap", "Skill Prediction", "Market Insights", "Industry Foresight"],
    suggestions: ["What skills will be in demand in 2027?", "Analyze my career path", "Predict AI industry trends"],
    description: "Your futuristic trend analyst for career paths, skill prediction, market intelligence, and industry foresight.",
    system: predictionMD
  },
  {
    id: "medic",
    name: "Medic AI",
    role: "Health and wellness assistant",
    color: "#10b981",
    gradient: "#10b981, #06b6d4",
    floatClass: "float-c",
    capabilities: ["Wellness Guidance", "Symptom Understanding", "Diet Plans", "Mental Health", "Health Education"],
    suggestions: ["Tips for better sleep", "Explain symptoms of stress", "Create a balanced diet plan"],
    description: "Your compassionate health and wellness assistant for general health info, diet plans, mental health, and symptom awareness.",
    system: medicalMD
  },
  {
    id: "lex",
    name: "Lex AI",
    role: "Legal information assistant",
    color: "#f59e0b",
    gradient: "#f59e0b, #ef4444",
    floatClass: "float-a",
    capabilities: ["Legal Information", "FIR Templates", "Rights Explanation", "Contract Summary", "Legal Research"],
    suggestions: ["Explain tenant rights", "Draft a simple contract", "What is an FIR?"],
    description: "Your legal information assistant for FIR templates, rights explanation, contract summaries, and legal research.",
    system: lawyerMD
  },
  {
    id: "learn",
    name: "Learn AI",
    role: "Adaptive educator",
    color: "#ec4899",
    gradient: "#ec4899, #8b5cf6",
    floatClass: "float-b",
    capabilities: ["Adaptive Teaching", "Coding Tutor", "Quiz Generator", "Exam Preparation", "Concept Explainer"],
    suggestions: ["Teach me Python basics", "Quiz me on history", "Create a study plan for math"],
    description: "Your enthusiastic adaptive educator for coding tuition, quiz generation, concept explanation, and exam prep.",
    system: learningMD
  }
];

