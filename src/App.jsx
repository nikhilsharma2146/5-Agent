import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';
import Cursor from './components/Cursor';
import Particles from './components/Particles';
import RobotBackground from './components/RobotBackground';
import { agents } from './Agents';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AgentGallery from './pages/AgentGallery';
import ChatInterface from './pages/ChatInterface';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeAgentId, setActiveAgentId] = useState(agents[0].id);

  const renderPage = () => {
    switch(currentPage) {
      case 'landing': return <LandingPage onNavigate={setCurrentPage} />;
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} onSelectAgent={setActiveAgentId} />;
      case 'gallery': return <AgentGallery onNavigate={setCurrentPage} onSelectAgent={setActiveAgentId} />;
      case 'chat': return <ChatInterface activeAgentId={activeAgentId} onSelectAgent={setActiveAgentId} />;
      case 'settings': return <Settings />;
      default: return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'gallery', label: 'Gallery', icon: '✦' },
    { id: 'chat', label: 'Comms', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙' }
  ];

  if (currentPage === 'landing') {
    return (
      <>
        <GlobalStyles />
        <Cursor />
        <div className="mesh-bg" />
        <Particles />
        <RobotBackground currentPage={currentPage} />
        {renderPage()}
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <Cursor />
      <div className="mesh-bg" />
      <Particles />
      <RobotBackground currentPage={currentPage} />

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Desktop Sidebar */}
        <aside className="desktop-sidebar" style={{
          width: '240px',
          background: 'rgba(2,4,8,0.8)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0, bottom: 0, left: 0,
          zIndex: 100
        }}>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="AgentVerse Logo" style={{ width: '32px', height: '32px', borderRadius: '8px', boxShadow: '0 0 10px rgba(34, 211, 238, 0.3)', border: '1px solid rgba(255,255,255,0.1)' }} />
            <h2 className="font-hero" style={{ fontSize: '1.2rem', letterSpacing: '0.05em' }}>AgentVerse</h2>
          </div>

          <nav style={{ flex: 1, padding: '24px 0' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderLeft: currentPage === item.id ? '4px solid var(--cyan)' : '4px solid transparent',
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: currentPage === item.id ? '#fff' : '#a1a1aa',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  cursor: 'none',
                  textAlign: 'left',
                  background: currentPage === item.id ? 'rgba(34,211,238,0.05)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            <div style={{ padding: '24px', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quick Launch</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {agents.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setActiveAgentId(a.id);
                      setCurrentPage('chat');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#a1a1aa',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'none',
                      textAlign: 'left',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = a.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color }}></span>
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logo.png" alt="System Core" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid var(--cyan)', boxShadow: '0 0 10px rgba(34,211,238,0.2)' }} />
            <div>
              <div style={{ fontSize: '0.9rem' }}>Commander</div>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--cyan)' }}>ONLINE</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content" style={{ flex: 1, marginLeft: '24px', paddingBottom: '24px', position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh' }}>
          <div style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }} className="main-content-inner">
            {renderPage()}
          </div>
        </main>
        
        {/* Responsive adjustments for main-content-inner logic */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .main-content-inner {
              margin-left: 0 !important;
              width: 100% !important;
            }
          }
        `}} />

        {/* Mobile Bottom Nav */}
        <nav className="mobile-nav" style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          background: 'rgba(2,4,8,0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: currentPage === item.id ? 'var(--cyan)' : '#71717a',
                fontSize: '1.5rem',
                cursor: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{item.icon}</span>
              <span className="font-mono" style={{ fontSize: '0.6rem' }}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default App;
