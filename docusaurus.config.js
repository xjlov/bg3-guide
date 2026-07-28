const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '博德之门三攻略站',
  tagline: '最全的中文BG3攻略 —— 从入门到精通',
  favicon: 'img/favicon.svg',
  url: 'https://xjmonika-bg3.fun',
  baseUrl: '/',
  organizationName: 'xjlov',
  projectName: 'bg3-guide',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'zh-CN', locales: ['zh-CN'] },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    metadata: [{ name: 'keywords', content: '博德之门3, BG3, 攻略, Baldur\'s Gate 3, 中文攻略' }],
    navbar: {
      title: '博德之门三攻略站',
      logo: { alt: 'BG3', src: 'img/logo.svg' },
      items: [
        { to: '/start', label: '入门', position: 'left' },
        { to: '/builds', label: 'Build', position: 'left' },
        { to: '/quests', label: '任务', position: 'left' },
        { to: '/items', label: '装备', position: 'left' },
        { to: '/combat', label: '战斗', position: 'left' },
        { to: '/compendium', label: '速查', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '攻略板块',
          items: [
            { label: '新手上路', to: '/start' },
            { label: '职业Build', to: '/builds' },
            { label: '任务攻略', to: '/quests' },
          ],
        },
        {
          title: '工具',
          items: [
            { label: '装备筛选', to: '/items' },
            { label: 'Build模拟器', to: '/builds' },
            { label: '骰子模拟器', to: '/combat' },
          ],
        },
        {
          title: '关于',
          items: [
            { label: 'GitHub', href: 'https://github.com/xjmon/bg3-guide' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} · 个人非商业攻略分享 · 游戏版权归 Larian Studios 所有`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
  },
};

module.exports = config;
