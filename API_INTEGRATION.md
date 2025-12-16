# API Integration Guide
# ClashV1 前端对接后端 API 集成指南

**Version / 版本**: 1.0
**Date / 日期**: 2025-12-01
**Target Backend / 目标后端**: XrayR / V2Board Compatible Panels

---

## 📋 Table of Contents / 目录

1. [Overview / 概述](#overview)
2. [Architecture Design / 架构设计](#architecture)
3. [API Endpoints Mapping / API 端点映射](#api-endpoints)
4. [Data Models / 数据模型](#data-models)
5. [Authentication / 认证](#authentication)
6. [Implementation Steps / 实施步骤](#implementation)
7. [Code Examples / 代码示例](#code-examples)
8. [Error Handling / 错误处理](#error-handling)
9. [Security Considerations / 安全考虑](#security)
10. [Testing Strategy / 测试策略](#testing)

---

## <a name="overview"></a>📖 Overview / 概述

### English

This document outlines the integration plan for connecting the ClashV1 frontend dashboard with XrayR/V2Board compatible backend APIs. The integration enables real-time data synchronization, user management, traffic statistics, and server node management.

### 中文

本文档概述了 ClashV1 前端仪表板与 XrayR/V2Board 兼容后端 API 的集成计划。该集成支持实时数据同步、用户管理、流量统计和服务器节点管理。

### Current Status / 当前状态

**Frontend (ClashV1)**:
- ✅ Complete UI/UX design
- ✅ Bilingual support (EN/ZH)
- ✅ Responsive layout
- ⚠️  Static/mock data (needs API integration)

**Backend (XrayR/V2Board)**:
- ✅ Multi-protocol support (V2Ray, Trojan, Shadowsocks)
- ✅ User management
- ✅ Traffic statistics
- ✅ Node management
- ⚠️  API endpoints need to be identified

---

## <a name="architecture"></a>🏗️ Architecture Design / 架构设计

### System Architecture / 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                     ClashV1 Frontend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │  State Mgmt  │  │   Services   │      │
│  │  Components  │──│   (Hooks)    │──│  API Layer   │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
└────────────────────────────────────────────┼────────────────┘
                                             │
                                             │ HTTPS/WSS
                                             │
┌────────────────────────────────────────────┼────────────────┐
│                   API Gateway / Proxy       │                │
│  ┌──────────────────────────────────────────────────┐       │
│  │  - Authentication Middleware                     │       │
│  │  - Rate Limiting                                 │       │
│  │  - CORS Configuration                            │       │
│  │  - Request/Response Logging                      │       │
│  └──────────────────────────────────────────────────┘       │
└────────────────────────────────────────────┼────────────────┘
                                             │
                                             │
┌────────────────────────────────────────────┼────────────────┐
│              Backend (XrayR / V2Board)     │                │
│  ┌──────────────┐  ┌──────────────┐  ┌───┴───────────┐     │
│  │  User Module │  │ Traffic Stats │  │  Node Manager │     │
│  └──────────────┘  └──────────────┘  └───────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐     │
│  │    Orders    │  │   Tickets    │  │  Subscription │     │
│  └──────────────┘  └──────────────┘  └───────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack / 技术栈

**Frontend / 前端**:
```javascript
- React 18+
- Axios (HTTP client)
- React Query (Data fetching & caching)
- Zustand or Redux Toolkit (State management)
- WebSocket (Real-time updates)
```

**Backend Communication / 后端通信**:
```
- REST API (Primary)
- WebSocket (Real-time traffic stats, notifications)
- JWT Token Authentication
```

---

## <a name="api-endpoints"></a>🔗 API Endpoints Mapping / API 端点映射

### Base URL Configuration / 基础 URL 配置

```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com',
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://api.yourdomain.com',
  TIMEOUT: 30000,
  VERSION: 'v1'
};
```

### Authentication Endpoints / 认证端点

| Endpoint | Method | Purpose | Frontend Component |
|----------|--------|---------|-------------------|
| `/api/v1/auth/login` | POST | User login | Login Form |
| `/api/v1/auth/register` | POST | User registration | Register Form |
| `/api/v1/auth/logout` | POST | User logout | Header Menu |
| `/api/v1/auth/refresh` | POST | Refresh token | Auto (Interceptor) |
| `/api/v1/auth/forgot-password` | POST | Password reset | Login Page |
| `/api/v1/auth/verify-email` | POST | Email verification | Register Flow |

### User Management / 用户管理

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/user/profile` | GET | Get user info | Hero Card, Profile |
| `/api/v1/user/profile` | PUT | Update profile | Account Settings |
| `/api/v1/user/subscription` | GET | Get subscription | Hero Card |
| `/api/v1/user/traffic` | GET | Get traffic stats | Traffic Chart |
| `/api/v1/user/devices` | GET | Get online devices | Devices Card |
| `/api/v1/user/devices/:id` | DELETE | Remove device | Devices Management |

### Subscription & Plans / 订阅与套餐

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/plans` | GET | List all plans | Store Page |
| `/api/v1/plans/:id` | GET | Get plan details | Plan Detail |
| `/api/v1/subscription/renew` | POST | Renew subscription | Renew Button |
| `/api/v1/subscription/upgrade` | POST | Upgrade plan | Upgrade Flow |
| `/api/v1/subscription/import` | GET | Get import URL | Subscription Import |

### Server Nodes / 服务器节点

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/nodes` | GET | List all nodes | Server List |
| `/api/v1/nodes/:id` | GET | Get node details | Current Server Card |
| `/api/v1/nodes/:id/connect` | POST | Connect to node | Quick Connect |
| `/api/v1/nodes/:id/disconnect` | POST | Disconnect | Disconnect Button |
| `/api/v1/nodes/:id/test-speed` | POST | Speed test | Speed Test Button |

### Traffic & Statistics / 流量统计

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/stats/traffic/daily` | GET | Daily traffic | Traffic Chart |
| `/api/v1/stats/traffic/monthly` | GET | Monthly traffic | Traffic Chart |
| `/api/v1/stats/connection-logs` | GET | Connection history | Connection Logs |
| `/api/v1/stats/real-time` | WS | Real-time metrics | Status Card |

### Wallet & Payments / 钱包与支付

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/wallet/balance` | GET | Get balance | Wallet Card |
| `/api/v1/wallet/transactions` | GET | Transaction history | Wallet Page |
| `/api/v1/wallet/coupons` | GET | List coupons | Wallet Page |
| `/api/v1/wallet/coupons/:code` | POST | Apply coupon | Coupon Input |

### Support & Tickets / 支持与工单

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/tickets` | GET | List tickets | Support Page |
| `/api/v1/tickets` | POST | Create ticket | New Ticket Form |
| `/api/v1/tickets/:id` | GET | Get ticket details | Ticket Detail |
| `/api/v1/tickets/:id/reply` | POST | Reply to ticket | Ticket Reply |

### Notifications / 通知

| Endpoint | Method | Purpose | Dashboard Section |
|----------|--------|---------|-------------------|
| `/api/v1/notifications` | GET | List notifications | Notification Card |
| `/api/v1/notifications/:id/read` | PUT | Mark as read | Notification Item |
| `/api/v1/announcements` | GET | Get announcements | Announcements Card |

---

## <a name="data-models"></a>📊 Data Models / 数据模型

### User Model / 用户模型

```typescript
interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
  level: number;              // User level (e.g., 5 = Elite)
  levelPercentage: number;    // Progress to next level (0-100)
  vipExpireDate: string;      // ISO 8601 date
  isVip: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Subscription Model / 订阅模型

```typescript
interface Subscription {
  id: number;
  userId: number;
  planId: number;
  planName: string;
  planType: 'monthly' | 'quarterly' | 'annual';
  startDate: string;
  expireDate: string;
  isExpired: boolean;
  daysRemaining: number;
  trafficTotal: number;       // GB
  trafficUsed: number;        // GB
  trafficRemaining: number;   // GB
  trafficPercentage: number;  // 0-100
  deviceLimit: number;
  devicesOnline: number;
  autoRenew: boolean;
}
```

### Node Model / 节点模型

```typescript
interface Node {
  id: number;
  name: string;
  country: string;
  countryCode: string;        // e.g., 'US', 'JP', 'SG'
  flag: string;               // Emoji flag
  location: string;           // e.g., 'Virginia, USA'
  protocol: 'WireGuard' | 'Shadowsocks' | 'V2Ray' | 'Trojan';
  latency: number;            // milliseconds
  load: number;               // percentage 0-100
  isOnline: boolean;
  speedTest?: {
    download: number;         // Mbps
    upload: number;           // Mbps
    timestamp: string;
  };
  tags?: string[];            // e.g., ['Premium', 'Gaming', 'Streaming']
}
```

### Traffic Stats Model / 流量统计模型

```typescript
interface TrafficStats {
  date: string;               // YYYY-MM-DD
  upload: number;             // GB
  download: number;           // GB
  total: number;              // GB
}

interface TrafficSummary {
  daily: TrafficStats[];
  weekly: TrafficStats[];
  monthly: TrafficStats[];
  cycleUsed: number;          // GB
  cycleTotal: number;         // GB
  cyclePercentage: number;    // 0-100
  estimatedDepletionDays: number;
}
```

### Connection Log Model / 连接日志模型

```typescript
interface ConnectionLog {
  id: number;
  nodeId: number;
  nodeName: string;
  startTime: string;          // ISO 8601
  endTime?: string;           // ISO 8601
  duration: number;           // seconds
  upload: number;             // GB
  download: number;           // GB
  status: 'success' | 'failed' | 'disconnected';
  errorMessage?: string;
}
```

### Notification Model / 通知模型

```typescript
interface Notification {
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionLabel?: string;
}
```

### Announcement Model / 公告模型

```typescript
interface Announcement {
  id: number;
  icon: string;               // Emoji
  title: string;
  content: string;
  publishDate: string;
  isPinned: boolean;
  tags?: string[];
}
```

---

## <a name="authentication"></a>🔐 Authentication / 认证

### JWT Token Flow / JWT 令牌流程

```
1. User Login
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT tokens:
   - accessToken (short-lived, e.g., 15 min)
   - refreshToken (long-lived, e.g., 7 days)
   ↓
4. Frontend stores tokens:
   - accessToken → Memory/State
   - refreshToken → HttpOnly Cookie (preferred) or localStorage
   ↓
5. Every API request includes:
   Authorization: Bearer {accessToken}
   ↓
6. Token expires → Auto refresh using refreshToken
   ↓
7. Refresh fails → Redirect to login
```

### Token Storage / 令牌存储

```javascript
// src/utils/auth.js

// Store tokens
export const setTokens = (accessToken, refreshToken) => {
  // Access token in memory (state)
  sessionStorage.setItem('accessToken', accessToken);

  // Refresh token in httpOnly cookie (set by backend)
  // or fallback to localStorage if cookies not supported
  if (!document.cookie.includes('refreshToken')) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

// Get access token
export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

// Clear tokens on logout
export const clearTokens = () => {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // Backend should clear httpOnly cookie
};
```

### Axios Interceptor / Axios 拦截器

```javascript
// src/services/axios.js
import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { getAccessToken, setTokens, clearTokens } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const { data } = await axios.post(`${API_CONFIG.BASE_URL}/api/v1/auth/refresh`, {
          refreshToken: localStorage.getItem('refreshToken')
        });

        setTokens(data.accessToken, data.refreshToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

## <a name="implementation"></a>🚀 Implementation Steps / 实施步骤

### Phase 1: Setup & Configuration / 阶段 1：设置与配置

**Duration / 工期**: 1-2 days

1. **Install Dependencies / 安装依赖**
```bash
npm install axios react-query zustand
npm install --save-dev @types/node
```

2. **Create Folder Structure / 创建文件夹结构**
```
src/
├── services/
│   ├── axios.js          # Axios instance & interceptors
│   ├── api/
│   │   ├── auth.js       # Authentication APIs
│   │   ├── user.js       # User management APIs
│   │   ├── nodes.js      # Node management APIs
│   │   ├── traffic.js    # Traffic statistics APIs
│   │   ├── wallet.js     # Wallet & payment APIs
│   │   └── tickets.js    # Support ticket APIs
├── hooks/
│   ├── useAuth.js        # Authentication hook
│   ├── useUser.js        # User data hook
│   ├── useNodes.js       # Nodes data hook
│   └── useTraffic.js     # Traffic stats hook
├── store/
│   └── authStore.js      # Auth state (Zustand)
├── utils/
│   ├── auth.js           # Token management
│   └── api.js            # API helpers
└── config/
    └── api.js            # API configuration
```

3. **Environment Variables / 环境变量**
```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
```

---

### Phase 2: Authentication Implementation / 阶段 2：认证实现

**Duration / 工期**: 2-3 days

**Step 1: Create Auth Service / 创建认证服务**

```javascript
// src/services/api/auth.js
import axios from '../axios';

export const authAPI = {
  login: async (email, password) => {
    const { data } = await axios.post('/api/v1/auth/login', {
      email,
      password
    });
    return data;
  },

  register: async (email, username, password) => {
    const { data } = await axios.post('/api/v1/auth/register', {
      email,
      username,
      password
    });
    return data;
  },

  logout: async () => {
    const { data } = await axios.post('/api/v1/auth/logout');
    return data;
  },

  refreshToken: async (refreshToken) => {
    const { data } = await axios.post('/api/v1/auth/refresh', {
      refreshToken
    });
    return data;
  }
};
```

**Step 2: Create Auth Hook / 创建认证钩子**

```javascript
// src/hooks/useAuth.js
import { useMutation, useQueryClient } from 'react-query';
import { authAPI } from '../services/api/auth';
import { setTokens, clearTokens } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation(
    ({ email, password }) => authAPI.login(email, password),
    {
      onSuccess: (data) => {
        setTokens(data.accessToken, data.refreshToken);
        queryClient.setQueryData('user', data.user);
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error('Login failed:', error);
      }
    }
  );

  const logoutMutation = useMutation(
    () => authAPI.logout(),
    {
      onSuccess: () => {
        clearTokens();
        queryClient.clear();
        navigate('/login');
      }
    }
  );

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    loginError: loginMutation.error
  };
};
```

**Step 3: Update Login Component / 更新登录组件**

```javascript
// In src/App.jsx - Login Form
import { useAuth } from './hooks/useAuth';

function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields ... */}
      {loginError && (
        <div className="text-red-400">
          {loginError.response?.data?.message || 'Login failed'}
        </div>
      )}
      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
```

---

### Phase 3: User Data Integration / 阶段 3：用户数据集成

**Duration / 工期**: 2-3 days

**Step 1: Create User Service / 创建用户服务**

```javascript
// src/services/api/user.js
import axios from '../axios';

export const userAPI = {
  getProfile: async () => {
    const { data } = await axios.get('/api/v1/user/profile');
    return data;
  },

  getSubscription: async () => {
    const { data } = await axios.get('/api/v1/user/subscription');
    return data;
  },

  getDevices: async () => {
    const { data } = await axios.get('/api/v1/user/devices');
    return data;
  },

  removeDevice: async (deviceId) => {
    const { data } = await axios.delete(`/api/v1/user/devices/${deviceId}`);
    return data;
  }
};
```

**Step 2: Create User Hook / 创建用户钩子**

```javascript
// src/hooks/useUser.js
import { useQuery } from 'react-query';
import { userAPI } from '../services/api/user';

export const useUser = () => {
  const { data, isLoading, error } = useQuery(
    'user',
    userAPI.getProfile,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000 // 10 minutes
    }
  );

  return {
    user: data,
    isLoading,
    error
  };
};

export const useSubscription = () => {
  const { data, isLoading, error } = useQuery(
    'subscription',
    userAPI.getSubscription,
    {
      staleTime: 1 * 60 * 1000, // 1 minute
      refetchInterval: 60 * 1000 // Refetch every minute
    }
  );

  return {
    subscription: data,
    isLoading,
    error
  };
};
```

**Step 3: Update Hero Card / 更新主卡片**

```javascript
// In src/App.jsx - Hero Card
import { useSubscription } from './hooks/useUser';

function HeroCard() {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const daysLeft = subscription?.daysRemaining || 0;
  const isExpired = subscription?.isExpired || false;

  return (
    <DashboardCard>
      {/* ... existing UI ... */}
      <div className="text-5xl font-bold">
        {isExpired ? t.expired : `${daysLeft} ${t.daysRemaining}`}
      </div>
      {/* ... rest of card ... */}
    </DashboardCard>
  );
}
```

---

### Phase 4: Traffic Stats Integration / 阶段 4：流量统计集成

**Duration / 工期**: 2-3 days

**Step 1: Create Traffic Service / 创建流量服务**

```javascript
// src/services/api/traffic.js
import axios from '../axios';

export const trafficAPI = {
  getDailyTraffic: async (days = 7) => {
    const { data } = await axios.get('/api/v1/stats/traffic/daily', {
      params: { days }
    });
    return data;
  },

  getMonthlyTraffic: async (months = 6) => {
    const { data } = await axios.get('/api/v1/stats/traffic/monthly', {
      params: { months }
    });
    return data;
  },

  getConnectionLogs: async (limit = 10) => {
    const { data } = await axios.get('/api/v1/stats/connection-logs', {
      params: { limit }
    });
    return data;
  }
};
```

**Step 2: Create Traffic Hook / 创建流量钩子**

```javascript
// src/hooks/useTraffic.js
import { useQuery } from 'react-query';
import { trafficAPI } from '../services/api/traffic';

export const useTrafficStats = (timeRange = '7d') => {
  const days = timeRange === '7d' ? 7 : 30;

  const { data, isLoading } = useQuery(
    ['traffic', timeRange],
    () => trafficAPI.getDailyTraffic(days),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchInterval: 5 * 60 * 1000 // Refetch every 5 minutes
    }
  );

  return {
    trafficData: data || [],
    isLoading
  };
};
```

**Step 3: Update Traffic Chart / 更新流量图表**

```javascript
// In src/App.jsx - Traffic Chart
import { useTrafficStats } from './hooks/useTraffic';

function TrafficChartCard() {
  const [timeRange, setTimeRange] = useState('7d');
  const { trafficData, isLoading } = useTrafficStats(timeRange);

  if (isLoading) {
    return <div>Loading traffic data...</div>;
  }

  return (
    <DashboardCard>
      {/* ... time range selector ... */}
      <TrafficChart data={trafficData} />
    </DashboardCard>
  );
}
```

---

### Phase 5: Node Management Integration / 阶段 5：节点管理集成

**Duration / 工期**: 2-3 days

**Step 1: Create Nodes Service / 创建节点服务**

```javascript
// src/services/api/nodes.js
import axios from '../axios';

export const nodesAPI = {
  getNodes: async () => {
    const { data } = await axios.get('/api/v1/nodes');
    return data;
  },

  getNodeDetails: async (nodeId) => {
    const { data } = await axios.get(`/api/v1/nodes/${nodeId}`);
    return data;
  },

  connectToNode: async (nodeId) => {
    const { data } = await axios.post(`/api/v1/nodes/${nodeId}/connect`);
    return data;
  },

  disconnect: async (nodeId) => {
    const { data } = await axios.post(`/api/v1/nodes/${nodeId}/disconnect`);
    return data;
  },

  testSpeed: async (nodeId) => {
    const { data } = await axios.post(`/api/v1/nodes/${nodeId}/test-speed`);
    return data;
  }
};
```

**Step 2: Create Nodes Hook / 创建节点钩子**

```javascript
// src/hooks/useNodes.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { nodesAPI } from '../services/api/nodes';

export const useNodes = () => {
  const queryClient = useQueryClient();

  const { data: nodes, isLoading } = useQuery(
    'nodes',
    nodesAPI.getNodes,
    {
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  );

  const connectMutation = useMutation(
    (nodeId) => nodesAPI.connectToNode(nodeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connection-status');
      }
    }
  );

  const disconnectMutation = useMutation(
    (nodeId) => nodesAPI.disconnect(nodeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connection-status');
      }
    }
  );

  return {
    nodes: nodes || [],
    isLoading,
    connect: connectMutation.mutate,
    disconnect: disconnectMutation.mutate,
    isConnecting: connectMutation.isLoading
  };
};
```

---

### Phase 6: Real-time Updates (WebSocket) / 阶段 6：实时更新

**Duration / 工期**: 2-3 days

**Step 1: Create WebSocket Service / 创建 WebSocket 服务**

```javascript
// src/services/websocket.js
import { API_CONFIG } from '../config/api';
import { getAccessToken } from '../utils/auth';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    const token = getAccessToken();
    const wsUrl = `${API_CONFIG.WS_URL}/ws?token=${token}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.reconnect();
    };
  }

  handleMessage(message) {
    const { type, data } = message;

    // Notify all listeners for this message type
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => callback(data));
    }
  }

  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type).delete(callback);
    };
  }

  send(type, data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 3000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();
```

**Step 2: Use WebSocket in Components / 在组件中使用 WebSocket**

```javascript
// In src/App.jsx - Connection Status Card
import { useEffect, useState } from 'react';
import { wsService } from './services/websocket';

function ConnectionStatusCard() {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    latency: 0,
    speed: 0
  });

  useEffect(() => {
    // Subscribe to real-time metrics
    const unsubscribe = wsService.subscribe('traffic-update', (data) => {
      setRealTimeMetrics(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardCard>
      <div>Latency: {realTimeMetrics.latency}ms</div>
      <div>Speed: {realTimeMetrics.speed} Mbps</div>
    </DashboardCard>
  );
}
```

---

### Phase 7: Error Handling & Loading States / 阶段 7：错误处理与加载状态

**Duration / 工期**: 1-2 days

**Step 1: Create Error Boundary / 创建错误边界**

```javascript
// src/components/ErrorBoundary.jsx
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Step 2: Create Loading Components / 创建加载组件**

```javascript
// src/components/LoadingSpinner.jsx
export function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`} />
    </div>
  );
}

// src/components/LoadingCard.jsx
export function LoadingCard() {
  return (
    <DashboardCard>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </DashboardCard>
  );
}
```

**Step 3: Global Error Toast / 全局错误提示**

```javascript
// src/hooks/useToast.js
import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  return { toasts, addToast };
};
```

---

## <a name="code-examples"></a>💻 Code Examples / 代码示例

### Complete React Query Setup / 完整 React Query 设置

```javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        console.error('Query error:', error);
      }
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Zustand Auth Store / Zustand 认证存储

```javascript
// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearUser: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      }))
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);
```

---

## <a name="error-handling"></a>🚨 Error Handling / 错误处理

### Common Error Scenarios / 常见错误场景

```javascript
// src/utils/errorHandler.js

export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
  NETWORK_ERROR: 'NETWORK_ERROR'
};

export const handleAPIError = (error) => {
  if (!error.response) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      code: ERROR_CODES.NETWORK_ERROR
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case ERROR_CODES.UNAUTHORIZED:
      return {
        message: 'Session expired. Please login again.',
        code: status
      };

    case ERROR_CODES.FORBIDDEN:
      return {
        message: 'You do not have permission to perform this action.',
        code: status
      };

    case ERROR_CODES.NOT_FOUND:
      return {
        message: 'Resource not found.',
        code: status
      };

    case ERROR_CODES.VALIDATION_ERROR:
      return {
        message: data.message || 'Validation error',
        errors: data.errors || {},
        code: status
      };

    case ERROR_CODES.SERVER_ERROR:
      return {
        message: 'Server error. Please try again later.',
        code: status
      };

    default:
      return {
        message: data.message || 'An error occurred',
        code: status
      };
  }
};
```

---

## <a name="security"></a>🔒 Security Considerations / 安全考虑

### Security Checklist / 安全检查清单

- [ ] **HTTPS Only** - All API requests over HTTPS
- [ ] **Token Security** - Store tokens securely (httpOnly cookies preferred)
- [ ] **XSS Protection** - Sanitize all user inputs
- [ ] **CSRF Protection** - Implement CSRF tokens for state-changing operations
- [ ] **Rate Limiting** - Implement client-side rate limiting
- [ ] **Input Validation** - Validate all inputs on frontend and backend
- [ ] **Secure Headers** - Implement security headers (CSP, HSTS, etc.)
- [ ] **No Sensitive Data in URLs** - Avoid passing tokens/passwords in URLs
- [ ] **Logout on Inactivity** - Auto-logout after 30 minutes of inactivity
- [ ] **Password Strength** - Enforce strong password requirements

### Content Security Policy / 内容安全策略

```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com wss://api.yourdomain.com;
">
```

---

## <a name="testing"></a>🧪 Testing Strategy / 测试策略

### Unit Tests / 单元测试

```javascript
// src/services/api/__tests__/auth.test.js
import { authAPI } from '../auth';
import axios from '../../axios';

jest.mock('../../axios');

describe('authAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockResponse = {
      data: {
        accessToken: 'token123',
        refreshToken: 'refresh123',
        user: { id: 1, email: 'test@example.com' }
      }
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await authAPI.login('test@example.com', 'password');

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith('/api/v1/auth/login', {
      email: 'test@example.com',
      password: 'password'
    });
  });
});
```

### Integration Tests / 集成测试

```javascript
// src/__tests__/integration/auth-flow.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';

describe('Authentication Flow', () => {
  it('should login and redirect to dashboard', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });
});
```

---

## 📝 Next Steps / 后续步骤

1. **确认后端 API 规格**
   - 联系后端团队获取 API 文档
   - 确认认证方式（JWT/Session）
   - 确认数据格式和字段命名

2. **设置开发环境**
   - 配置代理服务器（避免 CORS 问题）
   - 设置环境变量
   - 安装必要依赖

3. **按阶段实施**
   - 从 Phase 1 开始逐步实施
   - 每个阶段完成后测试
   - 及时修复发现的问题

4. **性能优化**
   - 实现数据缓存策略
   - 优化 API 调用频率
   - 添加加载状态和骨架屏

5. **部署准备**
   - 配置生产环境变量
   - 设置 CI/CD 流程
   - 准备监控和日志系统

---

## 📞 Support / 支持

如有问题或需要协助，请：
1. 查看本文档相关章节
2. 检查 GitHub Issues
3. 联系开发团队

---

**Document Version / 文档版本**: 1.0
**Last Updated / 最后更新**: 2025-12-01
**Maintained by / 维护者**: Development Team

---

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
