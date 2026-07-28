import React from 'react';

const RARITY = {
  common:    { label: '普通',   color: '#888',    hex: '#888888' },
  uncommon:  { label: '精良',   color: '#4caf50', hex: '#4caf50' },
  rare:      { label: '稀有',   color: '#3498db', hex: '#3498db' },
  veryrare:  { label: '极稀有', color: '#9b59b6', hex: '#9b59b6' },
  legendary: { label: '传说',   color: '#f39c12', hex: '#f39c12' },
};

/** Equipment card with icon, rarity glow, and stats */
export default function ItemCard({
  name, rarity = 'rare', damage, ac, effects, source, icon
}) {
  const r = RARITY[rarity] || RARITY.rare;
  const imgSrc = icon || (name ? `/img/items/${name.replace(/[^a-zA-Z]/g,'_').replace(/_+/g,'_')}_Icon.png` : null);

  return (
    <div style={{
      display: 'flex',
      gap: '0.9rem',
      padding: '0.9rem 1rem',
      borderRadius: 10,
      background: 'linear-gradient(135deg, rgba(22,18,38,0.8), rgba(18,15,30,0.6))',
      border: `1.5px solid ${r.hex}33`,
      transition: 'all 0.25s ease',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 0 0 0 ${r.hex}00`,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = r.hex + '88';
      e.currentTarget.style.boxShadow = `0 0 24px ${r.hex}18, 0 0 8px ${r.hex}10`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = r.hex + '33';
      e.currentTarget.style.boxShadow = '';
    }}
    >
      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        background: 'rgba(0,0,0,0.4)', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${r.hex}22`,
      }}>
        {imgSrc ? (
          <img src={imgSrc} alt={name} style={{ width: 42, height: 42, objectFit: 'contain' }}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
        ) : null}
        <span style={{ fontSize: '1.4rem', display: imgSrc ? 'none' : 'block' }}>⚔️</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: '0.95rem', color: '#e8d5b7' }}>{name}</strong>
          <span style={{
            padding: '1px 7px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 700,
            background: `${r.hex}18`, color: r.color, border: `1px solid ${r.hex}30`,
          }}>{r.label}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', fontSize: '0.8rem', color: '#99a', marginBottom: '0.2rem' }}>
          {damage && <span>🗡️ {damage}</span>}
          {ac && <span>🛡️ AC {ac}</span>}
        </div>

        {effects && <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#b0a890', lineHeight: 1.5 }}>{effects}</p>}
        {source && <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: '#8b7355' }}>📍 {source}</p>}
      </div>
    </div>
  );
}
