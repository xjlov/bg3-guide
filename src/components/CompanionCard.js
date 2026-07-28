import React, { useState } from 'react';

const RARITY_COLORS = {
  common: '#888',
  uncommon: '#4caf50',
  rare: '#3498db',
  veryrare: '#9b59b6',
  legendary: '#f39c12',
};

/** Character card with portrait, stats, and approval/disapproval tags */
export default function CompanionCard({ name, enName, race, cls, location, image, likes = [], dislikes = [], romance = false }) {
  const [flipped, setFlipped] = useState(false);
  const imgSrc = image || `/img/companions/${enName}.png`;

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        background: 'linear-gradient(145deg, rgba(22,18,38,0.9), rgba(15,12,28,0.8))',
        border: `1px solid ${flipped ? '#c9a03a' : 'rgba(201,160,58,0.15)'}`,
        boxShadow: flipped ? '0 0 28px rgba(201,160,58,0.12)' : '',
        minHeight: flipped ? 240 : 'auto',
      }}
    >
      {/* Portrait area */}
      <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(10,10,22,0.3), #0a0a16)' }}>
        <img
          src={imgSrc}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: flipped ? 'scale(1.05)' : '' }}
          onError={(e) => { e.target.src = fallback; }}
        />
        {/* Name overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.5rem 1rem 0.8rem',
          background: 'linear-gradient(transparent, rgba(10,10,22,0.95))',
        }}>
          <h4 style={{
            fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif',
            fontSize: '1.1rem', fontWeight: 700, color: '#f0d060', margin: 0, letterSpacing: '0.04em',
          }}>{name}</h4>
          <p style={{ margin: '0.15rem 0 0', fontSize: '0.82rem', color: '#8b7355' }}>{race} · {cls}</p>
        </div>
        {/* Romance badge */}
        {romance && (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(224,108,117,0.2)', border: '1px solid rgba(224,108,117,0.4)',
            color: '#e06c75', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
          }}>♥</span>
        )}
      </div>

      {/* Basic info (always visible) */}
      <div style={{ padding: '0.6rem 1rem' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#7a7a8a' }}>📍 {location}</p>
      </div>

      {/* Expandable detail (likes/dislikes) */}
      {flipped && (
        <div style={{
          padding: '0 1rem 1rem',
          animation: 'fadeUp 0.25s ease',
        }}>
          {likes.length > 0 && (
            <div style={{ marginBottom: '0.6rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#98c379', margin: '0 0 0.3rem', fontWeight: 600 }}>✓ 赞同</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {likes.map((l, i) => (
                  <span key={i} style={{ background: 'rgba(152,195,121,0.1)', border: '1px solid rgba(152,195,121,0.2)', color: '#98c379', padding: '2px 7px', borderRadius: 4, fontSize: '0.72rem' }}>{l}</span>
                ))}
              </div>
            </div>
          )}
          {dislikes.length > 0 && (
            <div>
              <p style={{ fontSize: '0.75rem', color: '#e06c75', margin: '0 0 0.3rem', fontWeight: 600 }}>✗ 反对</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {dislikes.map((d, i) => (
                  <span key={i} style={{ background: 'rgba(224,108,117,0.1)', border: '1px solid rgba(224,108,117,0.2)', color: '#e06c75', padding: '2px 7px', borderRadius: 4, fontSize: '0.72rem' }}>{d}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
