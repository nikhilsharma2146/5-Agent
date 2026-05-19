import streamlit as st
import os
import requests
from dotenv import load_dotenv

# Load local environment variables
load_dotenv()

# Streamlit Page Configuration
st.set_page_config(
    page_title="AgentVerse",
    page_icon="🧬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Cyberpunk & Sci-Fi Theme Styles
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Share+Tech+Mono&display=swap');
    
    .stApp {
        background: linear-gradient(135deg, #020408 0%, #0b0f19 100%) !important;
        color: #e4e4e7 !important;
    }
    
    section[data-testid="stSidebar"] {
        background-color: #030712 !important;
        border-right: 1px solid rgba(34, 211, 238, 0.15) !important;
    }
    
    .font-hero {
        font-family: 'Orbitron', sans-serif !important;
        letter-spacing: 0.05em;
    }
    
    .font-mono {
        font-family: 'Share Tech Mono', monospace !important;
    }
    
    /* Telemetry wrapper cards */
    .telemetry-card {
        border: 1px solid rgba(34, 211, 238, 0.2);
        background: rgba(2, 4, 8, 0.6);
        padding: 20px;
        border-radius: 8px;
        position: relative;
        margin-bottom: 20px;
    }
    
    .telemetry-card::before {
        content: "";
        position: absolute;
        top: 6px; left: 6px; width: 6px; height: 6px;
        border-top: 2px solid #22d3ee; border-left: 2px solid #22d3ee;
    }
    
    .capability-tag {
        display: inline-block;
        background: rgba(34, 211, 238, 0.08);
        border: 1px solid rgba(34, 211, 238, 0.2);
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 0.75rem;
        margin: 4px;
        color: #22d3ee;
        font-family: 'Share Tech Mono', monospace;
    }
    
    .pulse-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #22d3ee;
        border-radius: 50%;
        box-shadow: 0 0 8px #22d3ee;
        margin-right: 8px;
    }
</style>
""", unsafe_allow_html=True)

# ----------------- AGENT DEFINITIONS -----------------
AGENTS = {
    "planner": {
        "name": "Planner AI",
        "role": "Expert productivity coach",
        "color": "#0ea5e9",
        "description": "Your elite AI productivity coach for scheduling, goal breakdown, timetable creation, habit tracking, and priority systems.",
        "capabilities": ["Timetable Creation", "Goal Breakdown", "Smart Scheduling", "Habit Tracking", "Priority Matrix"],
        "suggestions": ["Create my weekly schedule", "Help me break down my goals", "Build a morning routine"],
        "file": "PLANNER_AGENT.md"
    },
    "oracle": {
        "name": "Oracle AI",
        "role": "Futuristic trend analyst",
        "color": "#a855f7",
        "description": "Your futuristic trend analyst for career paths, skill prediction, market intelligence, and industry foresight.",
        "capabilities": ["Future Trend Analysis", "Career Roadmap", "Skill Prediction", "Market Insights", "Industry Foresight"],
        "suggestions": ["What skills will be in demand in 2027?", "Analyze my career path", "Predict AI industry trends"],
        "file": "PREDICTION_AGENT.md"
    },
    "medic": {
        "name": "Medic AI",
        "role": "Health and wellness assistant",
        "color": "#10b981",
        "description": "Your compassionate health and wellness assistant for general health info, diet plans, mental health, and symptom awareness.",
        "capabilities": ["Wellness Guidance", "Symptom Understanding", "Diet Plans", "Mental Health", "Health Education"],
        "suggestions": ["Tips for better sleep", "Explain symptoms of stress", "Create a balanced diet plan"],
        "file": "MEDICAL_AGENT.md"
    },
    "lex": {
        "name": "Lex AI",
        "role": "Legal information assistant",
        "color": "#f59e0b",
        "description": "Your legal information assistant for FIR templates, rights explanation, contract summaries, and legal research.",
        "capabilities": ["Legal Information", "FIR Templates", "Rights Explanation", "Contract Summary", "Legal Research"],
        "suggestions": ["Explain tenant rights", "Draft a simple contract", "What is an FIR?"],
        "file": "LAWYER_AGENT.md"
    },
    "learn": {
        "name": "Learn AI",
        "role": "Adaptive educator",
        "color": "#ec4899",
        "description": "Your enthusiastic adaptive educator for coding tuition, quiz generation, concept explanation, and exam prep.",
        "capabilities": ["Adaptive Teaching", "Coding Tutor", "Quiz Generator", "Exam Preparation", "Concept Explainer"],
        "suggestions": ["Teach me Python basics", "Quiz me on history", "Create a study plan for math"],
        "file": "LEARNING_AGENT.md"
    }
}

# Load system instructions from file helper
def get_system_prompt(agent_key):
    filename = AGENTS[agent_key]["file"]
    path = os.path.join("files", filename)
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                # Strip YAML frontmatter if exists
                if content.startswith("---"):
                    parts = content.split("---", 2)
                    if len(parts) >= 3:
                        content = parts[2]
                return content.strip()
        except Exception:
            pass
    return AGENTS[agent_key]["description"]

# ----------------- SIDEBAR INTERFACE -----------------
st.sidebar.markdown(
    '<h2 class="font-hero" style="color: #fff; margin-bottom: 0;">🧬 AGENTVERSE</h2>'
    '<p class="font-mono" style="font-size: 0.75rem; color: #a1a1aa; margin-top:0;">SYSTEM INTERFACE v1.0.0</p>',
    unsafe_allow_html=True
)

st.sidebar.markdown("---")

# Agent Module Selection
selected_agent_key = st.sidebar.selectbox(
    "SELECT ACTIVE MODULE",
    options=list(AGENTS.keys()),
    format_func=lambda k: f"[{k.upper()}] // {AGENTS[k]['name']}"
)
agent_data = AGENTS[selected_agent_key]

# Dynamic details display
st.sidebar.markdown(
    f'<div class="telemetry-card">'
    f'<span class="font-mono" style="color: {agent_data["color"]}; font-size: 0.75rem;">[MODULE_{selected_agent_key.upper()}]</span>'
    f'<h4 class="font-hero" style="margin: 4px 0 8px 0; color: #fff;">{agent_data["name"]}</h4>'
    f'<p style="font-size: 0.85rem; color: #d4d4d8; line-height: 1.4;">{agent_data["description"]}</p>'
    f'</div>',
    unsafe_allow_html=True
)

# Capabilities
st.sidebar.markdown('<span class="font-mono" style="font-size: 0.75rem; color: #a1a1aa;">CAPABILITIES</span>', unsafe_allow_html=True)
cap_html = "".join([f'<span class="capability-tag">{c}</span>' for c in agent_data["capabilities"]])
st.sidebar.markdown(f'<div>{cap_html}</div>', unsafe_allow_html=True)

st.sidebar.markdown("---")

# API Keys Configuration Panel
st.sidebar.markdown('<span class="font-mono" style="font-size: 0.75rem; color: #a1a1aa;">KEY CONFIGURATION</span>', unsafe_allow_html=True)

# Select API Provider
provider = st.sidebar.selectbox("API PROVIDER", ["Groq", "Gemini"])

# Get keys from system secrets or local environment variables
sys_groq = os.getenv("VITE_GROQ_API_KEY") or os.getenv("GROQ_API_KEY")
sys_gemini = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")

try:
    if not sys_groq and "GROQ_API_KEY" in st.secrets:
        sys_groq = st.secrets["GROQ_API_KEY"]
    if not sys_gemini and "GEMINI_API_KEY" in st.secrets:
        sys_gemini = st.secrets["GEMINI_API_KEY"]
except Exception:
    pass

user_key = st.sidebar.text_input(
    f"ENTER CUSTOM {provider.upper()} API KEY",
    type="password",
    help="Leave blank to use pre-configured system keys"
)

# Determine final API Key to use
active_key = user_key if user_key else (sys_groq if provider == "Groq" else sys_gemini)

# ----------------- MAIN CHAT INTERFACE -----------------
# Header
col_logo, col_title = st.columns([1, 12])
with col_title:
    st.markdown(
        f'<h1 class="font-hero" style="margin-bottom: 0;">Agent<span style="color: #a855f7;">Verse</span></h1>'
        f'<p class="font-mono" style="color: #a1a1aa; margin-top: 4px;">'
        f'<span class="pulse-dot"></span>Active Session // {agent_data["name"]} • {agent_data["role"]}'
        f'</p>',
        unsafe_allow_html=True
    )

# Messages History State
if "messages" not in st.session_state:
    st.session_state.messages = []
if "current_agent" not in st.session_state:
    st.session_state.current_agent = selected_agent_key

# Reset chat history if agent changes
if st.session_state.current_agent != selected_agent_key:
    st.session_state.messages = []
    st.session_state.current_agent = selected_agent_key

# Render Chat History
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Trigger API Completion
def call_llm(messages_list):
    if not active_key:
        return f"Error: No API key found for {provider}. Please enter your key in the sidebar configuration."
    
    system_prompt = get_system_prompt(selected_agent_key)
    formatted_messages = [{"role": "system", "content": system_prompt}] + messages_list

    if provider == "Groq":
        headers = {
            "Authorization": f"Bearer {active_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "llama-3.3-70b-versatile",
            "messages": formatted_messages,
            "temperature": 0.7
        }
        try:
            res = requests.post("https://api.groq.com/openai/v1/chat/completions", json=payload, headers=headers, timeout=30)
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"]
            else:
                return f"Groq Error ({res.status_code}): {res.text}"
        except Exception as e:
            return f"Error connecting to Groq: {str(e)}"
            
    elif provider == "Gemini":
        contents = []
        system_instruction = None
        for m in formatted_messages:
            if m["role"] == "system":
                system_instruction = {"parts": [{"text": m["content"]}]}
            else:
                role = "user" if m["role"] == "user" else "model"
                contents.append({
                    "role": role,
                    "parts": [{"text": m["content"]}]
                })
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={active_key}"
        payload = {
            "contents": contents,
            "generationConfig": {"temperature": 0.7}
        }
        if system_instruction:
            payload["systemInstruction"] = system_instruction
            
        try:
            res = requests.post(url, json=payload, timeout=30)
            if res.status_code == 200:
                res_data = res.json()
                if "candidates" in res_data and res_data["candidates"]:
                    return res_data["candidates"][0]["content"]["parts"][0]["text"]
                return f"Gemini payload issue: {res_data}"
            else:
                return f"Gemini Error ({res.status_code}): {res.text}"
        except Exception as e:
            return f"Error connecting to Gemini: {str(e)}"

# Input handling
user_query = st.chat_input(f"Transmit message to {agent_data['name']}...")

# Handle suggestions click
st.markdown('<p class="font-mono" style="font-size: 0.8rem; color: #71717a; margin-bottom: 4px;">SUGGESTIONS</p>', unsafe_allow_html=True)
col_sug1, col_sug2, col_sug3 = st.columns(3)
suggestion_clicked = None
for i, sug in enumerate(agent_data["suggestions"]):
    col = [col_sug1, col_sug2, col_sug3][i]
    if col.button(sug, key=f"sug_btn_{i}", use_container_width=True):
        suggestion_clicked = sug

# Process new input
active_input = user_query or suggestion_clicked

if active_input:
    # Display user query
    st.session_state.messages.append({"role": "user", "content": active_input})
    with st.chat_message("user"):
        st.markdown(active_input)
        
    # Get and render assistant response
    with st.chat_message("assistant"):
        with st.spinner(f"{agent_data['name']} is computing response..."):
            api_history = [{"role": m["role"], "content": m["content"]} for m in st.session_state.messages]
            assistant_response = call_llm(api_history)
            st.markdown(assistant_response)
            st.session_state.messages.append({"role": "assistant", "content": assistant_response})
            # Force UI reload to draw clickable elements
            st.rerun()
