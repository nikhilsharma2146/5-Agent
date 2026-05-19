import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('groq');
  const [useAntigravity, setUseAntigravity] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);

  useEffect(() => {
    const envGeminiKey = (window.STREAMLIT_ENV && window.STREAMLIT_ENV.VITE_GEMINI_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY;
    const localGeminiKey = localStorage.getItem('gemini_api_key');
    if (envGeminiKey && envGeminiKey !== 'your_api_key_here') {
      setGeminiKey(envGeminiKey);
    } else if (localGeminiKey) {
      setGeminiKey(localGeminiKey);
    }

    const envGroqKey = (window.STREAMLIT_ENV && window.STREAMLIT_ENV.VITE_GROQ_API_KEY) || import.meta.env.VITE_GROQ_API_KEY;
    const localGroqKey = localStorage.getItem('groq_api_key');
    if (envGroqKey) {
      setGroqKey(envGroqKey);
    } else if (localGroqKey) {
      setGroqKey(localGroqKey);
    }

    const savedProvider = localStorage.getItem('api_provider') || 'groq';
    setSelectedProvider(savedProvider);
  }, []);

  const handleSaveGeminiKey = (e) => {
    const val = e.target.value;
    setGeminiKey(val);
    localStorage.setItem('gemini_api_key', val);
  };

  const handleSaveGroqKey = (e) => {
    const val = e.target.value;
    setGroqKey(val);
    localStorage.setItem('groq_api_key', val);
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    localStorage.setItem('api_provider', provider);
  };

  const Toggle = ({ active, onChange, color = 'var(--cyan)' }) => (
    <div 
      style={{
        width: '50px',
        height: '26px',
        background: active ? color : 'rgba(255,255,255,0.1)',
        borderRadius: '13px',
        position: 'relative',
        transition: 'background 0.3s',
        boxShadow: active ? `0 0 12px ${color}` : 'none'
      }}
      onClick={onChange}
    >
      <div style={{
        width: '22px',
        height: '22px',
        background: '#fff',
        borderRadius: '50%',
        position: 'absolute',
        top: '2px',
        left: active ? '26px' : '2px',
        transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }} />
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }} className="slide-up">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>System <span className="grad-text">Settings</span></h1>
        <p style={{ color: '#a1a1aa', marginTop: '8px' }}>Configure your AgentVerse environment.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* API Provider Selection */}
        <div className="agent-card" style={{ borderLeft: '4px solid var(--purple)', padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--purple)' }}>AI Provider</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '20px' }}>
            Select which AI provider to use for agent responses.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleProviderChange('groq')}
              style={{
                flex: 1,
                padding: '12px',
                background: selectedProvider === 'groq' ? 'var(--purple)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selectedProvider === 'groq' ? 'var(--purple)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                color: '#fff',
                cursor: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            >
              Groq (Fast)
            </button>
            <button
              onClick={() => handleProviderChange('gemini')}
              style={{
                flex: 1,
                padding: '12px',
                background: selectedProvider === 'gemini' ? 'var(--purple)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${selectedProvider === 'gemini' ? 'var(--purple)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                color: '#fff',
                cursor: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            >
              Gemini
            </button>
          </div>
        </div>

        {/* Groq API Key Card */}
        <div className="agent-card" style={{ borderLeft: '4px solid var(--purple)', padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--purple)' }}>Groq API Key</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '20px' }}>
            Required for agent intelligence. Your key is stored locally in your browser.
          </p>
          <input 
            type="password"
            value={groqKey}
            onChange={handleSaveGroqKey}
            placeholder="gsk_..."
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${selectedProvider === 'groq' ? 'var(--purple)' : 'rgba(255,255,255,0.1)'}`,
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--purple)'}
            onBlur={(e) => e.target.style.borderColor = selectedProvider === 'groq' ? 'var(--purple)' : 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* Gemini API Key Card */}
        <div className="agent-card" style={{ borderLeft: '4px solid var(--cyan)', padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--cyan)' }}>Gemini API Key</h3>
          <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '20px' }}>
            Alternative AI provider. Your key is stored locally in your browser.
          </p>
          <input 
            type="password"
            value={geminiKey}
            onChange={handleSaveGeminiKey}
            placeholder="AIzaSy..."
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${selectedProvider === 'gemini' ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
              cursor: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
            onBlur={(e) => e.target.style.borderColor = selectedProvider === 'gemini' ? 'var(--cyan)' : 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* UI Settings Card */}
        <div className="agent-card" style={{ borderLeft: '4px solid var(--cyan)', padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--cyan)' }}>Interface Preferences</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Antigravity Physics</h4>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Enable floating animations and cursor physics</p>
            </div>
            <Toggle active={useAntigravity} onChange={() => setUseAntigravity(!useAntigravity)} color="var(--cyan)" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Holographic Audio</h4>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Sound effects for clicks, hovers, and messages</p>
            </div>
            <Toggle active={soundEffects} onChange={() => setSoundEffects(!soundEffects)} color="var(--pink)" />
          </div>
        </div>

      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', opacity: 0.6 }}>
        <p className="font-mono" style={{ fontSize: '0.8rem' }}>
          Agent<span className="grad-text">Verse</span> OS v1.0.0
        </p>
      </footer>
    </div>
  );
};

export default Settings;
