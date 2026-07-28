import React from 'react';
import Layout from '@theme/Layout';

const STYLES = {
  wrap: { maxWidth: 880, margin: '0 auto', padding: '2rem 1.5rem 4rem', color: '#ccc0b0', fontFamily: '"Noto Sans SC",system-ui,sans-serif', lineHeight: 1.8 },
  h1: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '2rem', fontWeight: 900, color: '#f0d060', margin: '0 0 0.3rem', letterSpacing: '0.04em' },
  h2: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0d060', borderBottom: '1px solid rgba(201,160,58,0.2)', paddingBottom: '0.4rem', marginTop: '2.5rem' },
  h3: { fontFamily: '"Cinzel","Noto Serif SC",Georgia,serif', fontSize: '1.05rem', fontWeight: 700, color: '#c9a03a', marginTop: '1.5rem' },
  card: { padding: '1.2rem 1.3rem', borderRadius: 10, background: 'rgba(22,18,38,0.7)', border: '1px solid rgba(201,160,58,0.15)', marginBottom: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse', margin: '1rem 0', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(201,160,58,0.15)' },
  th: { background: 'rgba(201,160,58,0.1)', fontWeight: 700, padding: '0.5rem 0.8rem', color: '#f0d060', fontSize: '0.82rem', fontFamily: '"Cinzel",serif', letterSpacing: '0.04em', textAlign: 'left' },
  td: { padding: '0.45rem 0.8rem', fontSize: '0.9rem', borderBottom: '1px solid rgba(201,160,58,0.06)' },
  pill: (bg, color) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 700, background: bg, color, marginLeft: 6 }),
};

function Table({ headers, rows }) {
  return React.createElement('table', { style: STYLES.table },
    React.createElement('thead', null, React.createElement('tr', null, headers.map(h => React.createElement('th', { key: h, style: STYLES.th }, h)))),
    React.createElement('tbody', null, rows.map((row, i) => React.createElement('tr', { key: i }, row.map((cell, j) => React.createElement('td', { key: j, style: STYLES.td }, cell)))))
  );
}

function Card({ children }) {
  return React.createElement('div', { style: STYLES.card }, children);
}

function HR() {
  return React.createElement('div', { style: { display:'flex',alignItems:'center',gap:10,margin:'1.8rem 0' } },
    React.createElement('span', { style: { flex:1,height:1,background:'linear-gradient(90deg,transparent,rgba(201,160,58,0.3))' } }),
    React.createElement('span', { style: { color:'#c9a03a',fontSize:'0.8rem' } }, '◆'),
    React.createElement('span', { style: { flex:1,height:1,background:'linear-gradient(90deg,rgba(201,160,58,0.3),transparent)' } }),
  );
}

const statsTable = [
  ['**力量 STR**', '近战命中/伤害、跳跃、负重', '战士、野蛮人、圣武士'],
  ['**敏捷 DEX**', '远程命中/伤害、AC、先攻、潜行', '游荡者、游侠、武僧'],
  ['**体质 CON**', 'HP、专注豁免', '所有人至少14'],
  ['**智力 INT**', '法师法术、调查/奥秘', '法师'],
  ['**感知 WIS**', '牧师/德鲁伊法术、察觉(发现陷阱)', '牧师、德鲁伊、武僧'],
  ['**魅力 CHA**', '术士/邪术师/诗人法术、所有对话', '术士、诗人、圣武士'],
];

const acTable = [
  ['无甲/布甲', '10 + 敏捷调整值', '敏捷16 → AC 13'],
  ['轻甲', '护甲值 + 敏捷调整值(全额)', '皮甲(11)+敏捷16(+3)→AC 14'],
  ['中甲', '护甲值 + 敏捷调整值(最高+2)', '半身甲(15)+敏捷14(+2)→AC 17'],
  ['重甲', '护甲值固定', '全身甲 = AC 18'],
];

export default function StartPage() {
  return React.createElement(Layout, { title: '新手上手指南', description: 'BG3 新手入门' },
    React.createElement('main', { style: { background: '#0a0a16', minHeight: '100vh' } },
      // Hero
      React.createElement('div', { style: { background: 'radial-gradient(ellipse 60% 30% at 50% 0%,rgba(201,160,58,0.05),transparent),linear-gradient(180deg,#0a0a16,#100f22,#0a0a16)', padding: '3rem 1.5rem 2.5rem', textAlign: 'center', borderBottom: '1px solid rgba(201,160,58,0.15)' } },
        React.createElement('span', { style: { fontSize: '2.4rem' } }, '📘'),
        React.createElement('h1', { style: { ...STYLES.h1, marginTop: '0.5rem' } }, '纯新手上手指南'),
        React.createElement('p', { style: { color: '#8b7355', maxWidth: 500, margin: '0.6rem auto 0' } }, '从零开始。属性、AC、骰子、法术位 — 所有核心术语逐条详解。第一小时手把手路线。'),
      ),

      React.createElement('div', { style: STYLES.wrap },
        // D20 Rule
        React.createElement('h2', { style: STYLES.h2 }, '核心规则：D20 骰子'),
        React.createElement(Card, null,
          React.createElement('p', { style: { margin: 0, fontSize: '1.05rem', textAlign: 'center', color: '#e8d5b7' } },
            React.createElement('strong', null, 'D20结果 + 属性加值 + 熟练加值 ≥ 难度等级(DC) → 成功'),
          ),
          React.createElement('p', { style: { margin: '0.8rem 0 0', fontSize: '0.9rem', color: '#b0a890', textAlign: 'center' } },
            '投出20 = 大成功（必定命中，攻击时暴击伤害翻倍）  |  投出1 = 大失败（必定失败）',
          ),
        ),

        React.createElement(HR),

        // 六大属性
        React.createElement('h2', { style: STYLES.h2 }, '六大属性'),
        React.createElement('p', { style: { fontSize: '0.88rem', color: '#b0a890', marginBottom: '0.8rem' } },
          React.createElement('em', null, '属性值 - 10 ÷ 2（向下取整）= 调整值。16 → +3，14 → +2，10 → +0，8 → -1'),
        ),
        React.createElement(Table, { headers: ['属性', '影响', '谁需要高'], rows: statsTable }),

        React.createElement(HR),

        // AC
        React.createElement('h2', { style: STYLES.h2 }, 'AC（护甲等级）'),
        React.createElement(Card, null,
          React.createElement('p', { style: { margin: '0 0 0.8rem', fontSize: '0.95rem' } },
            React.createElement('strong', null, 'AC = 你的防御数值。敌人攻击投骰 ≥ 你的AC = 被打中。'), ' AC越高越好，前期16正常，后期20+是重甲标配。',
          ),
          React.createElement(Table, { headers: ['护甲类型', 'AC计算', '示例'], rows: acTable }),
        ),

        React.createElement(HR),

        // HP, Spell Slots, Concentration
        React.createElement('h2', { style: STYLES.h2 }, 'HP / 法术位 / 专注'),
        React.createElement(Table, { headers: ['概念', '说明'], rows: [
          ['HP（生命值）', '0血=倒地需协助。完全负数=死亡。升级HP = 生命骰一半 + 体质调整值'],
          ['法术位', '施法消耗。1-6环消耗对应位。长休恢复。戏法(Cantrip)无限使用'],
          ['专注', '部分强力法术需要专注维持。只能同时专注1个。受到伤害→体质豁免→失败=法术中断'],
          ['法术DC', '8 + 施法属性调整值 + 熟练加值。敌人投豁免抵抗你的法术，需≥你的DC'],
        ]}),

        React.createElement(HR),

        // 优劣势
        React.createElement('h2', { style: STYLES.h2 }, '优劣势'),
        React.createElement(Card, null,
          React.createElement('p', { style: { margin: 0, fontSize: '0.95rem' } },
            '优势 = 骰两个D20取高（≈ +5加值）。劣势 = 骰两个D20取低（≈ -5惩罚）。',
          ),
          React.createElement('p', { style: { margin: '0.5rem 0 0', fontSize: '0.88rem', color: '#b0a890' } },
            '获得优势：隐匿攻击、攻击倒地敌人、高地打低地。  获得劣势：远程被近身、低地打高地、目盲/中毒。',
          ),
        ),

        React.createElement(HR),

        // 回合制资源
        React.createElement('h2', { style: STYLES.h2 }, '回合制战斗每回合资源'),
        React.createElement(Table, { headers: ['资源', '数量', '用途'], rows: [
          ['动作', '1次', '攻击、施法、疾走、推击'],
          ['附赠动作', '1次', '跳跃、喝药、副手攻击、推击 — 新手最常忘记用！'],
          ['移动', '~9m', '可拆分：移动→攻击→再移动'],
          ['反应', '1次/轮', '借机攻击、法术反制、护盾术'],
        ]}),

        React.createElement(HR),

        // 快捷键
        React.createElement('h2', { style: STYLES.h2 }, '操作速览'),
        React.createElement(Table, { headers: ['按键', '功能'], rows: [
          ['F5 / F8', '快速存档/读档'], ['Tab', '切换角色/队伍视角'], ['~', '高亮所有可交互物品'],
          ['Shift+空格', '手动切换回合制'], ['M', '地图'], ['I', '背包'], ['N', '角色面板'],
        ]}),

        React.createElement(HR),

        // 新手Build
        React.createElement('h2', { style: STYLES.h2 }, '新手推荐：战士（战斗大师）'),
        React.createElement(Table, { headers: ['优势', '说明'], rows: [
          ['无脑操作', '不需要管理法术位，攻击就行'],
          ['高防御', '全护甲熟练，前期AC 16-18'],
          ['高爆发', '2级动作如潮一回合两次攻击。11级三重额外攻击'],
          ['自疗', '回气每短休自回1D10+等级HP'],
          ['属性', 'STR 17 / DEX 10 / CON 16 / INT 8 / WIS 10 / CHA 10 + 种族+2 STR'],
        ]}),

        React.createElement(HR),

        // 第一小时路线
        React.createElement('h2', { style: STYLES.h2 }, '第一小时路线'),
        React.createElement('ol', { style: { paddingLeft: 20 } },
          [['鹦鹉螺号', '往前走捡东西，救影心（舱体），控制台→逃生舱'],
           ['坠机海滩', '搜刮一切。影心(北侧沙滩)、阿斯代伦(南侧小径)、盖尔(传送门伸手拉)'],
           ['德鲁伊林地', '和所有人对话。商人阿伦买+1武器和治疗药水。德里斯买防护戒指'],
           ['收队友', '林地训练场找威尔，北部笼子救莱埃泽尔，晋升之路河边找卡菈克']].map(([t,d]) =>
            React.createElement('li', { key: t, style: { marginBottom: '0.5rem' } },
              React.createElement('strong', { style: { color: '#f0d060' } }, t), ' — ', d))
        ),

        React.createElement('div', { style: { marginTop: '2rem', padding: '1rem', borderRadius: 8, background: 'rgba(209,154,102,0.06)', borderLeft: '3px solid #d19a66', fontSize: '0.9rem' } },
          React.createElement('strong', { style: { color: '#d19a66' } }, '⚠ 新手的6个保命习惯：'),
          React.createElement('p', { style: { margin: '0.4rem 0 0' } }, 'F5经常存档 · 按住~搜刮一切 · 和所有人说话 · 多长休 · 4人一起发展 · 别卖金装'),
        ),

        // Footer
        React.createElement('div', { style: { textAlign: 'center', padding: '2rem 0', fontSize: '0.8rem', color: '#555', borderTop: '1px solid rgba(201,160,58,0.08)', marginTop: '3rem' } },
          React.createElement('p', { style: { margin: 0 } }, '游戏版权归 Larian Studios 所有'),
        ),
      ),
    ),
  );
}
