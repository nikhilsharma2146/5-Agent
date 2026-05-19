import React, { useEffect, useState, useRef } from 'react';

const RobotBackground = ({ currentPage }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickPulse, setClickPulse] = useState(false);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  // Determine size, position, and opacity based on active page
  const isLanding = currentPage === 'landing';
  const opacity = isLanding ? 0.12 : 0.08;
  const size = isLanding ? '40vw' : '30vw';
  const right = isLanding ? '8%' : '4%';
  const bottom = isLanding ? '15%' : '8%';

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse coordinates from center (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      targetPos.current = { x: x * -25, y: y * -25 }; // Drifts opposite to cursor
    };

    const handleClick = () => {
      setClickPulse(true);
      setTimeout(() => setClickPulse(false), 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Smooth LERP (linear interpolation) animation loop
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;
      
      const el = document.getElementById('bg-robot-companion');
      if (el) {
        el.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) rotate(${currentPos.current.x * 0.05}deg)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      {/* Dynamic Backplate Glow */}
      <div style={{
        position: 'absolute',
        right: `calc(${right} + 10vw)`,
        bottom: `calc(${bottom} + 15vh)`,
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: clickPulse 
          ? 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(168,85,247,0.12) 50%, transparent 70%)'
          : 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
        filter: 'blur(60px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isLanding ? 0.7 : 0.4,
        animation: 'pulse-glow 6s infinite ease-in-out'
      }} />

      {/* Cybernetic Grid Matrix Behind Robot */}
      <div style={{
        position: 'absolute',
        right: right,
        bottom: bottom,
        width: size,
        height: `calc(${size} * 1.2)`,
        opacity: isLanding ? 0.15 : 0.08,
        backgroundImage: 'linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
      }} />

      {/* Floating Animated Robot Container */}
      <div 
        id="bg-robot-companion"
        className="float-c"
        style={{
          position: 'absolute',
          right: right,
          bottom: bottom,
          width: size,
          height: `calc(${size} * 1.2)`,
          backgroundImage: 'url(/robot.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: opacity,
          filter: clickPulse
            ? 'drop-shadow(0 0 50px rgba(34,211,238,0.5)) brightness(1.2)'
            : 'drop-shadow(0 0 30px rgba(34,211,238,0.25))',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1), height 1s cubic-bezier(0.16, 1, 0.3, 1), right 1s cubic-bezier(0.16, 1, 0.3, 1), bottom 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease, filter 0.3s ease',
          willChange: 'transform'
        }}
      >
        {/* Holographic Scanner Scanline Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(34,211,238,0.05) 50%)',
          backgroundSize: '100% 4px',
          borderRadius: '20px',
          opacity: 0.5
        }} />

        {/* Orbiting Tech Ring around background robot */}
        <div style={{
          position: 'absolute',
          top: '30%', left: '10%', right: '10%', bottom: '30%',
          border: '1px dashed rgba(34,211,238,0.15)',
          borderRadius: '50%',
          transform: 'rotateX(75deg) rotateY(15deg)',
          animation: 'ring-spin 25s linear infinite',
          pointerEvents: 'none',
          boxShadow: '0 0 15px rgba(34,211,238,0.05)'
        }} />
      </div>
    </div>
  );
};

export default RobotBackground;
