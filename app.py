import os
import re
import base64
import streamlit as st
import streamlit.components.v1 as components
from dotenv import load_dotenv

# Load local environment variables
load_dotenv()

# Set Streamlit Page Info
st.set_page_config(
    page_title="AgentVerse",
    page_icon="🧬",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom styles to hide standard Streamlit padding and make the iframe fullscreen
st.markdown("""
<style>
    /* Fullscreen iframe styles */
    iframe {
        width: 100% !important;
        height: 100vh !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .stApp {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background-color: #020408 !important;
    }
    .block-container {
        padding: 0 !important;
        max-width: 100% !important;
        height: 100vh !important;
    }
    header {
        display: none !important;
    }
    footer {
        display: none !important;
    }
    #MainMenu {
        display: none !important;
    }
    div[data-testid="stDecoration"] {
        display: none !important;
    }
</style>
""", unsafe_allow_html=True)

def get_base64_data_uri(filepath, mime_type="image/png"):
    if not os.path.exists(filepath):
        return ""
    with open(filepath, "rb") as f:
        data = f.read()
    encoded = base64.b64encode(data).decode("utf-8")
    return f"data:{mime_type};base64,{encoded}"

def get_compiled_html():
    dist_dir = os.path.join(os.path.dirname(__file__), "dist")
    index_path = os.path.join(dist_dir, "index.html")
    
    if not os.path.exists(index_path):
        return """
        <div style="color: #ef4444; font-family: sans-serif; padding: 40px; text-align: center;">
            <h2>React App Not Built</h2>
            <p>Please run <code>npm run build</code> to compile the frontend files before launching Streamlit.</p>
        </div>
        """
        
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Find referenced JS bundle dynamically
    assets_dir = os.path.join(dist_dir, "assets")
    js_filename = None
    if os.path.exists(assets_dir):
        for file in os.listdir(assets_dir):
            if file.endswith(".js") and file.startswith("index-"):
                js_filename = file
                break
                
    if js_filename:
        js_path = os.path.join(assets_dir, js_filename)
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f.read()
            
        # Base64 encode the heavy public images
        logo_base64 = get_base64_data_uri("public/logo.png", "image/png")
        robot_base64 = get_base64_data_uri("public/robot.png", "image/png")
        favicon_base64 = get_base64_data_uri("public/favicon.svg", "image/svg+xml")
        
        # Replace image links in JS code to inline data URIs using all quote and backtick variants
        if logo_base64:
            js_content = js_content.replace('"/logo.png"', f'"{logo_base64}"')
            js_content = js_content.replace("'/logo.png'", f"'{logo_base64}'")
            js_content = js_content.replace('`/logo.png`', f'`{logo_base64}`')
            js_content = js_content.replace('"/public/logo.png"', f'"{logo_base64}"')
            
        if robot_base64:
            js_content = js_content.replace('"/robot.png"', f'"{robot_base64}"')
            js_content = js_content.replace("'/robot.png'", f"'{robot_base64}'")
            js_content = js_content.replace('`/robot.png`', f'`{robot_base64}`')
            js_content = js_content.replace('"/public/robot.png"', f'"{robot_base64}"')
            js_content = js_content.replace('url(/robot.png)', f'url({robot_base64})')
            js_content = js_content.replace('url("/robot.png")', f'url({robot_base64})')
            js_content = js_content.replace("url('/robot.png')", f"url({robot_base64})")
            js_content = js_content.replace('url(`/robot.png`)', f'url({robot_base64})')
            
        if favicon_base64:
            js_content = js_content.replace('"/favicon.svg"', f'"{favicon_base64}"')
            js_content = js_content.replace("'/favicon.svg'", f"'{favicon_base64}'")
            js_content = js_content.replace('`/favicon.svg`', f'`{favicon_base64}`')
            js_content = js_content.replace('"/public/favicon.svg"', f'"{favicon_base64}"')
            
        # Replace scripts tags with inline js script tag safely without regex escaping errors
        script_pattern = r'<script[^>]+src=["\']/assets/[^"\']+["\'][^>]*></script>'
        match = re.search(script_pattern, html)
        if match:
            script_tag = match.group(0)
            inline_script = f'<script type="module">{js_content}</script>'
            html = html.replace(script_tag, inline_script)
            
        # Replace icon links in outer HTML head
        if logo_base64:
            html = html.replace('href="/logo.png"', f'href="{logo_base64}"')
        if favicon_base64:
            html = html.replace('href="/favicon.svg"', f'href="{favicon_base64}"')
        
    # Get dynamic API Keys from secrets or env
    groq_key = os.getenv("VITE_GROQ_API_KEY") or os.getenv("GROQ_API_KEY")
    gemini_key = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")
    
    # Try reading from streamlit secrets
    try:
        if not groq_key and "GROQ_API_KEY" in st.secrets:
            groq_key = st.secrets["GROQ_API_KEY"]
        if not gemini_key and "GEMINI_API_KEY" in st.secrets:
            gemini_key = st.secrets["GEMINI_API_KEY"]
    except Exception:
        pass
        
    # Inject API configuration header script at the very top of <head>
    env_script = f"""
    <script>
        window.STREAMLIT_ENV = {{
            VITE_GROQ_API_KEY: "{groq_key or ''}",
            VITE_GEMINI_API_KEY: "{gemini_key or ''}"
        }};
    </script>
    """
    html = html.replace("<head>", f"<head>{env_script}")
    
    return html

# Load and display the complete self-contained React app
html_content = get_compiled_html()
components.html(html_content, height=1080, scrolling=False)
