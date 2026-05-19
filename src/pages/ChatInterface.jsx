import React, { useState, useEffect, useRef } from 'react';
import { agents } from '../Agents';
import Orb from '../components/Orb';

const renderMarkdown = (text) => {
  if (!text) return "";
  
  // Split into lines
  const lines = text.split('\n');
  let html = [];
  let inList = false;
  let inCodeBlock = false;
  let inTable = false;
  let tableHeaders = null;
  let tableRows = [];

  const parseInline = (str) => {
    return str
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`(.*?)`/g, '<code style="font-family: var(--font-mono); background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: var(--cyan); border: 1px solid rgba(255,255,255,0.05)">$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code block
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        html.push('</pre></div>');
        inCodeBlock = false;
      } else {
        const lang = line.slice(3).trim() || 'code';
        html.push(`<div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 12px 0; overflow: hidden;"><div style="background: rgba(255,255,255,0.02); padding: 6px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-family: var(--font-mono); font-size: 0.75rem; color: #a1a1aa; display: flex; justify-content: space-between;"><span>${lang}</span></div><pre style="padding: 16px; font-family: var(--font-mono); font-size: 0.9rem; overflow-x: auto; margin: 0; color: #e4e4e7;">`);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      html.push(line.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n');
      continue;
    }

    // Handle tables
    if (line.trim().startsWith('|')) {
      // It's a table line
      const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // Check if it is a separator line (e.g. |---|---|)
      const isSeparator = cells.every(c => /^:-*|-*:-*|-*:$/.test(c) || c === '');
      
      if (isSeparator) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      if (inTable) {
        // Render the collected table
        let tableHtml = '<div style="overflow-x: auto; margin: 16px 0; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;"><table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">';
        
        if (tableHeaders) {
          tableHtml += '<thead style="background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.1);"><tr>';
          tableHeaders.forEach(th => {
            tableHtml += `<th style="padding: 12px 16px; font-weight: 600; color: var(--cyan);">${parseInline(th)}</th>`;
          });
          tableHtml += '</tr></thead>';
        }
        
        tableHtml += '<tbody>';
        tableRows.forEach(row => {
          tableHtml += '<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s;">';
          row.forEach(cell => {
            tableHtml += `<td style="padding: 12px 16px; color: #d4d4d8;">${parseInline(cell)}</td>`;
          });
          tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table></div>';
        
        html.push(tableHtml);
        
        inTable = false;
        tableHeaders = null;
        tableRows = [];
      }
    }

    // Handle lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        html.push('<ul style="margin: 12px 0 12px 24px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">');
        inList = true;
      }
      const itemContent = line.trim().slice(2);
      html.push(`<li style="color: #d4d4d8;">${parseInline(itemContent)}</li>`);
      continue;
    } else if (/^\d+\.\s/.test(line.trim())) {
      if (!inList) {
        html.push('<ol style="margin: 12px 0 12px 24px; display: flex; flex-direction: column; gap: 6px;">');
        inList = true;
      }
      const match = line.trim().match(/^(\d+)\.\s(.*)/);
      const itemContent = match[2];
      html.push(`<li style="color: #d4d4d8;">${parseInline(itemContent)}</li>`);
      continue;
    } else {
      if (inList) {
        html.push('</ul>'); // Close lists
        inList = false;
      }
    }

    // Handle headers
    if (line.startsWith('### ')) {
      html.push(`<h3 style="font-size: 1.25rem; color: var(--cyan); margin: 24px 0 12px 0; font-family: var(--font-hero); font-weight: 700;">${parseInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      html.push(`<h2 style="font-size: 1.5rem; color: var(--purple); margin: 28px 0 16px 0; font-family: var(--font-hero); font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">${parseInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      html.push(`<h1 style="font-size: 1.8rem; color: #fff; margin: 32px 0 20px 0; font-family: var(--font-hero); font-weight: 800;">${parseInline(line.slice(2))}</h1>`);
    } else {
      // Normal paragraph
      if (line.trim() === '') {
        html.push('<div style="height: 12px;"></div>');
      } else {
        html.push(`<p style="margin: 8px 0; color: #e4e4e7; line-height: 1.6;">${parseInline(line)}</p>`);
      }
    }
  }

  // Final cleanup for open tags
  if (inCodeBlock) html.push('</pre></div>');
  if (inList) html.push('</ul>');
  if (inTable) {
    let tableHtml = '<div style="overflow-x: auto; margin: 16px 0; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;"><table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">';
    if (tableHeaders) {
      tableHtml += '<thead style="background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.1);"><tr>';
      tableHeaders.forEach(th => {
        tableHtml += `<th style="padding: 12px 16px; font-weight: 600; color: var(--cyan);">${parseInline(th)}</th>`;
      });
      tableHtml += '</tr></thead>';
    }
    tableHtml += '<tbody>';
    tableRows.forEach(row => {
      tableHtml += '<tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">';
      row.forEach(cell => {
        tableHtml += `<td style="padding: 12px 16px; color: #d4d4d8;">${parseInline(cell)}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table></div>';
    html.push(tableHtml);
  }

  return html.join('');
};

const ChatInterface = ({ activeAgentId, onSelectAgent }) => {
  const [agent, setAgent] = useState(agents.find(a => a.id === activeAgentId) || agents[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    const selected = agents.find(a => a.id === activeAgentId);
    if (selected) {
      setAgent(selected);
      setMessages([]);
    }
  }, [activeAgentId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;

    const provider = localStorage.getItem('api_provider') || 'groq';
    
    const cleanKey = (k) => {
      if (!k || k === 'your_groq_api_key_here' || k === 'your_gemini_api_key_here' || k === 'your_api_key_here') {
        return '';
      }
      return k.trim();
    };

    const groqKey = cleanKey(localStorage.getItem('groq_api_key') || (window.STREAMLIT_ENV && window.STREAMLIT_ENV.VITE_GROQ_API_KEY) || import.meta.env.VITE_GROQ_API_KEY);
    const geminiKey = cleanKey(localStorage.getItem('gemini_api_key') || (window.STREAMLIT_ENV && window.STREAMLIT_ENV.VITE_GEMINI_API_KEY) || import.meta.env.VITE_GEMINI_API_KEY);

    let apiKey, errorMsg;
    if (provider === 'groq') {
      apiKey = groqKey;
      errorMsg = "Error: No Groq API key found. Please configure in Settings.";
    } else {
      apiKey = geminiKey;
      errorMsg = "Error: No Gemini API key found. Please configure in Settings.";
    }

    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: errorMsg }]);
      setInput('');
      return;
    }

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      let response, data;

      if (provider === 'groq') {
        const groqMessages = [
          { role: 'system', content: agent.system },
          ...newMessages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
        ];

        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: groqMessages,
            max_tokens: 1000,
            temperature: 0.7
          })
        });

        data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: `API Error: ${data.error?.message || 'Unknown error'}` }]);
        }
      } else {
        const geminiMessages = newMessages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: geminiMessages,
            systemInstruction: {
              parts: [{ text: agent.system }]
            },
            generationConfig: {
              maxOutputTokens: 1000
            }
          })
        });

        data = await response.json();
        
        if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.candidates[0].content.parts[0].text }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: `API Error: ${data.error?.message || 'Unknown error'}` }]);
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Connection Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }} className="chat-scroll">
        {agents.map(a => (
          <button
            key={a.id}
            onClick={() => onSelectAgent(a.id)}
            style={{
              background: a.id === agent.id ? `rgba(${a.color.replace('#', '')}, 0.1)` : 'transparent',
              border: `1px solid ${a.id === agent.id ? a.color : 'rgba(255,255,255,0.1)'}`,
              color: a.id === agent.id ? a.color : '#a1a1aa',
              padding: '6px 16px',
              borderRadius: '20px',
              cursor: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s'
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="chat-scroll"
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '12px' }}
      >
        {messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, opacity: 0.8 }} className="slide-up">
            <Orb color={agent.color} size={100} />
            <h2 style={{ color: agent.color, marginTop: '24px', fontSize: '1.5rem' }}>{agent.name}</h2>
            <p style={{ color: '#a1a1aa', marginTop: '8px' }}>{agent.role}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '40px' }}>
              {agent.suggestions.map((sug, i) => (
                <button
                  key={i}
                  className="ghost-btn"
                  style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '20px' }}
                  onClick={() => handleSend(sug)}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'slide-up' : 'slide-in-left'} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                gap: '16px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                    <Orb color={agent.color} size={40} />
                  </div>
                )}
                
                <div style={{
                  background: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: msg.role === 'user' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  padding: msg.role === 'user' ? '16px 20px' : '8px 0',
                  borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '0',
                  color: '#e4e4e7',
                  lineHeight: 1.6,
                  whiteSpace: msg.role === 'user' ? 'pre-wrap' : 'normal',
                  width: '100%'
                }}>
                  {msg.role === 'assistant' ? (
                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="slide-in-left" style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                  <Orb color={agent.color} size={40} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 0' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: agent.color,
                      animation: `thinking-dot 1s infinite ease-in-out ${i * 0.2}s`
                    }} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div style={{ marginTop: '20px', position: 'relative' }} className="slide-up">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Initiate prompt..."
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${agent.color}`,
            borderRadius: '16px',
            padding: '16px 60px 16px 20px',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            minHeight: '60px',
            maxHeight: '200px',
            boxShadow: `0 0 20px rgba(${agent.color.replace('#','')}, 0.1)`,
            cursor: 'none'
          }}
          className="chat-scroll"
        />
        <button
          onClick={() => handleSend()}
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '14px',
            background: agent.color,
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            color: '#020408',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            opacity: input.trim() && !loading ? 1 : 0.5
          }}
        >
          ↑
        </button>
      </div>

    </div>
  );
};

export default ChatInterface;
