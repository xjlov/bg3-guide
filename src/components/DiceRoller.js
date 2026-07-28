import React, { useState, useCallback } from 'react';

const DICE = [4, 6, 8, 10, 12, 20];
const PRESETS = [
  { label: '属性生成', dice: 6, count: 4, mode: 'dropLowest' },
  { label: '巨剑', dice: 6, count: 2 },
  { label: '火球术', dice: 6, count: 8 },
  { label: '至圣斩', dice: 8, count: 2 },
  { label: '掷先攻', dice: 4, count: 1 },
];

export default function DiceRoller() {
  const [dice, setDice] = useState(20);
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [mode, setMode] = useState('normal'); // normal | advantage | disadvantage
  const [results, setResults] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);

    // Animation
    let frames = 0;
    const maxFrames = 12;
    const interval = setInterval(() => {
      const tmp = [];
      for (let i = 0; i < count; i++) {
        tmp.push(Math.floor(Math.random() * dice) + 1);
      }
      if (mode === 'advantage' || mode === 'disadvantage') {
        const extra = [];
        for (let i = 0; i < count; i++) {
          extra.push(Math.floor(Math.random() * dice) + 1);
        }
        setResults({ rolls: tmp, rolls2: extra, final: false });
      } else {
        setResults({ rolls: tmp, final: false });
      }
      frames++;
      if (frames >= maxFrames) {
        clearInterval(interval);
        // Final roll
        const finalRolls = [];
        for (let i = 0; i < count; i++) {
          finalRolls.push(Math.floor(Math.random() * dice) + 1);
        }
        let total, finalRolls2;
        if (mode === 'advantage' || mode === 'disadvantage') {
          finalRolls2 = [];
          for (let i = 0; i < count; i++) {
            finalRolls2.push(Math.floor(Math.random() * dice) + 1);
          }
          const higher = finalRolls.map((r, i) => Math.max(r, finalRolls2[i]));
          const lower = finalRolls.map((r, i) => Math.min(r, finalRolls2[i]));
          total = mode === 'advantage'
            ? higher.reduce((a, b) => a + b, 0) + (count > 1 ? 0 : 0)
            : lower.reduce((a, b) => a + b, 0);
          // For single die advantage, result is the higher/lower
          if (count === 1) total = mode === 'advantage' ? Math.max(finalRolls[0], finalRolls2[0]) : Math.min(finalRolls[0], finalRolls2[0]);
          else total = (mode === 'advantage' ? higher : lower).reduce((a,b)=>a+b, 0);
          setResults({ rolls: finalRolls, rolls2: finalRolls2, mode, total: total + modifier, final: true });
        } else {
          total = finalRolls.reduce((a, b) => a + b, 0);
          setResults({ rolls: finalRolls, total: total + modifier, final: true });
        }
        setHistory(h => [{ dice, count, mode, modifier, rolls: finalRolls, rolls2: finalRolls2, total: total + modifier, finalRolls2 }, ...h].slice(0, 20));
        setRolling(false);
      }
    }, 60);
  }, [dice, count, modifier, mode, rolling]);

  const totalStyle = (t) => {
    if (!results?.final) return { color: '#f0d060' };
    if (dice === 20 && count === 1) {
      if (results.rolls[0] === 20) return { color: '#2ecc71', textShadow: '0 0 8px rgba(46,204,113,0.5)' };
      if (results.rolls[0] === 1) return { color: '#e74c3c', textShadow: '0 0 8px rgba(231,76,60,0.5)' };
    }
    return { color: '#f0d060' };
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
      borderRadius: 14,
      padding: '1.5rem',
      border: '1px solid rgba(201,160,58,0.2)',
      margin: '1.5rem 0',
    }}>
      <h3 style={{ margin: '0 0 1rem', color: '#f0d060' }}>🎲 骰子模拟器</h3>

      {/* Dice selection */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
        {DICE.map(d => (
          <button
            key={d}
            onClick={() => { setDice(d); setCount(1); }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 8,
              border: d === dice ? '2px solid #f0d060' : '1px solid rgba(201,160,58,0.3)',
              background: d === dice ? 'rgba(240,208,96,0.1)' : 'transparent',
              color: d === dice ? '#f0d060' : '#aaa',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >D{d}</button>
        ))}
      </div>

      {/* Quantity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', color: '#888' }}>数量：</span>
        <button onClick={() => setCount(c => Math.max(1, c - 1))} style={btnS}>−</button>
        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>{count}</span>
        <button onClick={() => setCount(c => Math.min(10, c + 1))} style={btnS}>+</button>

        <span style={{ marginLeft: '1rem', fontSize: '0.85rem', color: '#888' }}>加值：</span>
        <button onClick={() => setModifier(m => m - 1)} style={btnS}>−</button>
        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: modifier > 0 ? '#2ecc71' : modifier < 0 ? '#e74c3c' : undefined }}>
          {modifier >= 0 ? '+' : ''}{modifier}
        </span>
        <button onClick={() => setModifier(m => m + 1)} style={btnS}>+</button>
      </div>

      {/* Mode */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['normal', 'advantage', 'disadvantage'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: 6,
              border: mode === m ? '1px solid #f0d060' : '1px solid rgba(201,160,58,0.2)',
              background: mode === m ? 'rgba(240,208,96,0.1)' : 'transparent',
              color: mode === m ? '#f0d060' : '#888',
              cursor: 'pointer',
              fontSize: '0.82rem',
            }}
          >{{ normal: '普通', advantage: '优势', disadvantage: '劣势' }[m]}</button>
        ))}
      </div>

      {/* Roll button */}
      <button
        onClick={roll}
        disabled={rolling}
        style={{
          width: '100%',
          padding: '0.8rem',
          borderRadius: 10,
          border: 'none',
          background: rolling ? 'rgba(201,160,58,0.1)' : '#c9a03a',
          color: rolling ? '#666' : '#111',
          fontWeight: 900,
          fontSize: '1.1rem',
          cursor: rolling ? 'default' : 'pointer',
          marginBottom: '1rem',
        }}
      >
        {rolling ? '🎲 投掷中...' : `🎲 投 ${count}D${dice}${modifier ? (modifier > 0 ? '+' : '') + modifier : ''}`}
      </button>

      {/* Presets */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => { setDice(p.dice); setCount(p.count); setMode(p.mode || 'normal'); }}
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 6,
              border: '1px solid rgba(201,160,58,0.2)',
              background: 'transparent',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '0.78rem',
            }}
          >{p.label}</button>
        ))}
      </div>

      {/* Result */}
      {results && (
        <div style={{
          textAlign: 'center',
          padding: '1.2rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 10,
          marginBottom: '1rem',
        }}>
          <div style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.3rem' }}>
            {count}D{dice}{mode !== 'normal' ? (mode === 'advantage' ? ' 优势' : ' 劣势') : ''}{modifier ? (modifier > 0 ? ' + ' : ' - ') + Math.abs(modifier) : ''}
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 900, transition: 'color 0.2s', ...totalStyle(results.total) }}>
            {results.total}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.3rem' }}>
            {results.rolls.join(' + ')}
            {results.rolls2 && (
              <span style={{ color: '#666', fontSize: '0.78rem' }}>
                <br />
                {mode === 'advantage' ? '第二组: ' : '第二组: '}
                {results.rolls2.join(' + ')}
                {results.final && mode === 'advantage' && count === 1 && (
                  <span style={{ color: '#2ecc71' }}> → 取高: {Math.max(results.rolls[0], results.rolls2[0])}</span>
                )}
                {results.final && mode === 'disadvantage' && count === 1 && (
                  <span style={{ color: '#e74c3c' }}> → 取低: {Math.min(results.rolls[0], results.rolls2[0])}</span>
                )}
              </span>
            )}
            {modifier !== 0 && <span> {modifier > 0 ? '+' : '-'}{Math.abs(modifier)}</span>}
          </div>
          {results.final && dice === 20 && count === 1 && results.rolls[0] === 20 && (
            <div style={{ color: '#2ecc71', fontWeight: 700, marginTop: '0.3rem', fontSize: '0.9rem' }}>大成功！</div>
          )}
          {results.final && dice === 20 && count === 1 && results.rolls[0] === 1 && (
            <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.3rem', fontSize: '0.9rem' }}>大失败！</div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <details>
          <summary style={{ cursor: 'pointer', color: '#888', fontSize: '0.82rem' }}>投掷记录 ({history.length})</summary>
          <div style={{ maxHeight: 200, overflowY: 'auto', marginTop: '0.5rem' }}>
            {history.map((h, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.3rem 0.5rem',
                borderBottom: '1px solid rgba(201,160,58,0.08)',
                fontSize: '0.82rem',
                color: '#aaa',
              }}>
                <span>{h.count}D{h.dice}{h.mode !== 'normal' ? ' ' + (h.mode === 'advantage' ? '优势' : '劣势') : ''}{h.modifier ? ' ' + (h.modifier > 0 ? '+' : '') + h.modifier : ''}</span>
                <span style={{ fontWeight: 700, color: '#f0d060' }}>{h.total}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

const btnS = {
  width: 32, height: 32, borderRadius: '50%',
  border: '1px solid rgba(201,160,58,0.3)',
  background: 'transparent', color: '#aaa',
  cursor: 'pointer', fontSize: '1rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
