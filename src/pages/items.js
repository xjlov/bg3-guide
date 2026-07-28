import React from 'react';
import Layout from '@theme/Layout';

const S = {
  wrap: { maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem', color: '#ccc0b0', fontFamily: '"Noto Sans SC",system-ui,sans-serif', lineHeight: 1.8 },
  h1: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '2rem', fontWeight: 900, color: '#f0d060', margin: '0 0 0.3rem', letterSpacing: '0.04em' },
  h2: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0d060', borderBottom: '1px solid rgba(201,160,58,0.2)', paddingBottom: '0.4rem', marginTop: '2.5rem' },
  tbl: { width: '100%', borderCollapse: 'collapse', margin: '1rem 0', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(201,160,58,0.15)' },
  th: { background: 'rgba(201,160,58,0.1)', fontWeight: 700, padding: '0.5rem 0.8rem', color: '#f0d060', fontSize: '0.82rem', fontFamily: '"Cinzel",serif', letterSpacing: '0.04em', textAlign: 'left' },
  td: { padding: '0.45rem 0.8rem', fontSize: '0.88rem', borderBottom: '1px solid rgba(201,160,58,0.06)' },
};

const LEGENDARY = [
  { name:'博德安的巨人杀手', key:'Balduran_Giantslayer', type:'巨剑', dmg:'2D6+3 挥砍', eff:'对大体型目标自动优势', loc:'第三章·安苏尔试炼' },
  { name:'尼鲁纳（三叉戟）', key:'Nyrulna', type:'三叉戟', dmg:'1D6+3 +1D6 闪电', eff:'投掷自动返回；闪电冲击波', loc:'第三章·马戏团神灯' },
  { name:'贡特·毛之弓', key:'Gontr_Mael', type:'长弓', dmg:'1D8+3 穿刺', eff:'天界加速(短休)；对巨型+4D6', loc:'第三章·钢铁王座' },
  { name:'地狱骑士全身甲', key:'Helldusk_Armour', type:'重甲', dmg:null, eff:'AC 21；火焰抗性；火盾', loc:'第三章·希望之邸' },
  { name:'坚韧之甲', key:'Armour_of_Persistence', type:'重甲', dmg:null, eff:'AC 20；全伤害-2；免疫暴击', loc:'第三章·博德安试炼' },
  { name:'力量手套', key:'Gauntlets_of_Hill_Giant_Strength', type:'手套', dmg:null, eff:'力量固定为23', loc:'第三章·希望之邸' },
  { name:'俄耳甫斯之锤', key:'Orphic_Hammer', type:'战锤', dmg:'1D8+3 钝击', eff:'打破束缚；释放俄耳甫斯', loc:'第三章·希望之邸' },
  { name:'猩红恶作剧', key:'Crimson_Mischief', type:'匕首', dmg:'1D4+3 穿刺', eff:'偷袭追加；副手不衰减', loc:'第三章·巴尔神殿' },
];

function T({ headers, rows }) {
  return React.createElement('table', { style: S.tbl },
    React.createElement('thead', null, React.createElement('tr', null, headers.map(h => React.createElement('th', { key: h, style: S.th }, h)))),
    React.createElement('tbody', null, rows.map((r,i) => React.createElement('tr', { key: i }, r.map((c,j) => React.createElement('td', { key: j, style: S.td }, c))))));
}

export default function ItemsPage() {
  return React.createElement(Layout, { title: '装备图鉴', description: 'BG3 传说装备与配装指南' },
    React.createElement('main', { style: { background: '#0a0a16', minHeight: '100vh' } },
      React.createElement('div', { style: { background: 'radial-gradient(ellipse 60% 30% at 50% 0%,rgba(201,160,58,0.05),transparent),linear-gradient(180deg,#0a0a16,#100f22,#0a0a16)', padding: '3rem 1.5rem 2rem', textAlign: 'center', borderBottom: '1px solid rgba(201,160,58,0.15)' } },
        React.createElement('span', { style: { fontSize: '2.4rem' } }, '🗡️'),
        React.createElement('h1', { style: { ...S.h1, marginTop: '0.5rem' } }, '装备图鉴'),
        React.createElement('p', { style: { color: '#8b7355', maxWidth: 480, margin: '0.5rem auto 0' } }, '传说装备属性与获取 · 95件游戏原版图标 · 毕业配装速查'),
      ),
      React.createElement('div', { style: S.wrap },
        React.createElement('h2', { style: S.h2 }, '传说武器 & 装备'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } },
          ...LEGENDARY.map(item =>
            React.createElement('div', { key: item.name, style: { display: 'flex', gap: '0.8rem', padding: '0.7rem 0.9rem', borderRadius: 10, background: 'rgba(22,18,38,0.7)', border: '1px solid rgba(243,156,18,0.2)', alignItems: 'center' } },
              React.createElement('div', { style: { width: 44, height: 44, borderRadius: 8, background: 'rgba(0,0,0,0.4)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('img', { src: `/img/items/${item.key}_Icon.png`, alt: item.name, style: { width: 40, height: 40, objectFit: 'contain' }, onError: (e) => { e.target.style.display = 'none'; } }),
              ),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' } },
                  React.createElement('strong', { style: { color: '#e8d5b7', fontSize: '0.92rem' } }, item.name),
                  React.createElement('span', { style: { padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'rgba(243,156,18,0.15)', color: '#f39c12' } }, '传说'),
                ),
                React.createElement('div', { style: { fontSize: '0.78rem', color: '#b0a890', marginTop: 2 } },
                  (item.dmg ? '🗡️ ' + item.dmg + ' ' : '') + item.eff,
                ),
                React.createElement('div', { style: { fontSize: '0.72rem', color: '#8b7355', marginTop: 2 } }, '📍 ' + item.loc),
              ),
            )
          ),
        ),

        React.createElement('h2', { style: S.h2 }, '毕业配装速查 — 散打武僧'),
        React.createElement(T, { headers: ['槽位','装备','获取'], rows: [
          ['头盔','残暴头盔','第二章 月出之塔'],['衣服','灵魂捕捉者之袍','第三章'],
          ['手套','灵魂捕捉手套','第三章 希望之邸'],['靴子','冲刺之靴','第三章 飞龙岩'],
          ['戒指1','碎击者戒指','第一章 地精营地'],['戒指2','无情光环戒指','第一章 养育间'],
          ['项链','25力量护符','第一章 幽暗地域'],
        ]}),

        React.createElement('h2', { style: S.h2 }, '精金熔炉锻造'),
        React.createElement(T, { headers: ['模具','产出','推荐'], rows: [
          ['板甲模具','精金板甲(AC18,免疫暴击)','⭐⭐⭐ 优先'],['鳞甲模具','精金鳞甲(AC16,DEX+2)','⭐⭐'],
          ['盾牌模具','精金盾牌','⭐⭐'],['长剑模具','精金长剑','⭐'],
        ]}),
        React.createElement('p', { style: { fontSize: '0.85rem', color: '#b0a890' } }, '只有2块秘银矿！推荐：重甲角色=板甲+盾牌，敏系=鳞甲×2。'),

        React.createElement('div', { style: { marginTop: '3rem', textAlign: 'center', padding: '1.5rem 0', fontSize: '0.8rem', color: '#555', borderTop: '1px solid rgba(201,160,58,0.08)' } },
          React.createElement('p', { style: { margin: 0 } }, '游戏版权归 Larian Studios 所有')),
      ),
    ),
  );
}
