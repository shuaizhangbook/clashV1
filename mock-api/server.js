const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'mock-secret-key-12345';

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
let users = {
  'demo@argusvpn.com': {
    id: 1,
    email: 'demo@argusvpn.com',
    username: 'Demo User',
    password: 'password123', // In real app, this would be hashed
    avatar: null,
    level: 5,
    levelPercentage: 75,
    vipExpireDate: '2025-01-03T23:59:59Z',
    isVip: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-16T00:00:00Z'
  }
};

let subscriptions = {
  1: {
    id: 1,
    userId: 1,
    planId: 1,
    planName: 'Premium Plan',
    planType: 'annual',
    startDate: '2024-01-04T00:00:00Z',
    expireDate: '2025-01-03T23:59:59Z',
    isExpired: false,
    daysRemaining: 18,
    trafficTotal: 500,
    trafficUsed: 376,
    trafficRemaining: 124,
    trafficPercentage: 75,
    deviceLimit: 5,
    devicesOnline: 2,
    autoRenew: false
  }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ENDPOINTS ====================

// Login
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    accessToken,
    refreshToken,
    user: userWithoutPassword
  });
});

// Refresh token
app.post('/api/v1/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  });
});

// Logout
app.post('/api/v1/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ==================== USER ENDPOINTS ====================

// Get profile
app.get('/api/v1/user/profile', authenticateToken, (req, res) => {
  const user = users[req.user.email];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Get subscription
app.get('/api/v1/user/subscription', authenticateToken, (req, res) => {
  const subscription = subscriptions[req.user.id];
  if (!subscription) {
    return res.status(404).json({ message: 'No active subscription' });
  }

  res.json(subscription);
});

// Get devices
app.get('/api/v1/user/devices', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'desktop',
      os: 'macOS',
      lastActive: '2024-12-16T10:30:00Z',
      isOnline: true
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      type: 'mobile',
      os: 'iOS',
      lastActive: '2024-12-16T09:15:00Z',
      isOnline: true
    }
  ]);
});

// ==================== TRAFFIC STATS ====================

// Daily traffic
app.get('/api/v1/stats/traffic/daily', authenticateToken, (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      upload: parseFloat((Math.random() * 5 + 2).toFixed(1)),
      download: parseFloat((Math.random() * 15 + 5).toFixed(1)),
      total: 0
    });
  }

  data.forEach(d => d.total = d.upload + d.download);

  res.json(data);
});

// Connection logs
app.get('/api/v1/stats/connection-logs', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      nodeId: 1,
      nodeName: 'US-West-1',
      startTime: '2024-12-16T08:30:00Z',
      endTime: null,
      duration: 7200,
      upload: 1.2,
      download: 5.8,
      status: 'success'
    },
    {
      id: 2,
      nodeId: 2,
      nodeName: 'JP-Tokyo-2',
      startTime: '2024-12-15T22:00:00Z',
      endTime: '2024-12-15T22:45:00Z',
      duration: 2700,
      upload: 0.5,
      download: 2.1,
      status: 'success'
    },
    {
      id: 3,
      nodeId: 3,
      nodeName: 'SG-Marina',
      startTime: '2024-12-15T18:20:00Z',
      endTime: '2024-12-16T00:40:00Z',
      duration: 19200,
      upload: 2.3,
      download: 8.9,
      status: 'success'
    },
    {
      id: 4,
      nodeId: 1,
      nodeName: 'US-East-1',
      startTime: '2024-12-15T15:00:00Z',
      endTime: '2024-12-15T15:00:00Z',
      duration: 0,
      upload: 0,
      download: 0,
      status: 'failed',
      errorMessage: 'Connection timeout'
    },
    {
      id: 5,
      nodeId: 4,
      nodeName: 'UK-London',
      startTime: '2024-12-14T10:30:00Z',
      endTime: '2024-12-14T11:40:00Z',
      duration: 4200,
      upload: 0.8,
      download: 3.2,
      status: 'success'
    }
  ]);
});

// ==================== NODES ====================

// List nodes
app.get('/api/v1/nodes', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      name: 'US-East-1',
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      location: 'Virginia, USA',
      protocol: 'WireGuard',
      latency: 45,
      load: 32,
      isOnline: true,
      speedTest: {
        download: 245.8,
        upload: 89.2,
        timestamp: '2024-12-16T10:00:00Z'
      },
      tags: ['Premium', 'Streaming']
    },
    {
      id: 2,
      name: 'JP-Tokyo-2',
      country: 'Japan',
      countryCode: 'JP',
      flag: '🇯🇵',
      location: 'Tokyo, Japan',
      protocol: 'Shadowsocks',
      latency: 89,
      load: 58,
      isOnline: true,
      tags: ['Gaming']
    },
    {
      id: 3,
      name: 'SG-Marina',
      country: 'Singapore',
      countryCode: 'SG',
      flag: '🇸🇬',
      location: 'Singapore',
      protocol: 'V2Ray',
      latency: 67,
      load: 45,
      isOnline: true,
      tags: ['Premium']
    },
    {
      id: 4,
      name: 'UK-London',
      country: 'United Kingdom',
      countryCode: 'GB',
      flag: '🇬🇧',
      location: 'London, UK',
      protocol: 'WireGuard',
      latency: 156,
      load: 28,
      isOnline: true,
      tags: ['Streaming']
    },
    {
      id: 5,
      name: 'DE-Frankfurt',
      country: 'Germany',
      countryCode: 'DE',
      flag: '🇩🇪',
      location: 'Frankfurt, Germany',
      protocol: 'Trojan',
      latency: 178,
      load: 61,
      isOnline: true,
      tags: []
    }
  ]);
});

// Connect to node
app.post('/api/v1/nodes/:id/connect', authenticateToken, (req, res) => {
  const nodeId = parseInt(req.params.id);
  res.json({
    success: true,
    message: 'Connected successfully',
    nodeId,
    connectionId: Math.random().toString(36).substring(7)
  });
});

// Disconnect
app.post('/api/v1/nodes/:id/disconnect', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Disconnected successfully'
  });
});

// ==================== WALLET ====================

app.get('/api/v1/wallet/balance', authenticateToken, (req, res) => {
  res.json({
    balance: 0.00,
    currency: 'CNY',
    coupons: [
      {
        id: 1,
        code: 'WELCOME2024',
        discount: 10,
        type: 'percentage',
        expiresAt: '2025-01-31T23:59:59Z'
      }
    ]
  });
});

// ==================== NOTIFICATIONS ====================

app.get('/api/v1/notifications', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Dec 20, 2024 from 02:00-04:00 UTC',
      isRead: false,
      createdAt: '2024-12-15T10:00:00Z'
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your subscription has been renewed successfully',
      isRead: false,
      createdAt: '2024-12-14T15:30:00Z'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Traffic Usage Alert',
      message: 'You have used 75% of your monthly traffic',
      isRead: true,
      createdAt: '2024-12-13T09:00:00Z'
    }
  ]);
});

app.get('/api/v1/announcements', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      icon: '🚀',
      title: 'New Singapore Nodes Online',
      content: '3 new high-performance nodes added in Singapore region',
      publishDate: '2024-12-16T08:00:00Z',
      isPinned: true,
      tags: ['nodes', 'update']
    },
    {
      id: 2,
      icon: '🛡️',
      title: 'Security Protocol Upgraded to v2.4',
      content: 'Enhanced encryption and stability improvements',
      publishDate: '2024-12-15T12:00:00Z',
      isPinned: false,
      tags: ['security']
    },
    {
      id: 3,
      icon: '🎉',
      title: 'Holiday Sale: 20% Off Annual Plans',
      content: 'Limited time offer! Use code HOLIDAY2024',
      publishDate: '2024-12-13T00:00:00Z',
      isPinned: true,
      tags: ['promotion']
    }
  ]);
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Mock API Server is running!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   POST   /api/v1/auth/login`);
  console.log(`   POST   /api/v1/auth/refresh`);
  console.log(`   POST   /api/v1/auth/logout`);
  console.log(`   GET    /api/v1/user/profile`);
  console.log(`   GET    /api/v1/user/subscription`);
  console.log(`   GET    /api/v1/user/devices`);
  console.log(`   GET    /api/v1/stats/traffic/daily`);
  console.log(`   GET    /api/v1/stats/connection-logs`);
  console.log(`   GET    /api/v1/nodes`);
  console.log(`   POST   /api/v1/nodes/:id/connect`);
  console.log(`   POST   /api/v1/nodes/:id/disconnect`);
  console.log(`   GET    /api/v1/wallet/balance`);
  console.log(`   GET    /api/v1/notifications`);
  console.log(`   GET    /api/v1/announcements`);
  console.log(`   GET    /api/health`);
  console.log(`\n🔑 Test credentials:`);
  console.log(`   Email: demo@argusvpn.com`);
  console.log(`   Password: password123`);
  console.log(`\n✨ Ready to accept requests!\n`);
});
