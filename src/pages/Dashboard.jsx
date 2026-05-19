import React from 'react';
import { agents } from '../Agents';
import Orb from '../components/Orb';

const Dashboard = ({ onNavigate, onSelectAgent }) => {
  const stats = [
    { label: "Messages", value: "1,204" },
    { label: "Sessions", value: "42" },
    { label: "Agents Used", value: "5/5" },
    { label: "Time Saved", value: "84h" }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }} className="slide-up">
      {/* Holographic Systems Header */}
      <header style={{ 
        marginBottom: '40px', 
        borderBottom: '1px solid rgba(34,211,238,0.1)', 
        paddingBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '4px', height: '32px', background: 'var(--cyan)', borderRadius: '2px', boxShadow: '0 0 10px var(--cyan)' }} />
            <h1 className="font-hero" style={{ fontSize: '2.5rem', margin: 0, tracking: '0.02em' }}>
              Welcome back, <span className="grad-text">Commander</span>
            </h1>
          </div>
          <p className="font-mono" style={{ color: '#a1a1aa', marginTop: '8px', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
            STATUS // ALL SYSTEMS NOMINAL • CORE MODULES ONLINE
          </p>
        </div>
        
        {/* Right Corner Telemetry Box */}
        <div className="font-mono" style={{
          border: '1px solid rgba(168,85,247,0.3)',
          background: 'rgba(168,85,247,0.05)',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          color: 'var(--purple)',
          textAlign: 'right',
          lineHeight: '1.4',
          letterSpacing: '0.08em',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '4px', height: '4px', borderTop: '1px solid var(--purple)', borderLeft: '1px solid var(--purple)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '4px', height: '4px', borderBottom: '1px solid var(--purple)', borderRight: '1px solid var(--purple)' }} />
          SYS_LATENCY // 12ms<br />
          SECTOR_LOC  // ORBIT_04
        </div>
      </header>

      {/* Cyber stats telemetry grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '60px' 
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="agent-card" style={{ 
            padding: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            position: 'relative',
            background: 'rgba(2,4,8,0.4)',
            border: '1px solid rgba(34,211,238,0.15)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* Tech bracket corners */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: '1.5px solid var(--cyan)', borderRight: '1.5px solid var(--cyan)' }} />
            
            <span className="font-mono" style={{ color: 'var(--cyan)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8 }}>
              [STAT_0{i+1}] // {stat.label}
            </span>
            <span className="font-hero" style={{ fontSize: '2.4rem', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.15)', margin: '8px 0' }}>
              {stat.value}
            </span>
            
            {/* Holographic sweep bottom bar */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, left: 0, right: 0, 
              height: '2px', 
              background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
              opacity: 0.4
            }} />
          </div>
        ))}
      </div>

      <h2 className="font-hero" style={{ fontSize: '1.5rem', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.05em' }}>
        <span className="live-pulse-dot" style={{ background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }}></span> 
        ACTIVE MODULES
      </h2>

      {/* Cybernetic agent modules cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '28px' 
      }}>
        {agents.map((agent, i) => (
          <div key={agent.id} className="agent-card bounce-in" style={{ 
            animationDelay: `${i * 0.1}s`,
            '--agent-glow': agent.color,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            border: `1px solid rgba(${agent.color === 'var(--cyan)' ? '34,211,238' : '168,85,247'}, 0.25)`,
            background: 'rgba(2,4,8,0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '28px'
          }}>
            {/* Custom module corners in agent theme color */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '10px', height: '10px', borderTop: `2px solid ${agent.color}`, borderLeft: `2px solid ${agent.color}` }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '10px', height: '10px', borderTop: `2px solid ${agent.color}`, borderRight: `2px solid ${agent.color}` }} />
            
            {/* Top Row: Orb & Identity Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                <Orb color={agent.color} size={60} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="font-hero" style={{ fontSize: '1.25rem', color: agent.color, margin: 0, letterSpacing: '0.02em' }}>
                    {agent.name}
                  </h3>
                  <span className="font-mono" style={{ fontSize: '0.65rem', color: '#71717a' }}>
                    [MOD_0{i+1}]
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#a1a1aa', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '4px', display: 'block' }}>
                  {agent.role}
                </span>
              </div>
            </div>
            
            <p style={{ color: '#d4d4d8', fontSize: '0.9rem', lineHeight: 1.6, flex: 1, margin: 0 }}>
              {agent.description}
            </p>
            
            {/* High-tech mini launch button */}
            <button 
              className="cyber-launch-btn"
              style={{
                '--btn-theme': agent.color,
                background: `linear-gradient(135deg, rgba(${agent.color === 'var(--cyan)' ? '34,211,238' : '168,85,247'}, 0.05) 0%, rgba(${agent.color === 'var(--cyan)' ? '34,211,238' : '168,85,247'}, 0.15) 100%)`,
                border: `1px solid ${agent.color}`,
                boxShadow: `0 0 15px rgba(${agent.color === 'var(--cyan)' ? '34,211,238' : '168,85,247'}, 0.1)`,
                padding: '12px 20px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                cursor: 'none',
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#fff',
                textTransform: 'uppercase',
                transition: 'all 0.3s'
              }}
              onClick={() => {
                onSelectAgent(agent.id);
                onNavigate('chat');
              }}
            >
              {/* Mini corner details */}
              <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '4px', height: '4px', borderTop: `1px solid ${agent.color}`, borderLeft: `1px solid ${agent.color}` }} />
              <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '4px', height: '4px', borderTop: `1px solid ${agent.color}`, borderRight: `1px solid ${agent.color}` }} />
              <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '4px', height: '4px', borderBottom: `1px solid ${agent.color}`, borderLeft: `1px solid ${agent.color}` }} />
              <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '4px', height: '4px', borderBottom: `1px solid ${agent.color}`, borderRight: `1px solid ${agent.color}` }} />
              
              <span className="live-pulse-dot" style={{ background: agent.color, boxShadow: `0 0 8px ${agent.color}`, width: '5px', height: '5px' }}></span>
              Launch OS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
