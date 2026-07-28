import React from 'react';
import Layout from '@theme/Layout';

const STYLES = {
  wrap: { maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem', color: '#ccc0b0', fontFamily: '"Noto Sans SC",system-ui,sans-serif', lineHeight: 1.8 },
  h1: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '2rem', fontWeight: 900, color: '#f0d060', margin: '0 0 0.3rem', letterSpacing: '0.04em' },
  h2: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0d060', borderBottom: '1px solid rgba(201,160,58,0.2)', paddingBottom: '0.4rem', marginTop: '2.5rem' },
  card: { padding: '1rem 1.2rem', borderRadius: 10, background: 'rgba(22,18,38,0.7)', border: '1px solid rgba(201,160,58,0.15)', marginBottom: '0.8rem' },
  table: { width: '100%', borderCollapse: 'collapse', margin: '1rem 0', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(201,160,58,0.15)' },
  th: { background: 'rgba(201,160,58,0.1)', fontWeight: 700, padding: '0.5rem 0.8rem', color: '#f0d060', fontSize: '0.82rem', fontFamily: '"Cinzel",serif', letterSpacing: '0.04em', textAlign: 'left' },
  td: { padding: '0.45rem 0.8rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(201,160,58,0.06)' },
  btn: (bg, c) => ({ padding: '0.5rem 1.2rem', borderRadius: 6, background: bg, color: c, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'inline-block', margin: '0.3rem', border: bg === 'transparent' ? '1px solid rgba(201,160,58,0.3)' : 'none' }),
};

function Table({ headers, rows }) {
  return React.createElement('table', { style: STYLES.table },
    React.createElement('thead', null, React.createElement('tr', null, headers.map(h => React.createElement('th', { key: h, style: STYLES.th }, h)))),
    React.createElement('tbody', null, rows.map((r,i) => React.createElement('tr', { key: i }, r.map((c,j) => React.createElement('td', { key: j, style: STYLES.td }, c))))));
}

export default function BuildsPage() {
  return React.createElement(Layout, { title: '职业 & Build', description: 'BG3 最强 Build 推荐' },
    React.createElement('main', { style: { background: '#0a0a16', minHeight: '100vh' } },
      React.createElement('div', { style: { background: 'radial-gradient(ellipse 60% 30% at 50% 0%,rgba(201,160,58,0.05),transparent),linear-gradient(180deg,#0a0a16,#100f22,#0a0a16)', padding: '3rem 1.5rem 2rem', textAlign: 'center', borderBottom: '1px solid rgba(201,160,58,0.15)' } },
        React.createElement('span', { style: { fontSize: '2.4rem' } }, '⚔️'),
        React.createElement('h1', { style: { ...STYLES.h1, marginTop: '0.5rem' } }, '职业 & Build'),
        React.createElement('p', { style: { color: '#8b7355', maxWidth: 480, margin: '0.5rem auto 0' } }, '5大最强Build拆解 — 等级分配、属性购点、装备清单、战斗循环'),
      ),
      React.createElement('div', { style: STYLES.wrap },
        React.createElement('h2', { style: STYLES.h2 }, '5大Build速览'),
        React.createElement(Table, { headers: ['Build', '职业分配', '强度', '难度', '风格'], rows: [
          [React.createElement('a', { href: '/builds/open-hand-monk', style: { color: '#f0d060', fontWeight: 700 } }, '散打武僧'), '武僧9/游荡者3', 'S', '⭐⭐⭐', '徒手无双DPS'],
          [React.createElement('a', { href: '/builds/swords-bard', style: { color: '#f0d060', fontWeight: 700 } }, '剑舞诗人'), '诗人10/战士2', 'S', '⭐⭐⭐', '远程控制+队伍Face'],
          [React.createElement('a', { href: '/builds/throw-barbarian', style: { color: '#f0d060', fontWeight: 700 } }, '投掷野蛮人'), '蛮5/贼3/战4', 'S', '⭐⭐', '超高远程投掷DPS'],
          [React.createElement('a', { href: '/builds/battle-master', style: { color: '#f0d060', fontWeight: 700 } }, '战斗大师战士'), '战士12', 'A+', '⭐', '纯物理新手最佳'],
          [React.createElement('a', { href: '/builds/storm-sorcerer', style: { color: '#f0d060', fontWeight: 700 } }, '风暴术士'), '术士12 或 术10/牧2', 'A', '⭐⭐', '湿润闪电双倍秒杀'],
        ]}),

        React.createElement('h2', { style: STYLES.h2 }, '12职业速查'),
        React.createElement(Table, { headers: ['职业', 'HD', '主属性', '施法', '难度', '定位'], rows: [
          ['野蛮人','D12','力量','否','⭐','狂暴坦克'],['吟游诗人','D8','魅力','全环','⭐⭐⭐','万能辅助+Face'],
          ['牧师','D8','感知','全环','⭐⭐','治疗/辅助/光耀'],['德鲁伊','D8','感知','全环','⭐⭐','变身/控场'],
          ['战士','D10','力量','否','⭐','纯物理输出'],['武僧','D8','敏捷/感知','否','⭐⭐','徒手多段'],
          ['圣武士','D10','力量/魅力','半环','⭐⭐','爆发+光环'],['游侠','D10','敏捷/感知','半环','⭐⭐','远程输出'],
          ['游荡者','D8','敏捷','否','⭐⭐','潜行爆伤'],['术士','D6','魅力','全环','⭐⭐','超魔法爆发'],
          ['邪术师','D8','魅力','契约','⭐⭐⭐','魔能爆+短休'],['法师','D6','智力','全环','⭐⭐⭐','法术全能'],
        ]}),

        React.createElement('h2', { style: STYLES.h2 }, '推荐专长'),
        React.createElement(Table, { headers: ['专长', '效果', '推荐Build'], rows: [
          ['酒馆殴斗者','徒手/投掷攻击+力量调整值2次','散打武僧、投掷蛮'],
          ['巨武器大师','-5命中/+10伤害，击杀后附赠攻击','战斗大师'],
          ['神射手','-5命中/+10远程伤害','剑舞诗人'],
          ['警觉','+5先攻，免疫突袭','风暴术士'],
          ['战地施法者','专注豁免优势','所有施法者'],
        ]}),

        React.createElement('div', { style: { marginTop: '3rem', textAlign: 'center', padding: '1.5rem 0', fontSize: '0.8rem', color: '#555', borderTop: '1px solid rgba(201,160,58,0.08)' } },
          React.createElement('p', { style: { margin: 0 } }, '游戏版权归 Larian Studios 所有')),
      ),
    ),
  );
}
