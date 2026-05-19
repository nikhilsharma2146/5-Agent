import React from 'react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    :root {
      --bg-dark: #020408;
      --navy: #050b14;
      --cyan: #22d3ee;
      --purple: #a855f7;
      --pink: #ec4899;
      --blue: #0ea5e9;
      --green: #10b981;
      --amber: #f59e0b;
      
      --font-hero: 'Orbitron', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'Share Tech Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      cursor: none !important;
    }

    body {
      background-color: var(--bg-dark);
      color: #ffffff;
      font-family: var(--font-body);
      overflow-x: hidden;
      min-height: 100vh;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
    .chat-scroll::-webkit-scrollbar { width: 4px; }

    /* Typography */
    h1, h2, h3, h4, h5, h6 { font-family: var(--font-hero); font-weight: 800; letter-spacing: -0.02em; }
    .font-mono { font-family: var(--font-mono); }
    
    .grad-text {
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: linear-gradient(to right, var(--cyan), var(--purple));
    }
    
    /* Buttons */
    .neon-btn {
      background: rgba(34,211,238,0.1);
      border: 1px solid var(--cyan);
      color: var(--cyan);
      padding: 12px 24px;
      border-radius: 8px;
      font-family: var(--font-mono);
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .neon-btn:hover {
      background: var(--cyan);
      color: var(--bg-dark);
      box-shadow: 0 0 16px var(--cyan), 0 0 40px rgba(34,211,238,0.4);
    }

    .cyber-launch-btn {
      background: linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
      border: 1px solid var(--cyan);
      color: #fff;
      padding: 14px 32px;
      border-radius: 8px;
      font-family: var(--font-hero);
      text-transform: uppercase;
      font-size: 0.95rem;
      letter-spacing: 0.15em;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.15), inset 0 0 10px rgba(34, 211, 238, 0.05);
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: none !important;
    }

    .cyber-launch-btn::before {
      content: "";
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.35), transparent);
      animation: laser-sweep 3s infinite linear;
    }

    @keyframes laser-sweep {
      0% { left: -100%; }
      50% { left: 100%; }
      100% { left: 100%; }
    }

    .cyber-launch-btn:hover {
      background: linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%);
      color: var(--bg-dark);
      box-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 15px rgba(168, 85, 247, 0.5);
      transform: translateY(-2px);
      letter-spacing: 0.22em;
    }

    .btn-corner {
      position: absolute;
      width: 6px; height: 6px;
      border: 1.5px solid transparent;
      transition: all 0.3s ease;
    }
    .btn-corner-tl { top: 4px; left: 4px; border-top-color: var(--cyan); border-left-color: var(--cyan); }
    .btn-corner-tr { top: 4px; right: 4px; border-top-color: var(--cyan); border-right-color: var(--cyan); }
    .btn-corner-bl { bottom: 4px; left: 4px; border-bottom-color: var(--cyan); border-left-color: var(--cyan); }
    .btn-corner-br { bottom: 4px; right: 4px; border-bottom-color: var(--cyan); border-right-color: var(--cyan); }

    .cyber-launch-btn:hover .btn-corner {
      border-color: var(--bg-dark);
      transform: scale(0.8);
    }
    
    .ghost-btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: var(--font-mono);
      transition: all 0.3s ease;
    }
    .ghost-btn:hover {
      background: rgba(255,255,255,0.1);
      border-color: #fff;
    }

    /* Physics & Float Classes */
    @keyframes float-a {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      33%       { transform: translateY(-18px) rotate(1.5deg); }
      66%       { transform: translateY(-8px) rotate(-1deg); }
    }
    @keyframes float-b {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      40%       { transform: translateY(-22px) rotate(-2deg); }
      70%       { transform: translateY(-10px) rotate(1deg); }
    }
    @keyframes float-c {
      0%, 100% { transform: translateY(0) scale(1); }
      50%       { transform: translateY(-14px) scale(1.02); }
    }

    .float-a { animation: float-a 6s infinite ease-in-out; }
    .float-b { animation: float-b 8s infinite ease-in-out; }
    .float-c { animation: float-c 5s infinite ease-in-out; }

    /* Other Animations */
    @keyframes orbit {
      0%   { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50%       { opacity: 1; transform: scale(1.08); }
    }
    @keyframes neon-border {
      0%, 100% { box-shadow: 0 0 8px #0ea5e9, 0 0 30px rgba(14,165,233,0.2); }
      50%       { box-shadow: 0 0 16px #a855f7, 0 0 50px rgba(168,85,247,0.3); }
    }
    @keyframes particle-drift {
      0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
      100% { transform: translateY(-100vh) translateX(var(--dx)) scale(0.3); opacity: 0; }
    }
    @keyframes slide-up {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slide-in-left {
      from { transform: translateX(-30px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes bounce-in {
      0% { transform: scale(0.9); opacity: 0; }
      70% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes ring-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes type-cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes thinking-dot {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .bounce-in { animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    
    /* Layout & Cards */
    .agent-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(12px);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .agent-card:hover {
      transform: translateY(-8px) scale(1.02) rotateX(2deg) rotateY(-2deg);
      box-shadow: 0 16px 32px rgba(0,0,0,0.4), 0 0 20px rgba(var(--agent-glow), 0.2);
      z-index: 10;
    }
    
    .live-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--cyan);
      box-shadow: 0 0 8px var(--cyan);
      animation: pulse-glow 2s infinite;
      display: inline-block;
    }
    @keyframes mesh-drift {
      0% { background-position: 0% 0%; }
      50% { background-position: 50% 100%; }
      100% { background-position: 100% 0%; }
    }

    /* Living Mesh Background */
    .mesh-bg {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: -2;
      background: 
        radial-gradient(circle at 15% 30%, rgba(34, 211, 238, 0.1) 0%, transparent 45%),
        radial-gradient(circle at 85% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 45%),
        radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
        var(--bg-dark);
      background-size: 200% 200%;
      animation: mesh-drift 20s infinite alternate ease-in-out;
      filter: blur(40px);
      pointer-events: none;
    }

    /* Futuristic Grid Overlay on Entire Page */
    body::before {
      content: "";
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: 
        linear-gradient(rgba(34, 211, 238, 0.007) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.007) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: -1;
    }

    /* High-tech Scanning CRT Scanline Filter */
    body::after {
      content: "";
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(34, 211, 238, 0.015), rgba(168, 85, 247, 0.005), rgba(236, 72, 153, 0.015));
      background-size: 100% 4px, 4px 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.4;
    }

    /* Mobile Nav */
    .mobile-nav {
      display: none;
    }
    @media (max-width: 768px) {
      .desktop-sidebar { display: none; }
      .mobile-nav { display: flex; }
      .main-content { margin-left: 0 !important; padding-bottom: 80px; }
    }
  `}} />
);

export default GlobalStyles;
