import React, { useState } from 'react';

/** Vertical timeline with expandable steps, optional map images */
export default function QuestTimeline({ steps = [] }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ position: 'relative', paddingLeft: 28 }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute', left: 10, top: 8, bottom: 8, width: 2,
        background: 'linear-gradient(180deg, rgba(201,160,58,0.4) 0%, rgba(201,160,58,0.1) 100%)',
        borderRadius: 1,
      }} />

      {steps.map((step, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ marginBottom: i < steps.length - 1 ? '0.5rem' : 0, position: 'relative' }}>

            {/* Dot */}
            <div
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                position: 'absolute', left: -22, top: 6, width: 14, height: 14, borderRadius: '50%',
                background: isOpen ? '#f0d060' : '#16213e',
                border: `2px solid ${isOpen ? '#f0d060' : 'rgba(201,160,58,0.5)'}`,
                cursor: 'pointer', zIndex: 2,
                transition: 'all 0.2s',
                boxShadow: isOpen ? '0 0 10px rgba(240,208,96,0.4)' : '',
              }}
            />

            {/* Step content */}
            <div
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                padding: '0.7rem 1rem',
                borderRadius: 8,
                background: isOpen ? 'rgba(22,18,38,0.8)' : 'transparent',
                border: isOpen ? '1px solid rgba(201,160,58,0.2)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(22,18,38,0.4)'; }}
              onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif',
                  fontSize: '0.75rem', fontWeight: 700, color: '#8b7355', minWidth: 30,
                }}>{String(i + 1).padStart(2, '0')}</span>

                <strong style={{
                  fontSize: '0.95rem', color: isOpen ? '#f0d060' : '#e8d5b7', flex: 1,
                  transition: 'color 0.2s',
                }}>{step.title}</strong>

                <span style={{
                  fontSize: '0.7rem', color: '#666', transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(180deg)' : '',
                }}>{isOpen ? '▾' : '▸'}</span>
              </div>

              {isOpen && (
                <div style={{ marginTop: '0.6rem', animation: 'fadeUp 0.2s ease' }}>
                  {step.desc && <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: '#b0a890', lineHeight: 1.7 }}>{step.desc}</p>}
                  {step.map && (
                    <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: '0.5rem' }}>
                      <img src={step.map} alt={step.title} style={{ width: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.3)' }}
                        onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                  {step.items && <p style={{ fontSize: '0.82rem', color: '#d19a66', margin: '0.2rem 0' }}>🎁 {step.items}</p>}
                  {step.tip && <p style={{ fontSize: '0.82rem', color: '#61afef', margin: '0.2rem 0' }}>💡 {step.tip}</p>}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
