import React, { useMemo } from 'react';

const DICE = [
  { name: 'd4', faces: [[12,2],[3,15],[21,15]], color: '#e06c75' },
  { name: 'd6', faces: null, color: '#d19a66' },
  { name: 'd8', faces: null, color: '#98c379' },
  { name: 'd10', faces: null, color: '#61afef' },
  { name: 'd12', faces: null, color: '#c678dd' },
  { name: 'd20', faces: [[12,2],[20,7],[16,17],[8,18],[3,8],[12,22]], color: '#f0d060' },
];

const DieSVG = ({ die }) => {
  if (die.name === 'd20') return (
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <defs><linearGradient id={`g-${die.name}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={die.color} stopOpacity="0.3"/><stop offset="100%" stopColor={die.color} stopOpacity="0.05"/></linearGradient></defs>
      <polygon points="12,1 22,6 18,19 6,19 2,6" fill={`url(#g-${die.name})`} stroke={die.color} strokeWidth="1"/>
      <text x="12" y="14" textAnchor="middle" fill={die.color} fontSize="7" fontWeight="900" fontFamily="Georgia,serif">20</text>
    </svg>
  );

  // Regular polyhedral dice use a generic faceted shape
  return (
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <rect x="4" y="4" width="16" height="16" rx="3" fill={`${die.color}15`} stroke={die.color} strokeWidth="1" transform="rotate(15,12,12)"/>
      <text x="12" y="16" textAnchor="middle" fill={die.color} fontSize="8" fontWeight="900" fontFamily="Georgia,serif">{die.name.slice(1)}</text>
    </svg>
  );
};

export default function DiceDeco({ size = 48, top, left, right, bottom }) {
  const die = useMemo(() => DICE[Math.floor(Math.random() * DICE.length)], []);
  return (
    <div style={{
      position: 'absolute',
      width: size, height: size,
      top, left, right, bottom,
      zIndex: 0,
      opacity: 0.7,
      animation: `diceSpin ${3 + Math.random() * 4}s linear infinite`,
      pointerEvents: 'none',
      userSelect: 'none',
    }}>
      <DieSVG die={die} />
    </div>
  );
}
