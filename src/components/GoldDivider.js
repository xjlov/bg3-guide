import React from 'react';

const ICONS = {
  sword: <path d="M7 2 L5 8 L7 22 L9 8 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>, // simplified
  shield: <path d="M12 2 L4 5 L4 13 C4 19 12 22 12 22 C12 22 20 19 20 13 L20 5 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>,
  star: <polygon points="12,3 14,8 20,9 15,13 16,19 12,16 8,19 9,13 4,9 10,8" fill="none" stroke="currentColor" strokeWidth="1"/>,
  d20: <><polygon points="12,1 21,6 18,18 6,18 3,6" fill="none" stroke="currentColor" strokeWidth="1.2"/><text x="12" y="14" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="900">20</text></>,
  none: null,
};

export default function GoldDivider({ icon = 'd20', label }) {
  const g = ICONS[icon] || ICONS.d20;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '2rem 0', userSelect: 'none' }}>
      <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,160,58,0.5))' }} />
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color: '#c9a03a', flexShrink: 0 }}>{g}</svg>
      <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(201,160,58,0.5), transparent)' }} />
    </div>
  );
}
