import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load local environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend cross-origin requests
CORS(app)

# Fetch API Keys from environment
GROQ_API_KEY = os.getenv("VITE_GROQ_API_KEY") or os.getenv("GROQ_API_KEY")
GEMINI_API_KEY = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "AgentVerse Secured Backend Core",
        "keys_loaded": {
            "groq": bool(GROQ_API_KEY),
            "gemini": bool(GEMINI_API_KEY)
        }
    })

@app.route("/api/chat", methods=["POST"])
def chat_proxy():
    data = request.json or {}
    messages = data.get("messages", [])
    provider = data.get("provider", "groq")
    model = data.get("model")
    
    if not messages:
        return jsonify({"error": "No messages array provided"}), 400

    if provider == "groq":
        if not GROQ_API_KEY:
            return jsonify({"error": "Server: Groq API Key is not configured."}), 500
            
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        # Use user-specified model or fallback to llama-3.3-70b-versatile
        selected_model = model or "llama-3.3-70b-versatile"
        payload = {
            "model": selected_model,
            "messages": messages,
            "temperature": 0.7
        }
        try:
            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                json=payload,
                headers=headers,
                timeout=30
            )
            return jsonify(response.json()), response.status_code
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"Failed to contact Groq API: {str(e)}"}), 502

    elif provider == "gemini":
        if not GEMINI_API_KEY:
            return jsonify({"error": "Server: Gemini API Key is not configured."}), 500
            
        selected_model = model or "gemini-2.5-flash"
        
        # Convert OpenAI-style system instruction + messages array into Gemini contents structure
        system_instruction = None
        contents = []
        
        for msg in messages:
            role_type = msg.get("role")
            content_text = msg.get("content", "")
            
            if role_type == "system":
                system_instruction = {"parts": [{"text": content_text}]}
            else:
                role = "user" if role_type == "user" else "model"
                contents.append({
                    "role": role,
                    "parts": [{"text": content_text}]
                })
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{selected_model}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": contents,
            "generationConfig": {
                "temperature": 0.7
            }
        }
        if system_instruction:
            payload["systemInstruction"] = system_instruction
            
        try:
            response = requests.post(url, json=payload, timeout=30)
            response_data = response.json()
            
            # Map Gemini format back to standard OpenAI format for frontend integration
            if "candidates" in response_data and response_data["candidates"]:
                text_content = response_data["candidates"][0]["content"]["parts"][0]["text"]
                return jsonify({
                    "choices": [{
                        "message": {
                            "role": "assistant",
                            "content": text_content
                        }
                    }]
                })
            else:
                return jsonify({"error": "Gemini API did not return any candidates", "details": response_data}), 502
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"Failed to contact Gemini API: {str(e)}"}), 502
            
    else:
        return jsonify({"error": f"Unsupported API provider: {provider}"}), 400

if __name__ == "__main__":
    # Host on all interfaces on port 5000
    app.run(host="0.0.0.0", port=5000, debug=True)
