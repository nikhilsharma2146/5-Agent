import React from 'react';
import { agents } from '../Agents';
import Orb from '../components/Orb';

const AgentGallery = ({ onNavigate, onSelectAgent }) => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }} className="slide-up">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Agent <span className="grad-text">Gallery</span></h1>
        <p style={{ color: '#a1a1aa', marginTop: '8px' }}>Explore the specialized intelligence modules.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {agents.map((agent, index) => (
          <div key={agent.id} className="agent-card slide-up" style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '40px',
            animationDelay: `${index * 0.15}s`,
            padding: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '0 0 auto' }}>
              <Orb color={agent.color} size={150} />
            </div>
            
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '2rem', color: agent.color }}>{agent.name}</h2>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: `1px solid ${agent.color}`,
                  background: `rgba(${agent.color}, 0.1)`,
                  color: agent.color,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase'
                }} className="font-mono">
                  {agent.role}
                </div>
              </div>
              
              <p style={{ color: '#d4d4d8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {agent.description}
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#a1a1aa', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase' }} className="font-mono">Capabilities</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {agent.capabilities.map((cap, i) => (
                    <span key={i} style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '0.85rem'
                    }}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                style={{
                  background: `linear-gradient(90deg, ${agent.gradient})`,
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: `0 0 20px rgba(0,0,0,0.3)`
                }}
                onClick={() => {
                  onSelectAgent(agent.id);
                  onNavigate('chat');
                }}
              >
                <span className="live-pulse-dot" style={{ background: '#fff', boxShadow: 'none', width: '6px', height: '6px' }}></span>
                Launch OS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentGallery;
