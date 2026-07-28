import React, { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '@theme/Layout';

/* ================================================================
   BG3 Guide — Custom Homepage
   Dark fantasy theme: D20 float, particles, magnetic cards, tabs
   ================================================================ */

const TABS = [
  { key: 'start', label: '入门指南', icon: '📘',
    title: '纯新手上手指南',
    desc: '从零开始。属性、AC、骰子、法术位、豁免、专注——所有核心术语逐条详解。第一小时手把手路线，角色创建决策树。',
    links: [{ label: '开始阅读 →', to: '/start' }, { label: '角色创建 →', to: '/character' }, { label: '核心机制 →', to: '/mechanics' }] },
  { key: 'builds', label: '职业 Build', icon: '⚔️',
    title: '5 大最强 Build 拆解',
    desc: '散打武僧、剑舞诗人、投掷蛮子、战斗大师、风暴术士。等级分配 + 属性购点 + 装备清单，附带 Build 模拟器一键配点。',
    links: [{ label: '查看 Build →', to: '/builds' }, { label: '散打武僧 →', to: '/builds/open-hand-monk' }, { label: 'Build 模拟器 →', to: '/builds' }] },
  { key: 'quests', label: '任务攻略', icon: '📜',
    title: '全三章主线流程',
    desc: '序章到终章完整攻略。关键抉择后果、隐藏物品、可错过内容、Boss 战策略全部标出。不遗漏任何重要支线。',
    links: [{ label: '第一章 →', to: '/quests/act1' }, { label: '第二章 →', to: '/quests/act2' }, { label: '第三章 →', to: '/quests/act3' }] },
  { key: 'items', label: '装备图鉴', icon: '🗡️',
    title: '传说装备 & 配装指南',
    desc: '毕业配装速查表。传说装备属性与获取路线。精金熔炉锻造教学。95 件游戏原版装备图标。消耗品与药水全解析。',
    links: [{ label: '装备查询 →', to: '/items' }, { label: '传说装备 →', to: '/items/legendary' }, { label: '消耗品 →', to: '/items/consumables' }] },
  { key: 'combat', label: '战斗机制', icon: '🎯',
    title: '动作经济 & 团队连招',
    desc: '加速术 + 动作如潮 + 嗜血灵药 = 一回合多次攻击。5 大团队连招。荣誉模式全 Boss 传奇动作与通关策略。骰子模拟器。',
    links: [{ label: '战斗指南 →', to: '/combat' }, { label: '荣誉模式 →', to: '/combat/honor-mode' }, { label: '骰子模拟器 →', to: '/combat' }] },
  { key: 'compendium', label: '速查手册', icon: '📋',
    title: '同伴好感 + Boss 图鉴',
    desc: '10 名同伴完整数据：招募、好感度（赞同/反对）、恋爱条件。16 个 Boss 属性与战术。属性速查、AC 计算、法术位表。',
    links: [{ label: '同伴大全 →', to: '/compendium/companions' }, { label: 'Boss 图鉴 →', to: '/compendium/bosses' }] },
];

/* ---- Particles ---- */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h;
    const particles = [];
    const resize = () => {
      w = c.width = c.parentElement.offsetWidth;
      h = c.height = c.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
      });
    }
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,160,58,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return React.createElement('canvas', { ref: canvasRef, style: { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 } });
}

/* ---- Floating D20 SVG ---- */
function FloatingD20() {
  const svgRef = useRef(null);
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    let angle = 0;
    const animate = () => {
      angle += 0.3;
      const y = Math.sin(angle * 0.02) * 6;
      el.style.transform = `translateY(${y}px) rotate(${angle * 0.1}deg)`;
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  return React.createElement('svg', {
    ref: svgRef,
    viewBox: '0 0 100 100',
    style: { width: 90, height: 90, filter: 'drop-shadow(0 0 22px rgba(240,208,96,0.3))', margin: '0 auto', display: 'block', zIndex: 1, position: 'relative' },
    children: [
      React.createElement('polygon', { key: 'a', points: '50,4 80,22 72,70 28,70 20,22', fill: 'none', stroke: '#f0d060', strokeWidth: 2.5 }),
      React.createElement('polygon', { key: 'b', points: '50,8 75,24 68,66 32,66 25,24', fill: 'rgba(201,160,58,0.07)', stroke: '#c9a03a', strokeWidth: 1 }),
      React.createElement('text', { key: 'c', x: '50', y: '56', textAnchor: 'middle', fill: '#f0d060', fontSize: '30', fontWeight: 900, fontFamily: 'Georgia,serif' }, '20'),
    ],
  });
}

/* ---- Magnetic Card ---- */
function MagneticCard({ children, className = '' }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(600px) rotateY(${x * 0.02}deg) rotateX(${-y * 0.02}deg) translateY(-2px)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);
  return React.createElement('div', { ref, className, onMouseMove: handleMove, onMouseLeave: handleLeave, style: { transition: 'transform 0.15s ease-out, box-shadow 0.25s, border-color 0.25s' } }, children);
}

/* ---- Tab Button ---- */
function TabBtn({ tab, active, onClick }) {
  return React.createElement('button', {
    onClick: () => onClick(tab.key),
    style: {
      padding: '0.6rem 1.2rem', borderRadius: 8, border: active ? '2px solid #f0d060' : '1px solid rgba(201,160,58,0.2)',
      background: active ? 'rgba(201,160,58,0.1)' : 'transparent', color: active ? '#f0d060' : '#888',
      fontWeight: active ? 700 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
      fontFamily: 'inherit',
    },
    onMouseEnter: (e) => { if (!active) { e.target.style.borderColor = 'rgba(201,160,58,0.5)'; e.target.style.color = '#ccc'; } },
    onMouseLeave: (e) => { if (!active) { e.target.style.borderColor = 'rgba(201,160,58,0.2)'; e.target.style.color = '#888'; } },
    children: [React.createElement('span', { key: 'i', style: { fontSize: '1.1rem' } }, tab.icon + ' '), tab.label],
  });
}

/* ---- Playground ---- */
export default function Home() {
  const [activeTab, setActiveTab] = useState('start');
  const current = TABS.find(t => t.key === activeTab) || TABS[0];
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return React.createElement(Layout, { title: '博德之门三攻略站', description: '最全面的 BG3 中文攻略' },
    React.createElement('main', { style: { background: '#0a0a16', minHeight: '100vh', fontFamily: '"Noto Sans SC",system-ui,sans-serif', color: '#ccc0b0' } },

      /* ======== HERO ======== */
      React.createElement('section', {
        style: {
          position: 'relative', overflow: 'hidden',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,160,58,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 90%, rgba(139,105,20,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 75% 80%, rgba(201,160,58,0.04) 0%, transparent 60%), linear-gradient(180deg, #0a0a16 0%, #100f22 50%, #0a0a16 100%)',
          padding: '5rem 1.5rem 4rem', textAlign: 'center', borderBottom: '1px solid rgba(201,160,58,0.15)',
        },
        children: [
          React.createElement(ParticleField, { key: 'p' }),
          React.createElement('div', { key: 'c', style: { position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' } },
            React.createElement(FloatingD20, { key: 'd20' }),
            React.createElement('h1', {
              key: 'h1',
              style: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, color: '#e8d5b7', margin: '1.2rem 0 0.3rem', letterSpacing: '0.05em', lineHeight: 1.15 },
              children: ['博德之门', React.createElement('span', { key: 'g', style: { color: '#f0d060', textShadow: '0 0 40px rgba(240,208,96,0.3)' } }, '三'), '攻略站'],
            }),
            React.createElement('p', { key: 'sub', style: { fontSize: '1.05rem', color: '#7a7a8a', maxWidth: 520, margin: '0.8rem auto 1.6rem', lineHeight: 1.8 },
              children: ['从入门到精通 — 最全面的 Baldur\'s Gate 3 中文攻略', React.createElement('br', { key: 'br' }), 'Patch 7 · 纯新手友好 · Build 拆解 · 装备图鉴'],
            }),
            React.createElement('div', { key: 'btns', style: { display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' },
              children: [
                React.createElement('a', { key: 'a', href: '/start', style: { padding: '0.7rem 1.8rem', borderRadius: 6, background: '#c9a03a', color: '#0a0a16', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 2px 14px rgba(201,160,58,0.25)' } }, '🚀 新手上路'),
                React.createElement('a', { key: 'b', href: '/builds', style: { padding: '0.7rem 1.8rem', borderRadius: 6, background: 'rgba(201,160,58,0.08)', border: '1px solid rgba(201,160,58,0.3)', color: '#f0d060', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' } }, '⚔️ Build 推荐'),
              ],
            }),
          ),
        ],
      }),

      /* ======== TAB BAR ======== */
      React.createElement('section', {
        style: { padding: '2.5rem 1.5rem 1.5rem', textAlign: 'center' },
        children: [
          React.createElement('div', {
            key: 'tabs',
            style: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' },
            children: TABS.map(t => React.createElement(TabBtn, { key: t.key, tab: t, active: activeTab === t.key, onClick: setActiveTab })),
          }),
        ],
      }),

      /* ======== TAB CONTENT ======== */
      React.createElement('section', {
        key: 'content',
        style: { padding: '0 1.5rem 4rem', maxWidth: 1100, margin: '0 auto' },
        children: [
          React.createElement('div', {
            key: 'panel',
            style: {
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem',
              animation: 'fadeUp 0.35s ease',
            },
            children: [
              /* Info card */
              React.createElement(MagneticCard, {
                key: 'info',
                className: 'hero-card',
                style: {
                  gridColumn: '1 / -1', padding: '2rem', borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(22,16,38,0.9), rgba(20,20,40,0.8))',
                  border: '1px solid rgba(201,160,58,0.15)',
                },
                children: [
                  React.createElement('div', { key: 'ic', style: { fontSize: '2.4rem', marginBottom: '0.6rem' } }, current.icon),
                  React.createElement('h2', { key: 'h', style: { margin: '0 0 0.6rem', fontSize: '1.6rem', color: '#f0d060', fontWeight: 700 } }, current.title),
                  React.createElement('p', { key: 'd', style: { margin: '0 0 1rem', fontSize: '0.95rem', color: '#99a', lineHeight: 1.8 } }, current.desc),
                  React.createElement('div', { key: 'ls', style: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
                    children: current.links.map((l, i) =>
                      React.createElement('a', { key: i, href: l.to, style: { color: '#c9a03a', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', borderBottom: '1px dotted rgba(201,160,58,0.4)', paddingBottom: 2, transition: 'border 0.2s' } }, l.label)
                    ),
                  }),
                ],
              }),
              /* Smaller highlight cards */
              ...TABS.filter(t => t.key !== activeTab).slice(0, 4).map((t, i) =>
                React.createElement('a', {
                  key: t.key,
                  href: '/' + (t.key === 'start' ? 'start' : t.key),
                  onClick: (e) => { e.preventDefault(); setActiveTab(t.key); },
                  style: {
                    display: 'block', padding: '1.2rem', borderRadius: 10,
                    background: 'rgba(22,33,62,0.4)', border: '1px solid rgba(201,160,58,0.08)',
                    textDecoration: 'none', color: 'inherit', cursor: 'pointer',
                    transition: 'all 0.25s', animationDelay: `${i * 0.08}s`,
                  },
                  onMouseEnter: (e) => { e.currentTarget.style.borderColor = 'rgba(201,160,58,0.3)'; e.currentTarget.style.background = 'rgba(22,33,62,0.7)'; },
                  onMouseLeave: (e) => { e.currentTarget.style.borderColor = 'rgba(201,160,58,0.08)'; e.currentTarget.style.background = 'rgba(22,33,62,0.4)'; },
                  children: [
                    React.createElement('div', { key: 'ic', style: { fontSize: '1.5rem', marginBottom: '0.4rem' } }, t.icon),
                    React.createElement('h4', { key: 'h', style: { margin: '0 0 0.3rem', fontSize: '1rem', color: '#f0d060' } }, t.label),
                    React.createElement('p', { key: 'd', style: { margin: 0, fontSize: '0.8rem', color: '#7a7a8a', lineHeight: 1.6 } },
                      t.desc.length > 80 ? t.desc.slice(0, 80) + '…' : t.desc),
                  ],
                })
              ),
            ],
          }),
        ],
      }),

      /* Footer */
      React.createElement('footer', {
        style: { textAlign: 'center', padding: '1.8rem', fontSize: '0.8rem', color: '#555', borderTop: '1px solid rgba(201,160,58,0.08)' },
        children: [React.createElement('p', { key: 'p', style: { margin: 0 } }, '个人非商业攻略分享 · 游戏版权归 Larian Studios 所有')],
      }),
    ),
  );
}
