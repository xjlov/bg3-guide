import React, { useState, useMemo, useCallback } from 'react';

// ============ 硬编码游戏数据 ============

const CLASS_DATA = {
  野蛮人: { hd: 12, primaryStat: 'STR', role: '狂暴坦克', armor: 'medium' },
  吟游诗人: { hd: 8, primaryStat: 'CHA', role: '全能辅助', armor: 'light' },
  牧师: { hd: 8, primaryStat: 'WIS', role: '治疗/法术', armor: 'medium' },
  德鲁伊: { hd: 8, primaryStat: 'WIS', role: '变形/控制', armor: 'medium' },
  战士: { hd: 10, primaryStat: 'STR', role: '物理输出', armor: 'heavy' },
  武僧: { hd: 8, primaryStat: 'DEX', role: '徒手连击', armor: 'none' },
  圣武士: { hd: 10, primaryStat: 'STR', role: '爆发/光环', armor: 'heavy' },
  游侠: { hd: 10, primaryStat: 'DEX', role: '远程/追踪', armor: 'medium' },
  游荡者: { hd: 8, primaryStat: 'DEX', role: '潜行/偷袭', armor: 'light' },
  术士: { hd: 6, primaryStat: 'CHA', role: '法术爆发', armor: 'none' },
  邪术师: { hd: 8, primaryStat: 'CHA', role: '魔能爆炮台', armor: 'light' },
  法师: { hd: 6, primaryStat: 'INT', role: '全能施法', armor: 'none' },
};

const STAT_NAMES = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const STAT_LABELS = {
  STR: '力量',
  DEX: '敏捷',
  CON: '体质',
  INT: '智力',
  WIS: '感知',
  CHA: '魅力',
};
const STAT_DESCRIPTIONS = {
  STR: '近战攻击/伤害, 负重, 跳跃距离',
  DEX: '远程攻击, AC(轻甲/无甲), 先攻, 敏捷豁免',
  CON: 'HP, 专注豁免, 体质豁免',
  INT: '法师施法, 调查/历史/奥秘技能',
  WIS: '牧师/德鲁伊施法, 感知, 察觉',
  CHA: '诗人/术士/邪术师施法, 社交技能',
};

const POINT_BUY_COST = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9, 16: 11, 17: 13 };
const RACIAL_BONUS_PATTERNS = [
  { label: '+2 / +1 (标准)', bonuses: [2, 1, 0, 0, 0, 0] },
  { label: '+1 / +1 / +1 (半精灵)', bonuses: [1, 1, 1, 0, 0, 0] },
  { label: '无加成', bonuses: [0, 0, 0, 0, 0, 0] },
];
const CLASS_SKILLS = {
  野蛮人: ['运动', '自然', '察觉', '生存', '威吓'],
  吟游诗人: ['运动', '特技', '巧手', '隐匿', '奥秘', '历史', '自然', '宗教', '调查', '察觉', '欺瞒', '威吓', '表演', '游说'],
  牧师: ['历史', '宗教', '医药', '察觉', '洞悉'],
  德鲁伊: ['运动', '自然', '察觉', '生存', '医药', '宗教', '驯兽', '洞悉'],
  战士: ['运动', '特技', '巧手', '隐匿', '察觉', '生存', '威吓', '驯兽'],
  武僧: ['运动', '特技', '隐匿', '历史', '宗教', '洞悉'],
  圣武士: ['运动', '察觉', '宗教', '威吓', '游说', '医药'],
  游侠: ['运动', '特技', '隐匿', '自然', '察觉', '生存', '驯兽', '调查', '洞悉'],
  游荡者: ['特技', '巧手', '隐匿', '调查', '察觉', '欺瞒', '威吓', '表演', '游说'],
  术士: ['奥秘', '欺瞒', '洞悉', '威吓', '游说', '宗教'],
  邪术师: ['奥秘', '欺瞒', '历史', '威吓', '自然', '宗教', '调查'],
  法师: ['奥秘', '历史', '宗教', '调查', '医药'],
};
const FEATS = [
  { name: '巨武器大师', desc: '重武器攻击-5命中/+10伤害; 击杀或重击时附赠动作攻击', requires: null },
  { name: '神射手', desc: '远程攻击-5命中/+10伤害; 忽略半掩体和四分之三掩体', requires: null },
  { name: '酒馆殴斗者', desc: '徒手/投掷/即兴武器攻击获得力量调整值双倍加值', requires: null },
  { name: '凶蛮打手', desc: '近战武器伤害骰掷两次取高', requires: null },
  { name: '警觉', desc: '+5先攻加值; 不会被突袭', requires: null },
  { name: '战地施法者', desc: '专注豁免获得优势', requires: '施法者' },
  { name: '双持客', desc: '双持非轻型武器; +1 AC(双持时); 可使用附赠动作双持攻击', requires: null },
  { name: '巨匠', desc: '任一属性+1(上限20)', requires: null },
  { name: '重甲熟练', desc: '获得重甲熟练', requires: null },
  { name: '中甲熟练', desc: '获得中甲熟练', requires: null },
  { name: '法师杀手', desc: '邻近敌人施法时触发借机攻击; 对专注者攻击优势; 对抗法术豁免优势', requires: null },
  { name: '长柄大师', desc: '长柄攻击后可附赠动作柄击; 敌人进入触及范围触发借机', requires: null },
  { name: '盾牌大师', desc: '对抗法术的敏捷豁免加值; 反应减半伤害→无伤害; 推撞附赠动作', requires: '盾牌熟练' },
  { name: '哨兵', desc: '借机攻击命中后目标速度归零; 邻近敌人脱离不减半速; 邻近敌人攻击队友时触发借机', requires: null },
  { name: '属性提升', desc: '任一属性+2 或 两项属性各+1', requires: null },
];

const SUBCLASSES = {
  野蛮人: ['狂战士', '荒野之心', '狂野魔法'],
  吟游诗人: ['逸闻学院', '勇气学院', '剑舞学院'],
  牧师: ['生命领域', '光明领域', '诡术领域', '知识领域', '自然领域', '风暴领域', '战争领域'],
  德鲁伊: ['月亮结社', '大地结社', '孢子结社'],
  战士: ['战斗大师', '冠军勇士', '奥法骑士'],
  武僧: ['散打宗', '暗影宗', '四象宗'],
  圣武士: ['奉献之誓', '古贤之誓', '复仇之誓', '弃誓者'],
  游侠: ['驯兽师', '猎人', '幽域追踪者'],
  游荡者: ['盗贼', '诡术师', '刺客'],
  术士: ['狂野魔法', '龙族血脉', '风暴术'],
  邪术师: ['魔能', '旧日支配者', '至高妖精'],
  法师: ['防护学派', '咒法学派', '预言学派', '附魔学派', '塑能学派', '幻术学派', '死灵学派', '变化学派'],
};

// ============ 辅助函数 ============

function calcMod(score) {
  return Math.floor((score - 10) / 2);
}

function getProficiencyBonus(level) {
  return Math.floor((level - 1) / 4) + 2;
}

function calcHP(hd, level, conMod) {
  const avgRoll = Math.floor(hd / 2) + 1;
  const pastLevels = (level - 1) * avgRoll;
  return hd + pastLevels + level * conMod;
}

function calcAC(armorType, dexMod) {
  switch (armorType) {
    case 'none':
      return 10 + dexMod;
    case 'light':
      return 12 + dexMod;
    case 'medium':
      return 15 + Math.min(dexMod, 2);
    case 'heavy':
      return 18;
    default:
      return 10 + dexMod;
  }
}

function calcAttackBonus(primaryStatMod, profBonus) {
  return primaryStatMod + profBonus;
}

function calcSpellDC(primaryStatMod, profBonus) {
  return 8 + primaryStatMod + profBonus;
}

// ============ 样式 ============

const containerStyle = {
  fontFamily: 'system-ui, -apple-system, "Microsoft YaHei", "PingFang SC", sans-serif',
  border: '1px solid var(--ifm-color-emphasis-300, #dadde1)',
  borderRadius: '12px',
  padding: '20px',
  background: 'var(--ifm-background-surface-color, var(--ifm-color-emphasis-0, #fff))',
  color: 'var(--ifm-font-color-base, #1c1e21)',
  maxWidth: '800px',
  margin: '0 auto',
};

const stepIndicatorStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '20px',
  flexWrap: 'wrap',
};

function stepBtnStyle(active, completed) {
  return {
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid var(--ifm-color-emphasis-300, #ccc)',
    background: active
      ? 'var(--ifm-color-primary, #2e8555)'
      : completed
        ? 'var(--ifm-color-primary-lightest, #d4e8d4)'
        : 'transparent',
    color: active ? '#fff' : completed
      ? 'var(--ifm-color-primary-darker, #1a5c3a)'
      : 'var(--ifm-font-color-base, #1c1e21)',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: active ? 'bold' : 'normal',
  };
}

const sectionStyle = {
  marginBottom: '20px',
  padding: '16px',
  border: '1px solid var(--ifm-color-emphasis-300, #e0e0e0)',
  borderRadius: '8px',
  background: 'var(--ifm-color-emphasis-100, #f5f5f5)',
};

const labelStyle = {
  display: 'block',
  fontWeight: '600',
  marginBottom: '4px',
  fontSize: '14px',
};

const grid2 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '10px',
};

const grid3 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '8px',
};

function cardBtnStyle(selected) {
  return {
    padding: '10px',
    border: selected
      ? '2px solid var(--ifm-color-primary, #2e8555)'
      : '1px solid var(--ifm-color-emphasis-300, #ccc)',
    borderRadius: '8px',
    background: selected ? 'var(--ifm-color-primary-lightest, #e6f4ec)' : 'var(--ifm-color-emphasis-0, #fff)',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '14px',
    transition: 'all 0.15s',
  };
}

const statPanelStyle = {
  padding: '16px',
  border: '1px solid var(--ifm-color-emphasis-300, #e0e0e0)',
  borderRadius: '8px',
  background: 'var(--ifm-color-emphasis-100, #f9f9f9)',
  position: 'sticky',
  top: '10px',
};

const statRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 0',
  fontSize: '14px',
  borderBottom: '1px solid var(--ifm-color-emphasis-200, #eee)',
};

// ============ 主组件 ============

export default function BuildSimulator() {
  // Step state
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const [level, setLevel] = useState(1);
  const [racialBonus, setRacialBonus] = useState(0);
  const [baseScores, setBaseScores] = useState({
    STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8,
  });
  const [subclass, setSubclass] = useState(null);
  const [selectedFeats, setSelectedFeats] = useState({});

  // Derived
  const classInfo = CLASS_DATA[selectedClass] || null;
  const primaryStat = classInfo ? classInfo.primaryStat : 'STR';
  const armorType = classInfo ? classInfo.armor : 'none';
  const profBonus = getProficiencyBonus(level);
  const hd = classInfo ? classInfo.hd : 8;

  // Apply racial bonuses
  const finalScores = useMemo(() => {
    const bonuses = RACIAL_BONUS_PATTERNS[racialBonus].bonuses;
    const result = {};
    STAT_NAMES.forEach((s, i) => {
      result[s] = Math.min(baseScores[s] + bonuses[i], 20);
    });
    return result;
  }, [baseScores, racialBonus]);

  const mods = useMemo(() => {
    const result = {};
    STAT_NAMES.forEach((s) => {
      result[s] = calcMod(finalScores[s]);
    });
    return result;
  }, [finalScores]);

  // Point buy totals
  const pointSpent = useMemo(() => {
    return STAT_NAMES.reduce((sum, s) => sum + POINT_BUY_COST[baseScores[s]], 0);
  }, [baseScores]);
  const pointsRemain = 27 - pointSpent;

  // Live stats
  const hp = calcHP(hd, level, mods.CON);
  const ac = calcAC(armorType, mods.DEX);
  const attackBonus = calcAttackBonus(mods[primaryStat], profBonus);
  const spellDC = calcSpellDC(mods[primaryStat], profBonus);
  const initiative = mods.DEX;

  // Feat levels
  const featLevels = [4, 8, 12].filter((l) => l <= level);

  // Handlers
  const chooseClass = useCallback((cls) => {
    setSelectedClass(cls);
    setSubclass(null);
    setSelectedFeats({});
  }, []);

  const changeBaseScore = useCallback((stat, delta) => {
    setBaseScores((prev) => {
      const newVal = prev[stat] + delta;
      if (newVal < 8 || newVal > 17) return prev;
      const wouldSpend = POINT_BUY_COST[newVal] - POINT_BUY_COST[prev[stat]];
      if (wouldSpend + pointSpent > 27) return prev;
      return { ...prev, [stat]: newVal };
    });
  }, [pointSpent]);

  const toggleFeat = useCallback((levelNum, featName) => {
    setSelectedFeats((prev) => {
      const next = { ...prev };
      if (next[levelNum] === featName) {
        delete next[levelNum];
      } else {
        next[levelNum] = featName;
      }
      return next;
    });
  }, []);

  return (
    <div style={containerStyle}>
      <h3 style={{ marginTop: 0, textAlign: 'center', color: 'var(--ifm-color-primary, #2e8555)' }}>
        BG3 Build 模拟器
      </h3>

      {/* Step indicator */}
      <div style={stepIndicatorStyle}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            style={stepBtnStyle(s === step, s < step)}
            onClick={() => setStep(s)}
          >
            {s === 1 && '① 职业'}
            {s === 2 && '② 等级'}
            {s === 3 && '③ 属性'}
            {s === 4 && '④ 子职'}
            {s === 5 && '⑤ 专长'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>
        <div>
          {/* ===== Step 1: Class Selection ===== */}
          {step === 1 && (
            <div style={sectionStyle}>
              <p style={labelStyle}>选择职业</p>
              <div style={grid2}>
                {Object.entries(CLASS_DATA).map(([name, info]) => (
                  <div
                    key={name}
                    style={cardBtnStyle(selectedClass === name)}
                    onClick={() => chooseClass(name)}
                    onMouseEnter={(e) => {
                      if (selectedClass !== name) {
                        e.target.style.borderColor = 'var(--ifm-color-primary-light, #7cb342)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedClass !== name) {
                        e.target.style.borderColor = 'var(--ifm-color-emphasis-300, #ccc)';
                      }
                    }}
                  >
                    <strong>{name}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--ifm-color-emphasis-600, #666)', marginTop: '4px' }}>
                      HD D{info.hd} | {STAT_LABELS[info.primaryStat]} | {info.role}
                    </div>
                  </div>
                ))}
              </div>
              {selectedClass && (
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--ifm-color-primary, #2e8555)' }}>
                  已选择: <strong>{selectedClass}</strong> — {classInfo.role}，主属性: {STAT_LABELS[primaryStat]}，护甲: {armorType === 'none' ? '无甲' : armorType === 'light' ? '轻甲' : armorType === 'medium' ? '中甲' : '重甲'}
                </p>
              )}
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <button
                  disabled={!selectedClass}
                  onClick={() => setStep(2)}
                  style={{
                    padding: '8px 24px',
                    background: selectedClass ? 'var(--ifm-color-primary, #2e8555)' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: selectedClass ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                  }}
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* ===== Step 2: Level Selection ===== */}
          {step === 2 && (
            <div style={sectionStyle}>
              <p style={labelStyle}>选择等级 (1-12)</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      border: level === l
                        ? '2px solid var(--ifm-color-primary, #2e8555)'
                        : '1px solid var(--ifm-color-emphasis-300, #ccc)',
                      background: level === l
                        ? 'var(--ifm-color-primary-lightest, #e6f4ec)'
                        : 'var(--ifm-color-emphasis-0, #fff)',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: level === l ? 'bold' : 'normal',
                      color: 'var(--ifm-font-color-base, #1c1e21)',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ifm-color-emphasis-600, #666)', lineHeight: '1.8' }}>
                <div>熟练加值: <strong>+{profBonus}</strong></div>
                <div>HD: <strong>D{hd}</strong> (期望HP约 {calcHP(hd, level, 0)})</div>
                <div>专长等级: <strong>{featLevels.length > 0 ? featLevels.join(', ') : '无'}</strong> (Lv4/8/12)</div>
                {level >= 3 && <div>子职业: <strong style={{ color: 'var(--ifm-color-primary, #2e8555)' }}>Lv3解锁</strong></div>}
              </div>
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--ifm-color-emphasis-400, #999)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    fontSize: '14px',
                    color: 'var(--ifm-font-color-base, #1c1e21)',
                  }}
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    padding: '8px 24px',
                    background: 'var(--ifm-color-primary, #2e8555)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* ===== Step 3: Point Buy ===== */}
          {step === 3 && (
            <div style={sectionStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ ...labelStyle, margin: 0 }}>购点分配属性 (27点制)</p>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: pointsRemain < 0 ? '#e33' : pointsRemain <= 3 ? '#e90' : 'var(--ifm-color-primary, #2e8555)',
                }}>
                  剩余: {pointsRemain} 点
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--ifm-color-emphasis-500, #888)', marginBottom: '10px' }}>
                成本: 8=0, 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9, 16=11, 17=13 | 范围: 8-17 | 种族加成在右侧选择
              </p>
              {STAT_NAMES.map((stat) => {
                const base = baseScores[stat];
                const bonus = RACIAL_BONUS_PATTERNS[racialBonus].bonuses[STAT_NAMES.indexOf(stat)];
                const final = finalScores[stat];
                const modVal = mods[stat];
                const isPrimary = stat === primaryStat;
                const cost = POINT_BUY_COST[base];
                return (
                  <div
                    key={stat}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                      padding: '8px',
                      borderRadius: '6px',
                      background: isPrimary ? 'var(--ifm-color-primary-lightest, #e6f4ec)' : 'transparent',
                    }}
                  >
                    <div style={{ width: '100px', flexShrink: 0 }}>
                      <strong style={{ fontSize: '14px' }}>
                        {STAT_LABELS[stat]}
                        {isPrimary && (
                          <span style={{ fontSize: '11px', color: 'var(--ifm-color-primary, #2e8555)', marginLeft: '4px' }}>
                            ★主属性
                          </span>
                        )}
                      </strong>
                      <div style={{ fontSize: '10px', color: 'var(--ifm-color-emphasis-500, #888)' }}>
                        {STAT_DESCRIPTIONS[stat]}
                      </div>
                    </div>
                    <button
                      onClick={() => changeBaseScore(stat, -1)}
                      disabled={base <= 8}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        border: '1px solid var(--ifm-color-emphasis-400, #aaa)',
                        background: 'transparent',
                        cursor: base <= 8 ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        opacity: base <= 8 ? 0.3 : 1,
                        color: 'var(--ifm-font-color-base, #1c1e21)',
                      }}
                    >−</button>
                    <div style={{ textAlign: 'center', minWidth: '50px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{base}</span>
                      {bonus > 0 && (
                        <span style={{ fontSize: '11px', color: 'var(--ifm-color-primary, #2e8555)' }}>
                          {' '}+{bonus} → {final}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => changeBaseScore(stat, 1)}
                      disabled={base >= 17 || POINT_BUY_COST[base + 1] === undefined || pointSpent + (POINT_BUY_COST[base + 1] - POINT_BUY_COST[base]) > 27}
                      style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        border: '1px solid var(--ifm-color-emphasis-400, #aaa)',
                        background: 'transparent',
                        cursor: (base >= 17 || pointSpent >= 27) ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        opacity: (base >= 17 || pointSpent >= 27) ? 0.3 : 1,
                        color: 'var(--ifm-font-color-base, #1c1e21)',
                      }}
                    >+</button>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: modVal >= 0 ? 'var(--ifm-color-primary, #2e8555)' : '#e33',
                      minWidth: '50px',
                      textAlign: 'center',
                    }}>
                      调整值 {modVal >= 0 ? '+' : ''}{modVal}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--ifm-color-emphasis-500, #888)', minWidth: '30px' }}>
                      花费{cost}点
                    </span>
                  </div>
                );
              })}
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--ifm-color-emphasis-400, #999)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    fontSize: '14px',
                    color: 'var(--ifm-font-color-base, #1c1e21)',
                  }}
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={pointsRemain < 0}
                  style={{
                    padding: '8px 24px',
                    background: pointsRemain < 0 ? '#ccc' : 'var(--ifm-color-primary, #2e8555)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: pointsRemain < 0 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                  }}
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* ===== Step 4: Subclass ===== */}
          {step === 4 && (
            <div style={sectionStyle}>
              <p style={labelStyle}>选择子职业 {level < 3 && '(Lv3 解锁，此处可预览)'}</p>
              {selectedClass && SUBCLASSES[selectedClass] ? (
                <div style={grid2}>
                  {SUBCLASSES[selectedClass].map((sub) => (
                    <div
                      key={sub}
                      style={cardBtnStyle(subclass === sub)}
                      onClick={() => setSubclass(sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#e33' }}>请先在步骤1选择职业</p>
              )}
              {subclass && (
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--ifm-color-primary, #2e8555)' }}>
                  已选择子职业: <strong>{subclass}</strong>
                </p>
              )}
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <button
                  onClick={() => setStep(3)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--ifm-color-emphasis-400, #999)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    fontSize: '14px',
                    color: 'var(--ifm-font-color-base, #1c1e21)',
                  }}
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setStep(5)}
                  style={{
                    padding: '8px 24px',
                    background: 'var(--ifm-color-primary, #2e8555)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* ===== Step 5: Feats ===== */}
          {step === 5 && (
            <div style={sectionStyle}>
              <p style={labelStyle}>选择专长 (等级 {featLevels.length > 0 ? featLevels.join(', ') : '无'} 可选)</p>
              {featLevels.length === 0 ? (
                <p style={{ color: '#999' }}>当前等级 ({level}) 无专长可选，Lv4/8/12解锁。</p>
              ) : (
                featLevels.map((lvl) => (
                  <div key={lvl} style={{ marginBottom: '16px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 8px 0' }}>
                      Lv {lvl} 专长选择: {selectedFeats[lvl] ? <span style={{ color: 'var(--ifm-color-primary, #2e8555)' }}>{selectedFeats[lvl]}</span> : '未选择'}
                    </p>
                    <div style={grid3}>
                      {FEATS.map((feat) => (
                        <div
                          key={feat.name}
                          style={{
                            ...cardBtnStyle(selectedFeats[lvl] === feat.name),
                            fontSize: '12px',
                            padding: '8px',
                          }}
                          onClick={() => toggleFeat(lvl, feat.name)}
                          title={feat.desc}
                        >
                          <strong>{feat.name}</strong>
                          <div style={{ fontSize: '10px', color: 'var(--ifm-color-emphasis-600, #666)', marginTop: '2px' }}>
                            {feat.desc.length > 30 ? feat.desc.slice(0, 30) + '...' : feat.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
              <div style={{ marginTop: '12px', textAlign: 'right' }}>
                <button
                  onClick={() => setStep(4)}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--ifm-color-emphasis-400, #999)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginRight: '8px',
                    fontSize: '14px',
                    color: 'var(--ifm-font-color-base, #1c1e21)',
                  }}
                >
                  ← 上一步
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===== Live Stat Panel ===== */}
        <div style={statPanelStyle}>
          <h4 style={{ margin: '0 0 12px 0', textAlign: 'center', fontSize: '15px', color: 'var(--ifm-color-primary, #2e8555)' }}>
            📊 实时属性面板
          </h4>
          {selectedClass ? (
            <>
              <div style={statRow}>
                <span>职业</span>
                <strong>{selectedClass} / {classInfo.role}</strong>
              </div>
              <div style={statRow}>
                <span>子职业</span>
                <strong>{subclass || '—'}</strong>
              </div>
              <div style={statRow}>
                <span>等级</span>
                <strong>{level}</strong>
              </div>
              <div style={statRow}>
                <span>熟练加值</span>
                <strong>+{profBonus}</strong>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--ifm-color-emphasis-300, #ddd)', margin: '8px 0' }} />
              <div style={statRow}>
                <span>❤️ HP</span>
                <strong style={{ color: '#e33', fontSize: '16px' }}>{hp}</strong>
              </div>
              <div style={statRow}>
                <span>🛡️ AC</span>
                <strong style={{ color: 'var(--ifm-color-primary, #2e8555)', fontSize: '16px' }}>{ac}</strong>
              </div>
              <div style={statRow}>
                <span>⚔️ 攻击加值</span>
                <strong>+{attackBonus}</strong>
              </div>
              <div style={statRow}>
                <span>🔮 法术DC</span>
                <strong>{spellDC}</strong>
              </div>
              <div style={statRow}>
                <span>⚡ 先攻</span>
                <strong>{initiative >= 0 ? '+' : ''}{initiative}</strong>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--ifm-color-emphasis-300, #ddd)', margin: '8px 0' }} />
              {STAT_NAMES.map((s) => (
                <div key={s} style={statRow}>
                  <span style={{ color: s === primaryStat ? 'var(--ifm-color-primary, #2e8555)' : 'inherit' }}>
                    {STAT_LABELS[s]}{s === primaryStat ? ' ★' : ''}
                  </span>
                  <strong>
                    {finalScores[s]} ({mods[s] >= 0 ? '+' : ''}{mods[s]})
                    {RACIAL_BONUS_PATTERNS[racialBonus].bonuses[STAT_NAMES.indexOf(s)] > 0 && (
                      <span style={{ fontSize: '10px', color: 'var(--ifm-color-primary, #2e8555)' }}>
                        {' '}({baseScores[s]}+{RACIAL_BONUS_PATTERNS[racialBonus].bonuses[STAT_NAMES.indexOf(s)]})
                      </span>
                    )}
                  </strong>
                </div>
              ))}
              {featLevels.length > 0 && (
                <>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--ifm-color-emphasis-300, #ddd)', margin: '8px 0' }} />
                  <div style={{ fontSize: '12px' }}>
                    <strong>专长:</strong>
                    {featLevels.map((l) => (
                      <span key={l} style={{ display: 'block', marginTop: '2px' }}>
                        Lv{l}: {selectedFeats[l] || '未选'}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p style={{ fontSize: '13px', color: '#999', textAlign: 'center', padding: '20px 0' }}>
              请先选择职业
            </p>
          )}
        </div>
      </div>

      {/* Racial bonus selector (below the main grid) */}
      {step === 3 && (
        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--ifm-color-emphasis-100, #f5f5f5)', borderRadius: '8px' }}>
          <p style={labelStyle}>种族属性加成模式</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {RACIAL_BONUS_PATTERNS.map((pattern, idx) => (
              <button
                key={idx}
                onClick={() => setRacialBonus(idx)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: racialBonus === idx
                    ? '2px solid var(--ifm-color-primary, #2e8555)'
                    : '1px solid var(--ifm-color-emphasis-300, #ccc)',
                  background: racialBonus === idx
                    ? 'var(--ifm-color-primary-lightest, #e6f4ec)'
                    : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: 'var(--ifm-font-color-base, #1c1e21)',
                }}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile-responsive media query handled via the grid auto-fill */}
    </div>
  );
}
