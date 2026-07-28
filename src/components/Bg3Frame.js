import React from 'react';
import GoldDivider from '@site/src/components/GoldDivider';

const CornerOrnament = ({ flip }) => (
  <svg viewBox="0 0 40 40" style={{ width: 36, height: 36, opacity: 0.5, transform: flip ? 'scale(-1,1)' : undefined }}>
    <path d="M2 20 Q2 2 20 2" fill="none" stroke="#c9a03a" strokeWidth="1.2"/>
    <circle cx="20" cy="2" r="3" fill="#c9a03a" opacity="0.6"/>
    <path d="M20 2 L18 6 L22 6 Z" fill="#c9a03a" opacity="0.8"/>
    <path d="M2 28 Q2 38 20 38" fill="none" stroke="#c9a03a" strokeWidth="0.6" opacity="0.3"/>
    <circle cx="20" cy="38" r="1.5" fill="#c9a03a" opacity="0.3"/>
  </svg>
);

/** Page wrapper with ornamented borders and gold accents */
export default function Bg3Frame({ title, subtitle, icon, children }) {
  return (
    <div style={{ position: 'relative', padding: '0.5rem 0' }}>
      {/* Top ornament corners */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: -18 }}>
        <CornerOrnament />
        <CornerOrnament flip />
      </div>

      {/* Title section */}
      {(title || icon) && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {icon && <span style={{ fontSize: '2rem' }}>{icon}</span>}
          {title && (
            <h2 style={{
              fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif',
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#f0d060',
              margin: '0.3rem 0 0',
              letterSpacing: '0.04em',
              textShadow: '0 0 18px rgba(240,208,96,0.15)',
            }}>{title}</h2>
          )}
          {subtitle && <p style={{ color: '#8b7355', fontSize: '0.9rem', margin: '0.3rem 0 0' }}>{subtitle}</p>}
        </div>
      )}

      <GoldDivider icon="d20" />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Bottom bar */}
      <div style={{
        marginTop: '2rem',
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(201,160,58,0.25) 20%, rgba(201,160,58,0.25) 80%, transparent)',
        borderRadius: 1,
      }} />
    </div>
  );
}
