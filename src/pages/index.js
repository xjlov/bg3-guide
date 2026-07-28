import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/custom.css';

const featureCards = [
  {
    emoji: '📘',
    title: '入门指南',
    description: '新手上路必备知识，角色创建、操作技巧、开局路线一站式指引',
    to: '/start',
  },
  {
    emoji: '⚔️',
    title: '职业Build',
    description: '5大热门Build详解 + 交互式Build模拟器，打造你的最强角色',
    to: '/builds',
  },
  {
    emoji: '📜',
    title: '任务攻略',
    description: '全三章主线与重要支线流程，关键抉择与隐藏奖励一网打尽',
    to: '/quests',
  },
  {
    emoji: '🗡️',
    title: '装备图鉴',
    description: '全装备数据库，支持筛选与搜索，传说装备获取指南',
    to: '/items',
  },
  {
    emoji: '🎯',
    title: '战斗机制',
    description: 'D&D 5E规则深度解析，荣誉模式通关秘籍与进阶战斗技巧',
    to: '/combat',
  },
  {
    emoji: '📋',
    title: '速查手册',
    description: '队友、BOSS、道具、机制速查，老玩家快速翻阅的工具站',
    to: '/compendium',
  },
];

export default function Home() {
  return (
    <Layout
      title="博德之门3攻略站"
      description="最全面的中文 BG3 攻略站 · Patch 7 最新版本">
      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            博德之门<span style={styles.goldText}>3</span>攻略站
          </h1>
          <p style={styles.heroTagline}>
            最全面的中文 BG3 攻略 · Patch 7 最新版本 · 持续更新中
          </p>
          <div style={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/start"
              style={styles.ctaPrimary}>
              🚀 新手上路
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/builds"
              style={styles.ctaSecondary}>
              ⚔️ 职业Build
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Feature Cards */}
        <section style={styles.featuresSection}>
          <div style={styles.featuresGrid}>
            {featureCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                style={styles.featureCard}>
                <div style={styles.cardEmoji}>{card.emoji}</div>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDesc}>{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Bar */}
        <section style={styles.statsBar}>
          <div style={styles.statsContent}>
            <span style={styles.statItem}>
              <strong>20</strong> 精修页
            </span>
            <span style={styles.statDivider}>·</span>
            <span style={styles.statItem}>
              <strong>3</strong> 交互工具
            </span>
            <span style={styles.statDivider}>·</span>
            <span style={styles.statItem}>
              <strong>93</strong> 装备图标
            </span>
            <span style={styles.statDivider}>·</span>
            <span style={styles.statItem}>
              <strong>5</strong> 游戏地图
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          个人非商业攻略分享 · 游戏版权归 Larian Studios 所有
        </p>
      </footer>
    </Layout>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '80px 24px 64px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: 720,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.2rem',
    fontWeight: 800,
    color: '#e0e0e0',
    marginBottom: 16,
    letterSpacing: 2,
  },
  goldText: {
    color: '#d4a843',
  },
  heroTagline: {
    fontSize: '1.15rem',
    color: '#aab',
    marginBottom: 36,
    lineHeight: 1.6,
  },
  heroButtons: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    borderRadius: 8,
    padding: '12px 28px',
    fontWeight: 600,
  },
  ctaSecondary: {
    borderRadius: 8,
    padding: '12px 28px',
    fontWeight: 600,
  },
  featuresSection: {
    padding: '64px 24px',
    maxWidth: 1100,
    margin: '0 auto',
  },
  featuresGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  featureCard: {
    flex: '1 1 300px',
    maxWidth: 340,
    minWidth: 280,
    background: '#1e1e2e',
    borderRadius: 12,
    padding: '28px 24px',
    textDecoration: 'none',
    color: 'inherit',
    border: '1px solid #2d2d44',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  cardEmoji: {
    fontSize: '2.4rem',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#e0d0a0',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: '0.92rem',
    color: '#99a',
    lineHeight: 1.55,
    margin: 0,
  },
  statsBar: {
    background: '#0f3460',
    padding: '32px 24px',
    textAlign: 'center',
  },
  statsContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    color: '#d0d0e0',
    fontSize: '1.05rem',
  },
  statItem: {
    whiteSpace: 'nowrap',
  },
  statDivider: {
    color: '#667',
    margin: '0 8px',
  },
  footer: {
    background: '#111122',
    padding: '28px 24px',
    textAlign: 'center',
  },
  footerText: {
    color: '#667',
    fontSize: '0.88rem',
    margin: 0,
  },
};
