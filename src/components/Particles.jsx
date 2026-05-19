import React, { useMemo } from 'react';

const Particles = () => {
  const particles = useMemo(() => {
    const colors = ['#0ea5e9', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#22d3ee'];
    const items = [];
    
    for (let i = 0; i < 40; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 3 + 1; // 1px to 4px
      const left = Math.random() * 100; // 0 to 100vw
      const duration = Math.random() * 20 + 12; // 12s to 32s
      const delay = Math.random() * 15; // 0s to 15s
      const dx = (Math.random() - 0.5) * 200; // -100px to +100px horizontal drift
      
      items.push({
        id: i,
        color,
        size,
        left,
        duration,
        delay,
        dx
      });
    }
    return items;
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: `${p.left}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            opacity: 0.6,
            '--dx': `${p.dx}px`,
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
