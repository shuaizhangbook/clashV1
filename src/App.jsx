import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Activity, Shield, Zap, Globe, Clock, ChevronRight,
  Lock, Bell, X, Check, CreditCard, Download, Upload,
  LogOut, Settings, User, Menu, Search, LayoutDashboard,
  Wifi, Smartphone, RefreshCw, ChevronDown, Languages, Headphones, Crown,
  Wallet, Gift, ShoppingCart, BookOpen, FileText, LifeBuoy, HelpCircle,
  Copy, Link2, ChevronUp, Sliders, ClipboardList, ScrollText, ShieldCheck
} from 'lucide-react';
import { CONFIG, getConfig, isMobile } from './config';

// --- Configuration & Constants ---
// (Using imported CONFIG from ./config.js for consistent 3D settings)

const translations = {
  en: {
    title: 'ArgusVPN',
    logout: 'Sign Out',
    status: 'Status',
    online: 'ONLINE',
    offline: 'OFFLINE',
    plan: 'Current Plan',
    expires: 'Expires',
    renew: 'Renew / Upgrade',
    traffic: 'Traffic',
    devices: 'Devices',
    wallet: 'Wallet',
    welcome: 'Welcome back, Agent.',
    connected: 'CONNECTED',
    disconnected: 'DISCONNECTED',
    quickConnect: 'Quick Connect',
    disconnect: 'Disconnect',
    latency: 'Latency',
    packetLoss: 'Packet Loss',
    account: 'Account',
    language: 'Language',
    // Sidebar Navigation - New IA
    navMain: 'MAIN',
    navMy: 'MY',
    navUsage: 'USAGE',
    navSupport: 'SECURITY & SUPPORT',
    dashboard: 'Dashboard',
    store: 'Store / Plans',
    connect: 'Connect',
    speed: 'Connection Speed',
    servers: 'Server List',
    myAccount: 'My Account',
    myWallet: 'My Wallet',
    referral: 'Referral Program',
    downloads: 'Downloads & Guides',
    subscription: 'Subscription Import',
    nodeSettings: 'Node Settings',
    logs: 'Logs Center',
    securityCenter: 'Security Center',
    auditSystem: 'Audit System',
    supportTickets: 'Support Tickets / Help Center',
    notifications: 'Notifications',
    settings: 'Settings',
    // Alert Banner
    planExpired: 'Plan Expired',
    planExpiring: 'Plan Expiring Soon',
    expiredBanner: 'Plan expired · Cannot connect to nodes · Renew now',
    expiringBanner: 'expires in',
    expiringDiscount: 'days · Renew early for 10% off',
    renewNow: 'Renew Now',
    viewDetails: 'View Details',
    // Hero Card
    annualMember: 'Annual Elite Member',
    unlimitedAccess: 'Unlimited Access • Global Nodes',
    daysRemaining: 'Days',
    expired: 'EXPIRED',
    cycleUsage: 'Cycle Usage (Reset: Jan 1)',
    renewUpgrade: 'Renew / Upgrade',
    // Row 2: Status Cards
    statusCard: 'STATUS',
    currentServer: 'Current Server',
    notConnected: 'Not Connected',
    lastSpeedTest: 'Last Speed Test',
    announcementsCard: 'ANNOUNCEMENTS',
    viewAllAnnouncements: 'View All Announcements',
    securityRiskCard: 'SECURITY RISK',
    dnsLeakProtection: 'DNS Leak Protection',
    killSwitch: 'Kill Switch',
    enabled: 'Enabled',
    disabled: 'Disabled',
    abnormalLogins: 'Abnormal Logins (24h)',
    times: 'Times',
    goToSecurityCenter: 'Go to Security Center',
    // Row 3: Analytics
    trafficUsage: 'Traffic Usage',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    cycleUsed: 'Cycle Used',
    estimatedDepletion: 'Est. Depleted',
    changeServer: 'Change',
    load: 'Load',
    protocol: 'Protocol',
    connectionLogs: 'Connection Logs',
    viewAllLogs: 'View All Logs',
    duration: 'Duration',
    // Row 4: Guidance Layer
    subscriptionImport: 'Subscription Import',
    importDescription: 'One-click import subscription link based on your client',
    oneClickImport: 'One-Click Import',
    availableDomains: 'Available Access Domains',
    viewAllDomains: 'View All Domains',
    quickHelp: 'Quick Help',
    faq1: 'Why can\'t I connect / slow speed?',
    faq1Answer: 'Please check your network connection and try switching to a different server node. If the problem persists, contact support.',
    faq2: 'How to import subscription on iOS / Mac?',
    faq2Answer: 'Download the corresponding client (Shadowrocket/ClashX), then click the one-click import button above to automatically configure.',
    faq3: 'Device limit reached, how to unbind?',
    faq3Answer: 'Go to Account Settings > Online Devices, select the device you want to unbind and click Remove.',
    viewFullGuide: 'View full guide in Help Center',
    copied: 'Copied!',
    copy: 'Copy',
    // Help Center Page
    helpCenterTitle: 'Help Center',
    searchPlaceholder: 'Search for questions...',
    categoryAll: 'All',
    categoryGettingStarted: 'Getting Started',
    categoryBilling: 'Plans & Billing',
    categoryClients: 'Client Tutorials',
    categoryTroubleshooting: 'Troubleshooting',
    categoryOther: 'Other',
    hotQuestion: 'Hot',
    clientDownloads: 'Client Downloads',
    backToDashboard: 'Back to Dashboard',
    noResults: 'No results found',
    // Login Page Translations
    navWhy: 'Why Argus?',
    navPricing: 'Pricing',
    navSupportTop: 'Support',
    navDownload: 'Download',
    installBtn: 'Install ArgusVPN',
    signInTitle: 'Sign in to ArgusVPN',
    signInSubtitle: 'Secure access to your private network.',
    labelIdentity: 'Email / Username',
    labelPassword: 'Password',
    forgotPassword: 'Forgot password?',
    signInBtn: 'Sign in',
    noAccount: "Don't have an account?",
    createOne: 'Create one',
    footerText: 'Protected by zero-knowledge encryption. 30-day money-back guarantee.',
    placeholderEmail: 'agent@argus.net',
    placeholderPassword: '••••••••••••',
    systemId: 'SYSTEM_ID: 8X-2991',
    encryption: 'ENCRYPTION: AES-256-GCM'
  },
  zh: {
    title: 'ArgusVPN',
    logout: '退出登录',
    status: '状态',
    online: '运行中',
    offline: '离线',
    plan: '当前套餐',
    expires: '到期时间',
    renew: '续费 / 升级',
    traffic: '剩余流量',
    devices: '在线设备',
    wallet: '钱包余额',
    welcome: '欢迎回来，特工。',
    connected: '已连接',
    disconnected: '未连接',
    quickConnect: '快速连接',
    disconnect: '断开连接',
    latency: '延迟',
    packetLoss: '丢包率',
    account: '账户设置',
    language: '语言切换',
    // Sidebar Navigation - New IA
    navMain: '主导航',
    navMy: '我的',
    navUsage: '使用',
    navSupport: '安全与支持',
    dashboard: '仪表板',
    store: '商店 / 套餐中心',
    connect: '连接',
    speed: '连接速度',
    servers: '节点列表',
    myAccount: '我的账号',
    myWallet: '我的钱包',
    referral: '邀请返利',
    downloads: '下载与教程',
    subscription: '线路导入',
    nodeSettings: '节点设置',
    logs: '日志中心',
    securityCenter: 'Security Center',
    auditSystem: '审计系统',
    supportTickets: '工单支持 / 帮助中心',
    notifications: '通知',
    settings: '设置',
    // Alert Banner
    planExpired: '套餐已过期',
    planExpiring: '套餐即将到期',
    expiredBanner: '套餐已过期 · 当前无法连接节点 · 立即续费',
    expiringBanner: '距离套餐到期还有',
    expiringDiscount: '天 · 提前续费享 9 折',
    renewNow: '立即续费',
    viewDetails: '查看详情',
    // Hero Card
    annualMember: '年度高级会员',
    unlimitedAccess: '无限访问 • 全球节点',
    daysRemaining: '天',
    expired: '已过期',
    cycleUsage: '周期使用量 (重置: 1月1日)',
    renewUpgrade: '续费 / 升级',
    // Row 2: Status Cards
    statusCard: '状态',
    currentServer: '当前服务器',
    notConnected: '未连接',
    lastSpeedTest: '上次测速',
    announcementsCard: '公告',
    viewAllAnnouncements: '查看全部公告',
    securityRiskCard: '安全风险',
    dnsLeakProtection: 'DNS 泄露保护',
    killSwitch: 'Kill Switch',
    enabled: '已开启',
    disabled: '未开启',
    abnormalLogins: '最近 24 小时异常登录',
    times: '次',
    goToSecurityCenter: '前往 Security Center',
    // Row 3: Analytics
    trafficUsage: '流量使用情况',
    last7Days: '最近 7 天',
    last30Days: '最近 30 天',
    cycleUsed: '本周期已使用',
    estimatedDepletion: '预计',
    changeServer: '换线',
    load: '负载',
    protocol: '协议',
    connectionLogs: '连接日志',
    viewAllLogs: '查看全部连接日志',
    duration: '时长',
    // Row 4: Guidance Layer
    subscriptionImport: '线路导入',
    importDescription: '根据客户端一键导入订阅链接',
    oneClickImport: '一键导入',
    availableDomains: '可用访问域名',
    viewAllDomains: '查看全部线路/域名',
    quickHelp: '快速帮助',
    faq1: '为什么连接不上 / 很慢？',
    faq1Answer: '请检查网络连接并尝试切换不同的服务器节点。如问题持续，请联系客服。',
    faq2: '如何在 iOS / Mac 导入订阅？',
    faq2Answer: '下载对应客户端（Shadowrocket/ClashX），然后点击上方一键导入按钮即可自动配置。',
    faq3: '设备上限满了怎么解绑？',
    faq3Answer: '前往账户设置 > 在线设备，选择要解绑的设备点击移除即可。',
    viewFullGuide: '在帮助中心查看完整说明',
    copied: '已复制！',
    copy: '复制',
    // Help Center Page
    helpCenterTitle: '帮助中心',
    searchPlaceholder: '搜索问题关键字...',
    categoryAll: '全部',
    categoryGettingStarted: '新手入门',
    categoryBilling: '套餐与计费',
    categoryClients: '客户端教程',
    categoryTroubleshooting: '故障排查',
    categoryOther: '其他',
    hotQuestion: '热门',
    clientDownloads: '客户端下载',
    backToDashboard: '返回仪表盘',
    noResults: '未找到相关结果',
    // Login Page Translations
    navWhy: '关于 Argus?',
    navPricing: '价格方案',
    navSupportTop: '技术支持',
    navDownload: '下载客户端',
    installBtn: '安装 ArgusVPN',
    signInTitle: '登录 ArgusVPN',
    signInSubtitle: '安全连接您的私有网络。',
    labelIdentity: '邮箱 / 用户名',
    labelPassword: '密码',
    forgotPassword: '忘记密码？',
    signInBtn: '登录',
    noAccount: '还没有账号？',
    createOne: '立即注册',
    footerText: '采用零知识加密保护。30天无理由退款保证。',
    placeholderEmail: 'agent@argus.net',
    placeholderPassword: '••••••••••••',
    systemId: '系统编号: 8X-2991',
    encryption: '加密协议: AES-256-GCM'
  }
};

// FAQ Data Structure
const faqData = {
  en: [
    { id: 1, category: 'gettingStarted', hot: true, question: 'How do I get started with ArgusVPN?', answer: 'After logging in, click "Quick Connect" on the dashboard to automatically connect to the best server. You can also download our client apps and import your subscription link using the one-click import buttons.' },
    { id: 2, category: 'gettingStarted', hot: true, question: 'How to import subscription on iOS/Mac?', answer: 'Download Shadowrocket (iOS) or ClashX (Mac) from the App Store. Then go to Dashboard > Subscription Import section and click the corresponding one-click import button. The subscription will be automatically configured.' },
    { id: 3, category: 'gettingStarted', hot: false, question: 'What is the difference between protocols?', answer: 'ArgusVPN supports multiple protocols: WireGuard (fastest, recommended), Shadowsocks (stable), and V2Ray (bypass-friendly). WireGuard is recommended for most users due to its superior speed and security.' },

    { id: 4, category: 'billing', hot: true, question: 'How do I renew my subscription?', answer: 'Go to Dashboard and click the "Renew / Upgrade" button on your plan card. You can also visit Store / Plans in the sidebar to view all available plans and renew your subscription.' },
    { id: 5, category: 'billing', hot: false, question: 'What payment methods are supported?', answer: 'We support credit cards, PayPal, cryptocurrency (Bitcoin, USDT), and Alipay. All payments are processed securely through our payment partners.' },
    { id: 6, category: 'billing', hot: false, question: 'How do I use coupons?', answer: 'Go to My Wallet page, enter your coupon code in the "Coupons" section, and click Apply. The discount will be automatically applied to your next purchase.' },
    { id: 7, category: 'billing', hot: true, question: 'Can I get a refund?', answer: 'Yes! We offer a 30-day money-back guarantee for all new subscriptions. Contact support within 30 days of your purchase to request a full refund, no questions asked.' },

    { id: 8, category: 'clients', hot: true, question: 'Which client should I download?', answer: 'For Windows/Linux: Clash for Windows or V2RayN. For Mac: ClashX or V2RayU. For iOS: Shadowrocket or Quantumult X. For Android: Clash for Android or V2RayNG. All download links are available in the Help Center.' },
    { id: 9, category: 'clients', hot: false, question: 'How to configure Clash/ClashX?', answer: 'After installing the client, copy your subscription link from Dashboard > Subscription Import. In Clash, go to Profiles > Import > From URL, paste your link and download. The configuration will be automatically set up.' },
    { id: 10, category: 'clients', hot: false, question: 'How many devices can I connect simultaneously?', answer: 'The number of simultaneous connections depends on your plan. Standard plans allow 3 devices, Premium plans allow 5 devices, and Ultimate plans allow 10 devices. You can check your limit in the Devices card on the dashboard.' },

    { id: 11, category: 'troubleshooting', hot: true, question: 'Why can\'t I connect / experiencing slow speeds?', answer: 'First, check your internet connection. Then try: 1) Switching to a different server node, 2) Changing protocols (try WireGuard), 3) Restarting your client app, 4) Checking if your firewall is blocking the connection. If issues persist, contact support.' },
    { id: 12, category: 'troubleshooting', hot: true, question: 'Device limit reached, how to unbind?', answer: 'Go to Account Settings > Online Devices. You\'ll see a list of all devices connected to your account. Click the "Remove" button next to any device you want to unbind. The slot will be immediately freed for a new device.' },
    { id: 13, category: 'troubleshooting', hot: false, question: 'Connection keeps dropping?', answer: 'Enable "Kill Switch" in Security Center to maintain connection stability. Also ensure you\'re using the latest version of your client app. If using mobile data, the connection may drop when switching between WiFi and cellular.' },
    { id: 14, category: 'troubleshooting', hot: false, question: 'How to check if DNS is leaking?', answer: 'Go to Security Center on your dashboard. The DNS Leak Protection status will show whether your DNS requests are protected. You can also visit dnsleaktest.com while connected to run a comprehensive test.' },

    { id: 15, category: 'other', hot: false, question: 'Is my data safe and private?', answer: 'Yes! ArgusVPN uses military-grade AES-256-GCM encryption and maintains a strict no-logs policy. We don\'t track, collect, or store your browsing activity. Your privacy is our top priority.' },
    { id: 16, category: 'other', hot: false, question: 'Can I use ArgusVPN in China?', answer: 'Yes, ArgusVPN is designed to work in restrictive networks. We recommend using V2Ray or Shadowsocks protocol with obfuscation enabled. Check our Status page for the most reliable servers for your region.' },
    { id: 17, category: 'other', hot: false, question: 'How to contact support?', answer: 'You can reach our support team through: 1) Support Tickets page in the sidebar, 2) Live chat (available 24/7), 3) Email: support@argusvpn.com. We typically respond within 2-4 hours.' }
  ],
  zh: [
    { id: 1, category: 'gettingStarted', hot: true, question: '如何开始使用 ArgusVPN？', answer: '登录后，点击仪表盘上的"快速连接"按钮即可自动连接到最佳服务器。您也可以下载客户端并使用一键导入按钮导入订阅链接。' },
    { id: 2, category: 'gettingStarted', hot: true, question: '如何在 iOS/Mac 上导入订阅？', answer: '从 App Store 下载 Shadowrocket（iOS）或 ClashX（Mac）。然后前往仪表盘 > 线路导入部分，点击对应的一键导入按钮。订阅将自动配置完成。' },
    { id: 3, category: 'gettingStarted', hot: false, question: '不同协议有什么区别？', answer: 'ArgusVPN 支持多种协议：WireGuard（最快，推荐）、Shadowsocks（稳定）和 V2Ray（抗封锁）。大多数用户推荐使用 WireGuard，因其速度和安全性更优。' },

    { id: 4, category: 'billing', hot: true, question: '如何续费订阅？', answer: '前往仪表盘，点击套餐卡片上的"续费 / 升级"按钮。您也可以访问侧边栏的"商店 / 套餐中心"查看所有可用套餐并续费。' },
    { id: 5, category: 'billing', hot: false, question: '支持哪些支付方式？', answer: '我们支持信用卡、PayPal、加密货币（比特币、USDT）和支付宝。所有支付均通过我们的支付合作伙伴安全处理。' },
    { id: 6, category: 'billing', hot: false, question: '如何使用优惠券？', answer: '前往"我的钱包"页面，在"优惠券"部分输入优惠券代码并点击应用。折扣将自动应用于您的下次购买。' },
    { id: 7, category: 'billing', hot: true, question: '可以退款吗？', answer: '可以！我们为所有新订阅提供 30 天无理由退款保证。在购买后 30 天内联系客服即可申请全额退款。' },

    { id: 8, category: 'clients', hot: true, question: '应该下载哪个客户端？', answer: 'Windows/Linux：Clash for Windows 或 V2RayN。Mac：ClashX 或 V2RayU。iOS：Shadowrocket 或 Quantumult X。Android：Clash for Android 或 V2RayNG。所有下载链接都可在帮助中心找到。' },
    { id: 9, category: 'clients', hot: false, question: '如何配置 Clash/ClashX？', answer: '安装客户端后，从仪表盘 > 线路导入复制您的订阅链接。在 Clash 中，前往配置文件 > 导入 > 从 URL 导入，粘贴链接并下载。配置将自动设置完成。' },
    { id: 10, category: 'clients', hot: false, question: '可以同时连接多少设备？', answer: '同时连接数取决于您的套餐。标准套餐允许 3 台设备，高级套餐允许 5 台设备，旗舰套餐允许 10 台设备。您可以在仪表盘的设备卡片中查看您的限制。' },

    { id: 11, category: 'troubleshooting', hot: true, question: '为什么连接不上 / 速度很慢？', answer: '首先检查您的网络连接。然后尝试：1）切换到不同的服务器节点，2）更换协议（尝试 WireGuard），3）重启客户端应用，4）检查防火墙是否阻止连接。如问题持续，请联系客服。' },
    { id: 12, category: 'troubleshooting', hot: true, question: '设备上限满了怎么解绑？', answer: '前往账户设置 > 在线设备。您将看到连接到您账户的所有设备列表。点击要解绑设备旁边的"移除"按钮。该位置将立即释放供新设备使用。' },
    { id: 13, category: 'troubleshooting', hot: false, question: '连接经常断开？', answer: '在 Security Center 启用"Kill Switch"以保持连接稳定性。同时确保您使用的是最新版本的客户端应用。如果使用移动数据，在 WiFi 和蜂窝网络切换时连接可能会断开。' },
    { id: 14, category: 'troubleshooting', hot: false, question: '如何检查 DNS 是否泄露？', answer: '前往仪表盘上的 Security Center。DNS 泄露保护状态将显示您的 DNS 请求是否受保护。您也可以在连接时访问 dnsleaktest.com 进行全面测试。' },

    { id: 15, category: 'other', hot: false, question: '我的数据安全和隐私有保障吗？', answer: '是的！ArgusVPN 使用军用级 AES-256-GCM 加密，并严格执行无日志政策。我们不跟踪、收集或存储您的浏览活动。您的隐私是我们的首要任务。' },
    { id: 16, category: 'other', hot: false, question: '可以在中国使用 ArgusVPN 吗？', answer: '可以，ArgusVPN 专为受限网络设计。我们推荐使用启用混淆的 V2Ray 或 Shadowsocks 协议。查看我们的状态页面以了解您所在地区最可靠的服务器。' },
    { id: 17, category: 'other', hot: false, question: '如何联系客服？', answer: '您可以通过以下方式联系我们的客服团队：1）侧边栏的工单支持页面，2）在线聊天（24/7 全天候），3）电子邮件：support@argusvpn.com。我们通常在 2-4 小时内回复。' }
  ]
};

// --- Components ---

// 1. Background Layer (Restored with Meteors from Backup)
function BackgroundLayer() {
  const [stars, setStars] = useState([]);
  const [activeMeteors, setActiveMeteors] = useState([]);
  const [mobile, setMobile] = useState(isMobile());

  // Star generation
  useEffect(() => {
    const starConfig = getConfig('stars');
    const starArray = Array.from({ length: starConfig.count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * starConfig.maxTop,
      size: starConfig.minSize + Math.random() * (starConfig.maxSize - starConfig.minSize),
      delay: Math.random() * 3,
      duration: starConfig.minDuration + Math.random() * (starConfig.maxDuration - starConfig.minDuration)
    }));
    setStars(starArray);
  }, [mobile]);

  // Meteor System
  useEffect(() => {
    const meteorConfig = getConfig('meteors');
    if (!meteorConfig.enabled) return;

    let meteorIdCounter = 0;
    const spawnMeteor = () => {
      setActiveMeteors(prev => {
        if (prev.length >= meteorConfig.maxVisible) return prev;

        const isForeground = Math.random() > 0.5;
        const direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
        const duration = meteorConfig.minDuration + Math.random() * (meteorConfig.maxDuration - meteorConfig.minDuration);
        const tailLength = meteorConfig.minTailLength + Math.random() * (meteorConfig.maxTailLength - meteorConfig.minTailLength);
        const width = meteorConfig.minWidth + Math.random() * (meteorConfig.maxWidth - meteorConfig.minWidth);

        let startX, startY, endX, endY;

        if (direction === 'left-to-right') {
          startX = -10 - Math.random() * 20;
          startY = Math.random() * 60; // Top 60%
          endX = 110 + Math.random() * 20;
          endY = startY + 20 + Math.random() * 40; // Downward slope
        } else {
          startX = 110 + Math.random() * 20;
          startY = Math.random() * 60;
          endX = -10 - Math.random() * 20;
          endY = startY + 20 + Math.random() * 40;
        }

        const newMeteor = {
          id: meteorIdCounter++,
          startX,
          startY,
          endX,
          endY,
          distanceX: endX - startX,
          distanceY: endY - startY,
          duration,
          tailLength,
          width,
          isForeground,
          opacity: isForeground ? meteorConfig.foregroundOpacity : meteorConfig.backgroundOpacity
        };

        setTimeout(() => {
          setActiveMeteors(current => current.filter(m => m.id !== newMeteor.id));
        }, duration * 1000);

        return [...prev, newMeteor];
      });

      const nextSpawn = meteorConfig.minSpawnInterval + Math.random() * (meteorConfig.maxSpawnInterval - meteorConfig.minSpawnInterval);
      timeoutId = setTimeout(spawnMeteor, nextSpawn);
    };

    let timeoutId = setTimeout(spawnMeteor, 1000);
    return () => clearTimeout(timeoutId);
  }, [mobile]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Gradient Background */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 120%, #0a1628 0%, #020617 60%)`
        }}
      />

      {/* Dynamic Nebulas */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen animate-pulse" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(76, 29, 149, 0.4) 0%, transparent 40%)', animationDuration: '10s' }} />
      <div className="absolute inset-0 opacity-20 mix-blend-screen animate-pulse" style={{ background: 'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)', animationDuration: '15s' }} />

      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            willChange: 'opacity'
          }}
        />
      ))}

      {/* Meteors */}
      {activeMeteors.map(meteor => {
        const angle = Math.atan2(meteor.distanceY, meteor.distanceX) * (180 / Math.PI);
        return (
          <div
            key={meteor.id}
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              transform: `translate(${meteor.startX}vw, ${meteor.startY}vh) rotate(${angle}deg)`,
              '--meteor-distance-x': `${meteor.distanceX}vw`,
              '--meteor-distance-y': `${meteor.distanceY}vh`,
              animation: `meteorDiagonal ${meteor.duration}s ease-out forwards`,
              willChange: 'transform, opacity'
            }}
          >
            {/* Tail */}
            <div
              className="absolute"
              style={{
                width: `${meteor.tailLength}px`,
                height: `${meteor.width}px`,
                background: meteor.isForeground ? CONFIG.colors.meteorBright : CONFIG.colors.meteorDim,
                transform: 'translateY(-50%)',
                left: `-${meteor.tailLength}px`,
                top: '50%',
                opacity: meteor.opacity,
                filter: 'blur(0.5px)',
                boxShadow: meteor.isForeground ? '0 0 8px rgba(255,255,255,0.6)' : '0 0 4px rgba(255,255,255,0.3)'
              }}
            />
            {/* Head */}
            <div
              className="absolute rounded-full bg-white"
              style={{
                width: `${meteor.width * 1.5}px`,
                height: `${meteor.width * 1.5}px`,
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                boxShadow: meteor.isForeground ? '0 0 10px 2px rgba(255,255,255,0.8)' : '0 0 6px 1px rgba(255,255,255,0.5)'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// 2. Dashboard Card (Refined)
const DashboardCard = ({ children, className = "", onClick, noHover = false }) => (
  <div
    onClick={onClick}
    className={`
      relative overflow-hidden
      bg-[#0f172a]/90 backdrop-blur-xl border border-white/5 rounded-[20px] p-6
      shadow-[0_4px_20px_rgba(0,0,0,0.2)]
      transition-all duration-300 ease-out
      ${!noHover ? 'hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-white/10' : ''}
      ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// 3. Enhanced Traffic Chart
const TrafficChart = ({ data, height = 250 }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => Math.max(d.up, d.down))) * 1.2;
  const minVal = 0;

  const getX = (index) => (index / (data.length - 1)) * 100;
  const getY = (value) => 100 - ((value - minVal) / (maxVal - minVal)) * 100;

  const createPath = (key) => {
    return `M ${getX(0)} ${getY(data[0][key])} ` +
      data.slice(1).map((d, i) => `L ${getX(i + 1)} ${getY(d[key])}`).join(' ');
  };

  const createArea = (key) => {
    return `${createPath(key)} L 100 100 L 0 100 Z`;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const index = Math.min(Math.max(Math.round((x / width) * (data.length - 1)), 0), data.length - 1);
    setHoverIndex(index);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative cursor-crosshair"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="gradUp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradDown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
        ))}

        {/* Areas */}
        <path d={createArea('up')} fill="url(#gradUp)" />
        <path d={createArea('down')} fill="url(#gradDown)" />

        {/* Lines with Animation */}
        <path
          d={createPath('up')}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'draw 2s ease-out forwards' }}
        />
        <path
          d={createPath('down')}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'draw 2s ease-out forwards 0.5s' }}
        />

        {/* Hover Line */}
        {hoverIndex !== null && (
          <line
            x1={getX(hoverIndex)} y1="0"
            x2={getX(hoverIndex)} y2="100"
            stroke="white" strokeOpacity="0.2"
            strokeWidth="1" vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Hover Dots */}
        {hoverIndex !== null && (
          <>
            <circle cx={getX(hoverIndex)} cy={getY(data[hoverIndex].up)} r="3" fill="#8b5cf6" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx={getX(hoverIndex)} cy={getY(data[hoverIndex].down)} r="3" fill="#3b82f6" stroke="white" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>

      {/* Tooltip */}
      {hoverIndex !== null && (
        <div
          className="absolute pointer-events-none bg-slate-900/90 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl z-10 text-xs"
          style={{
            left: `${(hoverIndex / (data.length - 1)) * 100}%`,
            top: '10%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold text-gray-300 mb-2 border-b border-white/10 pb-1">{data[hoverIndex].date}</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-gray-400">Upload:</span>
            <span className="font-mono text-white">{data[hoverIndex].up} GB</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-400">Download:</span>
            <span className="font-mono text-white">{data[hoverIndex].down} GB</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Main App Component
function App() {
  const [lang, setLang] = useState('zh');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState(isMobile());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // 3D Tilt State & Login State
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  // State for features
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMetrics, setConnectionMetrics] = useState({ latency: 24, packetLoss: 0.1 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [countdownTick, setCountdownTick] = useState(0); // For countdown timer updates

  // Notification Broadcast State
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isNotificationExpanded, setIsNotificationExpanded] = useState(false);
  const [alertBannerDismissed, setAlertBannerDismissed] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' or 'help'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!mobile) {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobile]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setIsLoggedIn(true);
  }, []);

  // Connection Simulation
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setConnectionMetrics({
          latency: Math.floor(Math.random() * 20) + 15,
          packetLoss: (Math.random() * 0.5).toFixed(2)
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  // Countdown Timer Update
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        setCountdownTick(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Notification Auto-Rotation
  useEffect(() => {
    if (isLoggedIn && !isNotificationExpanded) {
      const interval = setInterval(() => {
        setCurrentNotification(prev => (prev + 1) % 3); // 3 notifications
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, isNotificationExpanded]);

  // Traffic Chart Data
  const [trafficTimeRange, setTrafficTimeRange] = useState('7d');
  const trafficData = useMemo(() => {
    const days = trafficTimeRange === '7d' ? 7 : 30;
    return Array.from({ length: days }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      return {
        date: date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric' }),
        up: parseFloat((Math.random() * 5 + 2).toFixed(1)),
        down: parseFloat((Math.random() * 15 + 5).toFixed(1)),
      };
    });
  }, [trafficTimeRange, lang]);

  // Server List Tabs
  const [serverTab, setServerTab] = useState('recent');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('currentUser', JSON.stringify({ email }));
      setIsLoggedIn(true);
    } else {
      setLoginError(lang === 'en' ? 'Invalid credentials' : '账号或密码错误');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  const toggleConnection = () => setIsConnected(!isConnected);

  // Helper for 3D Transform
  const getTransform = () => {
    if (mobile) return 'rotateX(0deg) rotateY(0deg)';
    const panelConfig = CONFIG.panel.desktop;
    const rotateX = panelConfig.baseRotateX + (mousePosition.y - 0.5) * panelConfig.mouseOffsetRange * 2;
    const rotateY = panelConfig.baseRotateY + (mousePosition.x - 0.5) * panelConfig.mouseOffsetRange * 2;
    return isHovered
      ? `rotateX(${panelConfig.hoverRotateXOffset}deg) rotateY(${panelConfig.hoverRotateYOffset}deg) scale(${panelConfig.hoverScale})`
      : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const toggleLang = () => setLang(l => l === 'en' ? 'zh' : 'en');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden font-sans">
        <BackgroundLayer />

        {/* LOGIN PAGE (Restored Original 3D Layout) */}
        <div className="relative z-10 min-h-screen w-full flex items-center justify-center perspective-2000 p-4 md:p-8">
          <div
            className={`
              w-full md:w-[80%] max-w-[1200px]
              ${mobile ? 'min-h-screen' : 'aspect-[16/9]'}
              rounded-xl md:rounded-[24px]
              transition-all duration-700 ease-out transform-style-3d relative
              ${mobile ? '' : 'animate-float'}
            `}
            style={{
              background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.85) 0%, rgba(15, 23, 42, 0.75) 50%, rgba(30, 58, 138, 0.3) 100%)',
              transform: getTransform(),
              boxShadow: mobile ? '0 10px 40px -10px rgba(0,0,0,0.3)' : '40px 60px 120px -20px rgba(0,0,0,0.6), 0 0 60px -10px rgba(0,243,255,0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              willChange: mobile ? 'auto' : 'transform'
            }}
            onMouseEnter={() => !mobile && setIsHovered(true)}
            onMouseLeave={() => !mobile && setIsHovered(false)}
          >
            <div className="absolute inset-0 rounded-xl md:rounded-[24px] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00f3ff]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
              {/* Top Nav */}
              <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-white" />
                  <span className="text-xl font-bold tracking-[0.15em] text-white/95">ARGUSVPN</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={toggleLang} className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider">
                    {lang === 'en' ? 'EN' : 'ZH'}
                  </button>
                  <button className="hidden md:block px-6 py-2.5 rounded-full bg-gray-100 text-slate-900 font-bold text-sm hover:scale-105 transition-transform active-vibrate shadow-lg hover:shadow-white/20">
                    {t.installBtn}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-10 py-8 overflow-y-auto md:overflow-hidden">
                <div className="hidden md:flex col-span-7 flex-col justify-between">
                  <div className="space-y-6">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/30 to-transparent select-none leading-tight">
                      SECURE<br />ACCESS
                    </div>
                    <div className="relative w-3 h-3">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                      <div className="relative w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                    </div>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 tracking-wider">
                      {lang === 'en' ? 'SYSTEM ONLINE' : '系统在线'}
                    </span>
                    <Activity size={16} className="text-green-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-gray-500 font-mono space-y-1">
                    <p>{t.systemId}</p>
                    <p>{t.encryption}</p>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-5 flex items-center justify-center">
                  <div
                    className="w-full max-w-[420px] bg-[#0a0f1e]/70 backdrop-blur-xl border border-white/20 rounded-[20px] p-8 relative transition-all ease-out"
                    style={{
                      transform: cardHovered && !mobile
                        ? `translateY(${CONFIG.card.hoverTranslateY}px) rotateX(${(mousePosition.y - 0.5) * CONFIG.card.hoverTiltRange}deg) rotateY(${(mousePosition.x - 0.5) * CONFIG.card.hoverTiltRange}deg)`
                        : 'translateY(0px)',
                      boxShadow: cardHovered ? '0 20px 60px -10px rgba(0,0,0,0.5), 0 0 40px -5px rgba(0,243,255,0.25)' : '0 10px 40px -10px rgba(0,0,0,0.4)',
                      transitionDuration: `${CONFIG.card.transitionDuration}ms`
                    }}
                    onMouseEnter={() => !mobile && setCardHovered(true)}
                    onMouseLeave={() => !mobile && setCardHovered(false)}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-60" />
                    <div className="relative z-10">
                      <h2 className="text-2xl font-bold text-white text-center mb-2">{t.signInTitle}</h2>
                      <p className="text-gray-400 text-center text-sm mb-8">{t.signInSubtitle}</p>
                      {loginError && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">{loginError}</div>}
                      <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-300 ml-1">{t.labelIdentity}</label>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#020617]/80 border border-gray-700 rounded-lg focus:border-[#00f3ff] text-white outline-none text-sm transition-colors"
                            placeholder={t.placeholderEmail}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-300 ml-1">{t.labelPassword}</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 bg-[#020617]/80 border border-gray-700 rounded-lg focus:border-[#00f3ff] text-white outline-none text-sm transition-colors"
                            placeholder={t.placeholderPassword}
                          />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-[#00f3ff] hover:bg-[#33f6ff] text-slate-900 font-bold rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                          {t.signInBtn}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shrink-0 pb-6 text-center">
                <p className="text-[12px] text-gray-500/80 tracking-wide">{t.footerText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex overflow-hidden relative">
      <BackgroundLayer />

      {/* Sidebar (Left) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a]/90 backdrop-blur-xl border-r border-white/5 transition-transform duration-300
        ${mobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
        ${!mobile ? 'relative h-screen' : ''}
      `}>
        <div className="h-full flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
            <Shield className="text-blue-500 mr-3 animate-pulse" size={28} />
            <span className="text-xl font-bold text-white tracking-wider">ArgusVPN</span>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto min-h-0">
            {/* 主导航 */}
            <div className="mb-4">
              <div className="px-3 mb-3 text-xs text-white/40 tracking-wide">
                {t.navMain}
              </div>
              {[
                { icon: LayoutDashboard, label: t.dashboard, active: currentPage === 'dashboard', onClick: () => setCurrentPage('dashboard') },
                { icon: ShoppingCart, label: t.store, highlight: true },
                { icon: Zap, label: t.connect },
                { icon: Activity, label: t.speed },
                { icon: Globe, label: t.servers },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative
                    ${item.active
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                      : item.highlight
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <item.icon size={18} className={item.highlight ? 'text-amber-400' : ''} />
                  <span className="flex-1">{item.label}</span>
                  {item.highlight && (
                    <div className="w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 animate-pulse" />
                  )}
                </a>
              ))}
            </div>

            {/* 我的 */}
            <div className="mt-6 mb-4">
              <div className="px-3 mb-3 text-xs text-white/40 tracking-wide">
                {t.navMy}
              </div>
              {[
                { icon: User, label: t.myAccount },
                { icon: Wallet, label: t.myWallet },
                { icon: Gift, label: t.referral },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                </a>
              ))}
            </div>

            {/* 使用 */}
            <div className="mt-6 mb-4">
              <div className="px-3 mb-3 text-xs text-white/40 tracking-wide">
                {t.navUsage}
              </div>
              {[
                { icon: Download, label: t.downloads, onClick: () => setCurrentPage('help') },
                { icon: FileText, label: t.subscription },
                { icon: Settings, label: t.nodeSettings },
                { icon: ScrollText, label: t.logs },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                </a>
              ))}
            </div>

            {/* 安全与支持 */}
            <div className="mt-6 mb-4">
              <div className="px-3 mb-3 text-xs text-white/40 tracking-wide">
                {t.navSupport}
              </div>
              {[
                { icon: Shield, label: t.securityCenter },
                { icon: ShieldCheck, label: t.auditSystem },
                { icon: LifeBuoy, label: t.supportTickets, isNew: true },
                { icon: Bell, label: t.notifications, badgeCount: 3 },
                { icon: Settings, label: t.settings },
              ].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all relative"
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                      NEW
                    </span>
                  )}
                  {item.badgeCount && item.badgeCount > 0 && (
                    <span className="min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
                      {item.badgeCount}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* Footer Actions - Simplified */}
          <div className="p-4 border-t border-white/5 shrink-0">
            <div className="text-xs text-gray-500 text-center">
              v2.4.0-stable
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content (Right) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">

        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {mobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                <Menu size={24} />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{t.dashboard}</h2>
              <p className="text-xs text-blue-400 font-mono mt-0.5">{t.welcome}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 pl-6 border-l border-white/10 hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-white">Demo User</div>
                  <div className="text-xs text-emerald-400">Lv.5 Elite</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors">
                      <User size={16} />
                      {t.account}
                    </button>
                    <button
                      onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <Languages size={16} />
                      {t.language} ({lang === 'en' ? 'EN' : '中文'})
                    </button>
                    <div className="h-px bg-white/10 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-sm text-red-400 transition-colors"
                    >
                      <LogOut size={16} />
                      {t.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area - Full Width & Centered */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden bg-[#020617] text-slate-200">
          {currentPage === 'help' ? (
            <div className="max-w-[1400px] mx-auto w-full p-6 lg:p-8">
              {/* Header */}
              <div className="mb-8">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  {t.backToDashboard}
                </button>
                <h1 className="text-3xl font-bold text-white mb-4">{t.helpCenterTitle}</h1>

                {/* Search Bar */}
                <div className="relative max-w-2xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0f172a]/80 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { key: 'all', label: t.categoryAll },
                  { key: 'gettingStarted', label: t.categoryGettingStarted },
                  { key: 'billing', label: t.categoryBilling },
                  { key: 'clients', label: t.categoryClients },
                  { key: 'troubleshooting', label: t.categoryTroubleshooting },
                  { key: 'other', label: t.categoryOther }
                ].map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 3-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Question List */}
                <div className="lg:col-span-3 space-y-2">
                  {(() => {
                    const faqs = faqData[lang] || faqData.en;
                    const filtered = faqs.filter(faq => {
                      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
                      const matchesSearch = !searchQuery || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchesCategory && matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="text-center py-8 text-gray-500">
                          {t.noResults}
                        </div>
                      );
                    }

                    return filtered.map(faq => (
                      <button
                        key={faq.id}
                        onClick={() => setSelectedQuestion(faq.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedQuestion === faq.id
                            ? 'bg-blue-500/10 border border-blue-500/30 text-white'
                            : 'bg-white/5 border border-transparent text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {faq.hot && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded">
                              {t.hotQuestion}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium mt-1">{faq.question}</div>
                      </button>
                    ));
                  })()}
                </div>

                {/* Middle: Answer Detail */}
                <div className="lg:col-span-6">
                  <DashboardCard>
                    {(() => {
                      const faqs = faqData[lang] || faqData.en;
                      const selected = faqs.find(f => f.id === selectedQuestion) || faqs[0];

                      return (
                        <div>
                          <div className="flex items-start gap-3 mb-4">
                            {selected.hot && (
                              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-lg">
                                {t.hotQuestion}
                              </span>
                            )}
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-4">{selected.question}</h2>
                          <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selected.answer}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </DashboardCard>
                </div>

                {/* Right: Client Downloads + Subscription Import */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Client Downloads */}
                  <DashboardCard>
                    <div className="flex items-center gap-2 mb-4">
                      <Download size={18} className="text-purple-400" />
                      <h3 className="font-bold text-white text-sm">{t.clientDownloads}</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: 'Clash / ClashX', icon: '⚡' },
                        { name: 'Shadowrocket', icon: '🚀' },
                        { name: 'Quantumult X', icon: '🔷' },
                        { name: 'V2Ray', icon: '📡' }
                      ].map((client, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCopiedItem(`help-client-${i}`);
                            setTimeout(() => setCopiedItem(null), 2000);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:scale-[1.02] group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{client.icon}</span>
                            <div className="text-left">
                              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                                {client.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {copiedItem === `help-client-${i}` ? t.copied : t.oneClickImport}
                              </div>
                            </div>
                          </div>
                          <Download size={14} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </DashboardCard>

                  {/* Subscription Import */}
                  <DashboardCard>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText size={18} className="text-blue-400" />
                      <h3 className="font-bold text-white text-sm">{t.subscriptionImport}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">{t.importDescription}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { name: 'Clash / ClashX', icon: '⚡' },
                        { name: 'Shadowrocket', icon: '🚀' },
                        { name: 'Quantumult X', icon: '🔷' },
                        { name: 'V2Ray / ' + (lang === 'en' ? 'General' : '通用'), icon: '📡' }
                      ].map((client, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setCopiedItem(`help-import-${i}`);
                            setTimeout(() => setCopiedItem(null), 2000);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all hover:scale-[1.02] group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{client.icon}</span>
                            <div className="text-left">
                              <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                {client.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {copiedItem === `help-import-${i}` ? t.copied : t.oneClickImport}
                              </div>
                            </div>
                          </div>
                          <Copy size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </DashboardCard>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[1440px] mx-auto w-full p-6 lg:p-8 space-y-6">

            {/* ALERT BANNER: Plan Status */}
            {(() => {
              const expiryDate = new Date('2025-01-03T23:59:59');
              const now = new Date();
              const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
              const isExpired = daysLeft <= 0;
              const isExpiring = daysLeft > 0 && daysLeft <= 7;

              if (alertBannerDismissed || (!isExpired && !isExpiring)) return null;

              return (
                <div className={`
                  relative w-full rounded-xl p-4 flex items-center justify-between gap-4
                  ${isExpired
                    ? 'bg-gradient-to-r from-red-600/90 via-red-500/90 to-red-600/90 border border-red-400/30'
                    : 'bg-gradient-to-r from-orange-600/90 via-amber-500/90 to-orange-600/90 border border-orange-400/30'}
                  shadow-lg backdrop-blur-sm animate-fadeIn
                `}>
                  {/* Left: Icon + Message */}
                  <div className="flex items-center gap-3 flex-1">
                    {isExpired ? (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                        <X size={24} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Clock size={24} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm md:text-base">
                        {isExpired ? t.expiredBanner : `${t.expiringBanner} ${daysLeft} ${t.expiringDiscount}`}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Button + Close */}
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white text-slate-900 font-bold text-sm rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                      {t.renewNow}
                    </button>
                    <button
                      onClick={() => setAlertBannerDismissed(true)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ROW 1: Hero Card + Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Hero Card (2/3) - Enhanced */}
              {(() => {
                // Calculate plan status
                const expiryDate = new Date('2025-01-03T23:59:59'); // 34 days from now (example)
                const now = new Date();
                const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                const isExpired = daysLeft <= 0;
                const isExpiring = daysLeft > 0 && daysLeft <= 7;
                const isNormal = daysLeft > 7;

                // Status-based colors
                const statusConfig = isExpired
                  ? {
                    topBar: 'bg-gradient-to-r from-red-600 via-red-500 to-red-600',
                    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
                    text: 'text-red-400',
                    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
                    buttonClass: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 animate-pulse shadow-lg shadow-red-600/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                  }
                  : isExpiring
                    ? {
                      topBar: 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500',
                      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                      text: 'text-orange-400',
                      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.2)]',
                      buttonClass: 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-lg shadow-orange-600/20 hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]'
                    }
                    : {
                      topBar: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500',
                      badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                      text: 'text-blue-400',
                      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
                      buttonClass: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-600/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]'
                    };

                // Countdown calculation
                const timeLeft = {
                  days: Math.max(0, Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24))),
                  hours: Math.max(0, Math.floor(((expiryDate - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
                  minutes: Math.max(0, Math.floor(((expiryDate - now) % (1000 * 60 * 60)) / (1000 * 60))),
                  seconds: Math.max(0, Math.floor(((expiryDate - now) % (1000 * 60)) / 1000))
                };

                return (
                  <DashboardCard className={`lg:col-span-2 flex flex-col justify-between min-h-[280px] bg-gradient-to-br from-[#0f172a]/80 to-blue-900/20 ${statusConfig.glow}`}>
                    {/* Status Bar */}
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${statusConfig.topBar}`} />

                    {/* Expired Banner - Removed, now using global alert banner */}

                    <div className={`flex justify-between items-start`}>
                      {/* Left: Plan Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusConfig.badge}`}>
                            {isExpired ? t.expired : 'PREMIUM'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {t.annualMember} ·
                            <span className="text-emerald-400 ml-1">Lv.5 Elite (75%)</span>
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {lang === 'en' ? 'Premium Plan' : '高级计划'}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {t.unlimitedAccess}
                        </p>

                        {/* Countdown Timer */}
                        <div className="mt-6">
                          <div className={`text-5xl font-bold tabular-nums tracking-tight ${isExpired ? 'text-red-400' : statusConfig.text}`}>
                            {isExpired
                              ? t.expired
                              : `${timeLeft.days} ${t.daysRemaining}`
                            }
                          </div>
                          {!isExpired && (
                            <div className="flex items-baseline gap-1 mt-2 text-gray-400 font-mono text-lg">
                              <span className="tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>:
                              <span className="tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                              <span className="tabular-nums text-gray-500">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Crown Icon */}
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30 ${isExpired ? 'opacity-30' : ''}`}>
                          <Crown size={40} className="text-amber-400" />
                        </div>
                        <span className="text-xs text-gray-500 font-mono">ID: #8291</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">
                          {t.cycleUsage}
                        </span>
                        <span className="text-white font-bold">75%</span>
                      </div>
                      <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full w-3/4 bg-gradient-to-r ${isExpired ? 'from-gray-600 to-gray-500' : 'from-blue-500 via-purple-500 to-blue-500'} shadow-[0_0_12px_rgba(59,130,246,0.6)]`} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <button className={`flex-1 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.02] ${statusConfig.buttonClass}`}>
                        {isExpired
                          ? (lang === 'en' ? '🔥 RENEW NOW' : '🔥 立即续费')
                          : isExpiring
                            ? t.renewUpgrade
                            : t.renewUpgrade
                        }
                      </button>
                      <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-bold text-sm transition-all hover:scale-[1.02]">
                        {t.viewDetails}
                      </button>
                    </div>
                  </DashboardCard>
                );
              })()}

              {/* Metrics Grid (1/3) - Enhanced */}
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  // Calculate metrics
                  const expiryDate = new Date('2025-01-03T23:59:59');
                  const now = new Date();
                  const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                  const isExpired = daysLeft <= 0;

                  const trafficTotal = 500; // GB
                  const trafficUsed = 376; // GB
                  const trafficRemaining = trafficTotal - trafficUsed;
                  const trafficPercent = Math.round((trafficUsed / trafficTotal) * 100);

                  const devicesOnline = 2;
                  const devicesLimit = 5;

                  const walletBalance = 0;
                  const couponsAvailable = 1;

                  const metrics = [
                    {
                      label: lang === 'en' ? 'Membership' : '会员时长',
                      value: isExpired
                        ? t.expired
                        : `${daysLeft} ${t.daysRemaining}`,
                      subtitle: isExpired
                        ? t.renewNow
                        : (lang === 'en' ? 'Remaining' : '剩余'),
                      icon: Clock,
                      color: isExpired ? 'text-red-400' : 'text-blue-400',
                      bg: isExpired ? 'bg-red-500/10' : 'bg-blue-500/10',
                      valueColor: isExpired ? 'text-red-400' : 'text-white'
                    },
                    {
                      label: lang === 'en' ? 'Traffic' : '剩余流量',
                      value: `${trafficRemaining} GB`,
                      subtitle: `${trafficPercent}% ${lang === 'en' ? 'Used' : '已用'}`,
                      icon: Activity,
                      color: trafficPercent > 80 ? 'text-orange-400' : 'text-purple-400',
                      bg: trafficPercent > 80 ? 'bg-orange-500/10' : 'bg-purple-500/10',
                      valueColor: 'text-white'
                    },
                    {
                      label: lang === 'en' ? 'Devices' : '在线设备',
                      value: `${devicesOnline} / ${devicesLimit}`,
                      subtitle: lang === 'en' ? 'Online' : '在线中',
                      icon: Smartphone,
                      color: 'text-emerald-400',
                      bg: 'bg-emerald-500/10',
                      valueColor: 'text-white'
                    },
                    {
                      label: lang === 'en' ? 'Wallet' : '钱包余额',
                      value: `¥ ${walletBalance.toFixed(2)}`,
                      subtitle: couponsAvailable > 0
                        ? `${couponsAvailable} ${lang === 'en' ? 'Coupon' : '张优惠券'}`
                        : (lang === 'en' ? 'No Coupons' : '无优惠券'),
                      icon: Wallet,
                      color: 'text-amber-400',
                      bg: 'bg-amber-500/10',
                      valueColor: 'text-white'
                    },
                  ];

                  const handleCardClick = (index) => {
                    const routes = ['account', 'traffic', 'devices', 'wallet'];
                    console.log(`Navigate to: ${routes[index]}`);
                    // TODO: Implement navigation
                  };

                  return metrics.map((m, i) => (
                    <div
                      key={i}
                      onClick={() => handleCardClick(i)}
                      className={`
                        relative overflow-hidden
                        bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-[20px] p-5
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.36),inset_0_1px_0_0_rgba(255,255,255,0.05)]
                        transition-all duration-300
                        cursor-pointer hover:bg-[#0f172a]/95 hover:border-${m.color.replace('text-', '')}/30
                        hover:shadow-[0_0_20px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                        hover:-translate-y-[2px] active:scale-[0.98]
                        min-h-[130px] flex flex-col justify-between
                        group
                      `}
                    >
                      {/* Top: Icon */}
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center border border-white/5 shadow-lg transition-transform group-hover:scale-110`}>
                          <m.icon size={22} className={m.color} />
                        </div>
                      </div>

                      {/* Bottom: Value & Label */}
                      <div className="mt-auto">
                        <div className={`text-2xl font-bold ${m.valueColor} mb-1 tabular-nums tracking-tight`}>{m.value}</div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{m.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{m.subtitle}</div>
                          </div>
                          <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${m.color.replace('text-', 'rgb(').replace('-400', ', 0.1)')} 0%, transparent 70%)`
                        }}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* ROW 2: Connection Status + Notification Broadcast + Server Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* 1. STATUS - Connection Status Card */}
              <DashboardCard className={`min-h-[320px] flex flex-col transition-all ${isConnected ? 'border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]' : 'border-white/10'}`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                      {isConnected ? (
                        <>
                          <Activity size={24} className="text-green-400 animate-pulse" />
                          <div className="absolute inset-0 rounded-xl bg-green-500/20 animate-ping" />
                        </>
                      ) : (
                        <Wifi size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">{t.statusCard}</div>
                      <div className={`font-bold text-sm ${isConnected ? 'text-green-400' : 'text-gray-400'}`}>
                        {isConnected ? `${t.connected} - US-East-1` : t.notConnected}
                      </div>
                    </div>
                  </div>
                  {isConnected && <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />}
                </div>

                {/* Connection Metrics */}
                <div className="space-y-3 mb-4 flex-1">
                  {isConnected ? (
                    <>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                        <span className="text-xs text-gray-400">{t.latency}</span>
                        <span className="text-sm font-mono font-bold text-green-400">{connectionMetrics.latency}ms</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                        <span className="text-xs text-gray-400">{t.lastSpeedTest}</span>
                        <span className="text-sm font-mono font-bold text-blue-400">45.2 Mbps</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      {lang === 'en' ? 'No active connection' : '当前无连接'}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={toggleConnection}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isConnected
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 hover:scale-[1.02]'
                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 hover:scale-[1.02]'
                    }`}
                >
                  {isConnected ? <X size={16} /> : <Zap size={16} />}
                  {isConnected ? t.disconnect : t.quickConnect}
                </button>
              </DashboardCard>

              {/* 2. ANNOUNCEMENTS - Public Announcements Card */}
              <DashboardCard className="min-h-[320px] flex flex-col bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 border-blue-500/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Bell size={18} className="text-blue-400" />
                    </div>
                    <div className="text-xs text-gray-400 font-bold tracking-wider uppercase">{t.announcementsCard}</div>
                  </div>
                </div>

                {/* Announcements List */}
                <div className="space-y-3 mb-4 flex-1">
                  {[
                    { icon: '🚀', title: lang === 'en' ? 'New Singapore Nodes Online' : '新增新加坡节点上线', date: '2 hours ago' },
                    { icon: '🛡️', title: lang === 'en' ? 'Security Protocol Upgraded to v2.4' : '安全协议升级至 v2.4', date: '1 day ago' },
                    { icon: '🎉', title: lang === 'en' ? 'Holiday Sale: 20% Off Annual Plans' : '假日促销：年费 8 折', date: '3 days ago' }
                  ].map((announcement, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group"
                    >
                      <span className="text-lg shrink-0 mt-0.5">{announcement.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-200 group-hover:text-white font-medium line-clamp-2 transition-colors">
                          {announcement.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{announcement.date}</div>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0 mt-1" />
                    </a>
                  ))}
                </div>

                {/* View All Link */}
                <a
                  href="#"
                  className="block text-center text-xs font-bold text-blue-400 hover:text-blue-300 py-2 rounded-lg hover:bg-blue-500/10 transition-all"
                >
                  {t.viewAllAnnouncements} →
                </a>
              </DashboardCard>

              {/* 3. SECURITY RISK - Security Status Card */}
              {(() => {
                const dnsProtection = true;
                const killSwitchEnabled = true;
                const abnormalLoginCount = 0;
                const hasRisk = !dnsProtection || !killSwitchEnabled || abnormalLoginCount > 0;

                return (
                  <DashboardCard className={`min-h-[320px] flex flex-col ${hasRisk ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${hasRisk ? 'bg-orange-500/20 border-orange-500/30' : 'bg-emerald-500/20 border-emerald-500/30'}`}>
                        <Shield size={18} className={hasRisk ? 'text-orange-400' : 'text-emerald-400'} />
                      </div>
                      <div className="text-xs text-gray-400 font-bold tracking-wider uppercase">{t.securityRiskCard}</div>
                    </div>

                    {/* Security Status List */}
                    <div className="space-y-3 mb-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{t.dnsLeakProtection}</span>
                        <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded border ${dnsProtection ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                          {dnsProtection ? <Check size={12} /> : <X size={12} />}
                          {dnsProtection ? t.enabled : t.disabled}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{t.killSwitch}</span>
                        <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded border ${killSwitchEnabled ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                          {killSwitchEnabled ? <Check size={12} /> : <X size={12} />}
                          {killSwitchEnabled ? t.enabled : t.disabled}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-gray-400">{t.abnormalLogins}</span>
                        <span className={`font-bold font-mono ${abnormalLoginCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {abnormalLoginCount} {t.times}
                        </span>
                      </div>
                    </div>

                    {/* Action Link */}
                    {hasRisk && (
                      <a
                        href="#"
                        className="block text-center text-xs font-bold text-orange-400 hover:text-orange-300 py-2 rounded-lg hover:bg-orange-500/10 transition-all border border-orange-500/20"
                      >
                        {t.goToSecurityCenter} →
                      </a>
                    )}
                  </DashboardCard>
                );
              })()}

            </div>

            {/* ROW 3: Traffic Chart & Server Info & Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Traffic Usage Chart (2/3) */}
              <DashboardCard className="lg:col-span-2 min-h-[350px] flex flex-col">
                {/* Header with Summary */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Activity size={18} className="text-blue-400" />
                    <h3 className="font-bold text-white">{t.trafficUsage}</h3>
                  </div>

                  {/* Right: Summary + Tabs */}
                  <div className="flex items-center gap-4">
                    {/* Summary Badge */}
                    <div className="hidden md:flex flex-col items-end text-xs">
                      <div className="text-gray-400">
                        {t.cycleUsed}: <span className="text-white font-bold">376 GB</span> <span className="text-purple-400">(75%)</span>
                      </div>
                      <div className="text-gray-500 mt-0.5">
                        {t.estimatedDepletion} <span className="text-orange-400 font-bold">7 {lang === 'en' ? 'days' : '天'}</span> {lang === 'en' ? 'to deplete' : '用尽'}
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-black/20 rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => setTrafficTimeRange('7d')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${trafficTimeRange === '7d'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        {t.last7Days}
                      </button>
                      <button
                        onClick={() => setTrafficTimeRange('30d')}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${trafficTimeRange === '30d'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        {t.last30Days}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full relative">
                  <TrafficChart data={trafficData} height={260} />
                </div>

                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-400">Download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-xs text-gray-400">Upload</span>
                  </div>
                </div>
              </DashboardCard>

              {/* Right Column: Current Server & Logs */}
              <div className="flex flex-col gap-6">

                {/* 1. Current Server Card */}
                <DashboardCard>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase mb-1">{t.currentServer}</div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">🇺🇸</span> US-East-1
                      </h3>
                      <div className="text-sm text-gray-400 mt-1">Virginia, USA</div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all border border-blue-500/20 text-xs font-bold">
                      <RefreshCw size={14} />
                      {t.changeServer}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Latency with color coding */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <span className="text-xs text-gray-400">{t.latency}</span>
                      <span className="text-sm font-mono font-bold text-green-400">45ms</span>
                    </div>
                    {/* Load with progress bar */}
                    <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">{t.load}</span>
                        <span className="text-sm font-mono font-bold text-blue-400">32%</span>
                      </div>
                      <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full w-[32%] bg-gradient-to-r from-blue-500 to-cyan-400" />
                      </div>
                    </div>
                    {/* Protocol */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                      <span className="text-xs text-gray-400">{t.protocol}</span>
                      <span className="text-sm font-bold text-purple-400">WireGuard</span>
                    </div>
                  </div>
                </DashboardCard>

                {/* 2. Connection Logs Card */}
                <DashboardCard className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide">{t.connectionLogs}</h3>
                  </div>

                  <div className="flex-1 space-y-3">
                    {[
                      { time: '10:42 AM', server: 'US-West-1', duration: '2h 15m', status: 'success' },
                      { time: '08:30 AM', server: 'JP-Tokyo-2', duration: '45m', status: 'success' },
                      { time: 'Yesterday', server: 'SG-Marina', duration: '5h 20m', status: 'success' },
                      { time: 'Yesterday', server: 'US-East-1', duration: '0m', status: 'failed' },
                      { time: '2 days ago', server: 'UK-London', duration: '1h 10m', status: 'success' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <div className="text-gray-300 font-medium">{log.server}</div>
                            <div className="text-gray-500">{log.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400">{log.duration}</div>
                          <div className={`font-bold ${log.status === 'success' ? 'text-green-500/50' : 'text-red-500/50'}`}>
                            {log.status === 'success' ? 'OK' : 'ERR'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="block text-center w-full mt-4 py-2 text-xs font-bold text-blue-400 hover:text-blue-300 border border-white/5 hover:border-blue-500/20 rounded-lg transition-all hover:bg-blue-500/5"
                  >
                    {t.viewAllLogs} →
                  </a>
                </DashboardCard>

              </div>
            </div>

            {/* ROW 4: Guidance Layer - Subscription Import & Quick Help */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left: Subscription Import Card */}
              <DashboardCard>
                <div className="flex items-center gap-2 mb-3">
                  <Download size={18} className="text-purple-400" />
                  <h3 className="font-bold text-white">{t.subscriptionImport}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-6">{t.importDescription}</p>

                {/* Import Buttons Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Clash / ClashX', icon: '⚡' },
                    { name: 'Shadowrocket', icon: '🚀' },
                    { name: 'Quantumult X', icon: '🔷' },
                    { name: 'V2Ray / ' + (lang === 'en' ? 'General' : '通用'), icon: '📡' }
                  ].map((client, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        // Simulate copy subscription URL
                        setCopiedItem(`client-${i}`);
                        setTimeout(() => setCopiedItem(null), 2000);
                      }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-400/40 text-left transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{client.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {client.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {copiedItem === `client-${i}` ? t.copied : t.oneClickImport}
                          </div>
                        </div>
                      </div>
                      <Download size={14} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </button>
                  ))}
                </div>
              </DashboardCard>

              {/* Right: Domains & Quick Help Card */}
              <DashboardCard className="flex flex-col">
                {/* Domains Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Link2 size={18} className="text-blue-400" />
                    <h3 className="font-bold text-white text-sm">{t.availableDomains}</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      'app.argusvpn.com',
                      'backup.argusvpn.net',
                      'cn.argusvpn.io'
                    ].map((domain, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 hover:border-blue-500/20 transition-all group">
                        <code className="text-xs text-gray-300 font-mono">{domain}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(domain);
                            setCopiedItem(`domain-${i}`);
                            setTimeout(() => setCopiedItem(null), 2000);
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-all"
                        >
                          {copiedItem === `domain-${i}` ? (
                            <>
                              <Check size={12} />
                              {t.copied}
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              {t.copy}
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="block text-center text-xs font-bold text-blue-400 hover:text-blue-300 mt-3 py-2 rounded-lg hover:bg-blue-500/5 transition-all"
                  >
                    {t.viewAllDomains} →
                  </a>
                </div>

                {/* Quick Help Section */}
                <div className="flex-1 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <HelpCircle size={18} className="text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">{t.quickHelp}</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { q: t.faq1, a: t.faq1Answer },
                      { q: t.faq2, a: t.faq2Answer },
                      { q: t.faq3, a: t.faq3Answer }
                    ].map((faq, i) => (
                      <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-all"
                        >
                          <span className="text-sm text-gray-300 font-medium">{faq.q}</span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform ${expandedFAQ === i ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {expandedFAQ === i && (
                          <div className="px-3 pb-3 text-xs text-gray-400 space-y-2 animate-fadeIn">
                            <p>{faq.a}</p>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage('help');
                              }}
                              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                            >
                              {t.viewFullGuide} →
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>

            </div>

          </div>
          )}
        </main>
      </div>
    </div>
  );
}


export default App;
