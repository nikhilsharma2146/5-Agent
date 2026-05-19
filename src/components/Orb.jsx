import React from 'react';

const Orb = ({ color, size = 180 }) => {
  return (
    <div style={{
      width: size,
      height: size,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    }}>
      {/* Glow shadow */}
      <div style={{
        position: 'absolute',
        width: size * 0.3,
        height: size * 0.3,
        backgroundColor: color,
        borderRadius: '50%',
        filter: `blur(${size * 0.2}px)`,
        opacity: 0.8,
        zIndex: 1
      }} />

      {/* Inner radial gradient core */}
      <div style={{
        position: 'absolute',
        width: size * 0.5,
        height: size * 0.5,
        background: `radial-gradient(circle, #fff 10%, ${color} 40%, transparent 80%)`,
        borderRadius: '50%',
        zIndex: 2,
        opacity: 0.9,
        mixBlendMode: 'screen'
      }} />

      {/* Outer spinning ring */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: `2px solid ${color}`,
        borderRadius: '50%',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        opacity: 0.4,
        zIndex: 3,
        animation: 'ring-spin 12s linear infinite'
      }} />

      {/* Inner dashed counter-spinning ring */}
      <div style={{
        position: 'absolute',
        width: '75%',
        height: '75%',
        border: `2px dashed ${color}`,
        borderRadius: '50%',
        opacity: 0.6,
        zIndex: 4,
        animation: 'ring-spin 20s linear infinite reverse'
      }} />
    </div>
  );
};

export default Orb;
