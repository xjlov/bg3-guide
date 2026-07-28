import React, { useRef, useCallback } from 'react';

/** Glass-morphism card with magnetic hover tilt, fade-up entry */
export default function ContentCard({ icon, title, children, to, delay = 0 }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(600px) rotateY(${x * 0.025}deg) rotateX(${-y * 0.025}deg) translateY(-3px)`;
    el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,160,58,0.3)';
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = '';
      ref.current.style.boxShadow = '';
    }
  }, []);

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        padding: '1.4rem 1.5rem',
        borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(22,18,38,0.85), rgba(20,20,40,0.7))',
        border: '1px solid rgba(201,160,58,0.12)',
        transition: 'transform 0.2s ease-out, box-shadow 0.3s, border-color 0.3s',
        animation: `fadeUp 0.5s ease both`,
        animationDelay: `${delay}s`,
      }}
    >
      {icon && <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>}
      {title && <h3 style={{ fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '1.15rem', fontWeight: 700, color: '#f0d060', margin: '0 0 0.6rem', letterSpacing: '0.03em' }}>{title}</h3>}
      <div style={{ fontSize: '0.92rem', color: '#b0a890', lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  if (to) {
    return <a href={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{inner}</a>;
  }
  return inner;
}
