import React, { useState, useEffect } from 'react';
import { agents } from '../Agents';
import Orb from '../components/Orb';

const LandingPage = ({ onNavigate }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    "Intelligence that floats.",
    "Your multi-agent operating system.",
    "Productivity in zero gravity.",
    "The future feels alive."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
      
      {/* System Badge */}
      <div style={{ 
        position: 'absolute', top: '40px', 
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '6px 16px', borderRadius: '20px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        zIndex: 10
      }} className="slide-up">
        <span className="live-pulse-dot"></span>
        <span className="font-mono" style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>AGENTVERSE • v1.0.0</span>
      </div>

      {/* Hero split section */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1200px', 
        width: '100%', 
        gap: '40px',
        zIndex: 10,
        marginBottom: '60px',
        marginTop: '60px',
        flexWrap: 'wrap'
      }} className="slide-up">
        
        {/* Left Column: Text & CTAs */}
        <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '20px', 
            textShadow: '0 0 40px rgba(168,85,247,0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <img src="/logo.png" alt="Logo" style={{ 
              width: 'clamp(3.5rem, 7vw, 6.5rem)', 
              height: 'clamp(3.5rem, 7vw, 6.5rem)', 
              borderRadius: '16px', 
              border: '2px solid var(--cyan)', 
              boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' 
            }} />
            <span>Agent<span className="grad-text">Verse</span></span>
          </h1>
          <div style={{ fontSize: '1.25rem', color: '#a1a1aa', height: '30px', marginBottom: '40px' }} className="font-mono">
            {taglines[taglineIndex]}
            <span style={{ animation: 'type-cursor 1s infinite', marginLeft: '4px', color: 'var(--cyan)' }}>_</span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
            <button className="cyber-launch-btn" onClick={() => onNavigate('dashboard')}>
              <div className="btn-corner btn-corner-tl"></div>
              <div className="btn-corner btn-corner-tr"></div>
              <div className="btn-corner btn-corner-bl"></div>
              <div className="btn-corner btn-corner-br"></div>
              <span className="live-pulse-dot" style={{ background: '#fff', boxShadow: '0 0 8px #fff', width: '6px', height: '6px' }}></span>
              Launch OS
            </button>
            <button className="ghost-btn" onClick={() => onNavigate('gallery')}>View OS</button>
          </div>
        </div>
        {/* Right Column: Advanced Cybernetic Robot Centerpiece */}
        <div style={{ 
          flex: '1 1 400px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          height: '450px'
        }}>
          {/* Glowing Aura Behind Container */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '420px',
            borderRadius: '24px',
            background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.05) 60%, transparent 80%)',
            filter: 'blur(40px)',
            zIndex: 1
          }} />

          {/* Slow drift floating wrapper */}
          <div className="float-c" style={{ 
            zIndex: 2, 
            position: 'relative', 
            width: '320px', 
            height: '420px',
            background: 'rgba(2, 4, 8, 0.45)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            boxShadow: '0 0 50px rgba(34, 211, 238, 0.15), inset 0 0 25px rgba(34, 211, 238, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            {/* Cybernetic Grid Matrix inside Container */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              opacity: 0.8,
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Rotating Robotic Target Lock HUD 1 */}
            <div style={{
              position: 'absolute',
              top: '4%', left: '4%', right: '4%', bottom: '4%',
              border: '1px dashed rgba(34,211,238,0.2)',
              borderRadius: '50%',
              animation: 'ring-spin 20s linear infinite',
              pointerEvents: 'none',
              zIndex: 3
            }} />

            {/* Rotating Robotic Target Lock HUD 2 */}
            <div style={{
              position: 'absolute',
              top: '12%', left: '12%', right: '12%', bottom: '12%',
              border: '1.5px solid rgba(168,85,247,0.15)',
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'ring-spin 10s linear infinite reverse',
              pointerEvents: 'none',
              zIndex: 3
            }} />

            {/* Telemetry Coordinate Display overlay */}
            <div className="font-mono" style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              fontSize: '0.65rem',
              color: 'var(--cyan)',
              opacity: 0.85,
              zIndex: 4,
              lineHeight: '1.4',
              letterSpacing: '0.05em',
              textShadow: '0 0 5px rgba(34,211,238,0.3)'
            }}>
              SYS_LOC // [45.82 : 10.98]<br/>
              STATUS  // CORE_ACTIVE<br/>
              MODEL   // ROBO_V5
            </div>

            <div className="font-mono" style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              fontSize: '0.65rem',
              color: 'var(--purple)',
              opacity: 0.85,
              zIndex: 4,
              lineHeight: '1.4',
              letterSpacing: '0.05em',
              textAlign: 'right',
              textShadow: '0 0 5px rgba(168,85,247,0.3)'
            }}>
              ROTATION // 360/s<br/>
              FPS_CAP  // 60_MAX<br/>
              INTEGRITY// 100%
            </div>

            {/* Glowing Tech Corners */}
            <div style={{ zIndex: 5, position: 'absolute', top: '12px', left: '12px', width: '14px', height: '14px', borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', filter: 'drop-shadow(0 0 5px var(--cyan))' }} />
            <div style={{ zIndex: 5, position: 'absolute', top: '12px', right: '12px', width: '14px', height: '14px', borderTop: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', filter: 'drop-shadow(0 0 5px var(--cyan))' }} />
            <div style={{ zIndex: 5, position: 'absolute', bottom: '12px', left: '12px', width: '14px', height: '14px', borderBottom: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', filter: 'drop-shadow(0 0 5px var(--cyan))' }} />
            <div style={{ zIndex: 5, position: 'absolute', bottom: '12px', right: '12px', width: '14px', height: '14px', borderBottom: '2px solid var(--cyan)', borderRight: '2px solid var(--cyan)', filter: 'drop-shadow(0 0 5px var(--cyan))' }} />

            {/* Robot Image */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/robot.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '16px',
              filter: 'brightness(1.1) drop-shadow(0 0 15px rgba(34,211,238,0.2))',
              zIndex: 2
            }} />

            {/* Scanline overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
              backgroundSize: '100% 4px',
              pointerEvents: 'none',
              opacity: 0.5,
              zIndex: 3
            }} />
          </div>
        </div>

      </div>

      {/* Antigravity Formation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 20px',
        zIndex: 10,
        marginBottom: '40px'
      }}>
        {agents.map((agent, i) => (
          <div key={agent.id} className={`agent-card ${agent.floatClass} bounce-in`} style={{ 
            animationDelay: `${i * 0.15}s`,
            width: '200px',
            '--agent-glow': agent.color,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <Orb color={agent.color} size={60} />
            <h3 style={{ marginTop: '16px', fontSize: '1.2rem', color: agent.color }}>{agent.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', marginTop: '8px' }}>{agent.role}</p>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5, marginTop: '20px' }}>
        <span className="font-mono" style={{ fontSize: '0.7rem', marginBottom: '8px', letterSpacing: '0.1em' }}>INITIATE</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--cyan), transparent)' }}></div>
      </div>
      
      {/* Mobile styling layout override */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .slide-up {
            flex-direction: column !important;
            text-align: center !important;
          }
          .slide-up > div {
            text-align: center !important;
            flex: 1 1 100% !important;
          }
          .slide-up > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}} />
      
    </div>
  );
};

export default LandingPage;
