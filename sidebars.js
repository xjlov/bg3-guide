export default {
  docsSidebar: [
    { type: 'doc', id: 'index', label: '🏠 首页' },
    {
      type: 'category', label: '📘 入门指南', collapsible: false,
      items: ['start', 'character', 'mechanics'],
    },
    {
      type: 'category', label: '⚔️ 职业 & Build', collapsible: false,
      items: ['builds', 'builds/open-hand-monk', 'builds/swords-bard', 'builds/throw-barbarian', 'builds/battle-master', 'builds/storm-sorcerer'],
    },
    {
      type: 'category', label: '📜 任务攻略', collapsible: false,
      items: ['quests', 'quests/act1', 'quests/act2', 'quests/act3'],
    },
    {
      type: 'category', label: '🗡️ 装备图鉴', collapsible: false,
      items: ['items', 'items/legendary', 'items/consumables'],
    },
    {
      type: 'category', label: '🎯 战斗机制', collapsible: false,
      items: ['combat', 'combat/honor-mode', 'combat/reference'],
    },
    {
      type: 'category', label: '📋 速查手册', collapsible: false,
      items: ['compendium', 'compendium/companions', 'compendium/bosses'],
    },
  ],
};
