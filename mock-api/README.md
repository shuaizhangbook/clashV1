# Mock API Server for ClashV1
# ClashV1 模拟 API 服务器

模拟 xboard 面板的后端 API，用于开发和测试 ClashV1 前端。

---

## 🚀 服务器状态

✅ **运行中**: http://localhost:3001
✅ **启动时间**: 2025-12-16
✅ **端点数量**: 15 个

---

## 📋 API 端点

### 认证 (Authentication)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| POST | `/api/v1/auth/login` | 用户登录 | ❌ |
| POST | `/api/v1/auth/refresh` | 刷新 Token | ❌ |
| POST | `/api/v1/auth/logout` | 用户登出 | ✅ |

### 用户 (User)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/v1/user/profile` | 获取用户信息 | ✅ |
| GET | `/api/v1/user/subscription` | 获取订阅信息 | ✅ |
| GET | `/api/v1/user/devices` | 获取在线设备 | ✅ |

### 统计 (Statistics)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/v1/stats/traffic/daily` | 每日流量统计 | ✅ |
| GET | `/api/v1/stats/connection-logs` | 连接日志 | ✅ |

### 节点 (Nodes)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/v1/nodes` | 获取节点列表 | ✅ |
| POST | `/api/v1/nodes/:id/connect` | 连接到节点 | ✅ |
| POST | `/api/v1/nodes/:id/disconnect` | 断开连接 | ✅ |

### 钱包 (Wallet)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/v1/wallet/balance` | 获取余额 | ✅ |

### 通知 (Notifications)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/v1/notifications` | 获取通知列表 | ✅ |
| GET | `/api/v1/announcements` | 获取公告 | ✅ |

### 健康检查 (Health)

| 方法 | 端点 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/health` | 服务器健康检查 | ❌ |

---

## 🔑 测试账号

```
Email: demo@argusvpn.com
Password: password123
```

---

## 📝 使用示例

### 1. 登录

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@argusvpn.com",
    "password": "password123"
  }'
```

**响应**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "demo@argusvpn.com",
    "username": "Demo User",
    "level": 5,
    "isVip": true
  }
}
```

### 2. 获取用户信息

```bash
curl http://localhost:3001/api/v1/user/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. 获取节点列表

```bash
curl http://localhost:3001/api/v1/nodes \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. 获取流量统计

```bash
curl http://localhost:3001/api/v1/stats/traffic/daily?days=7 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔧 本地运行

### 启动服务器

```bash
cd /Users/cc/clashv1/mock-api
npm start
```

### 停止服务器

```bash
pkill -f "node server.js"
```

### 查看日志

服务器会在控制台输出所有请求日志。

---

## 📊 Mock 数据说明

### 用户数据
- **用户等级**: Lv.5 Elite (75%)
- **VIP 状态**: 是
- **到期时间**: 2025-01-03 (18天后)

### 订阅数据
- **套餐**: Premium Plan (年费)
- **流量总量**: 500 GB
- **已使用**: 376 GB (75%)
- **剩余**: 124 GB
- **设备限制**: 5 台
- **在线设备**: 2 台

### 节点数据
提供 5 个模拟节点：
- 🇺🇸 US-East-1 (WireGuard)
- 🇯🇵 JP-Tokyo-2 (Shadowsocks)
- 🇸🇬 SG-Marina (V2Ray)
- 🇬🇧 UK-London (WireGuard)
- 🇩🇪 DE-Frankfurt (Trojan)

### 流量统计
- 自动生成最近 7/30 天的随机流量数据
- 每天 2-20 GB 范围

### 连接日志
- 5 条模拟连接记录
- 包括成功和失败的连接

---

## 🔐 JWT Token 说明

### Access Token
- **有效期**: 15 分钟
- **用途**: API 请求认证

### Refresh Token
- **有效期**: 7 天
- **用途**: 刷新 Access Token

### Token 格式
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🛠️ 技术栈

- **Node.js**: Runtime
- **Express.js**: Web 框架
- **jsonwebtoken**: JWT 认证
- **cors**: 跨域支持

---

## 📦 依赖

```json
{
  "express": "^5.2.1",
  "cors": "^2.8.5",
  "jsonwebtoken": "^9.0.3"
}
```

---

## 🔄 与前端集成

ClashV1 前端应该配置 API 基础 URL 为：

```javascript
// .env.development
VITE_API_BASE_URL=http://localhost:3001
```

然后在前端代码中：

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000
});

// 登录示例
const { data } = await api.post('/api/v1/auth/login', {
  email: 'demo@argusvpn.com',
  password: 'password123'
});

// 保存 token
localStorage.setItem('accessToken', data.accessToken);

// 使用 token 访问受保护的 API
api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

const profile = await api.get('/api/v1/user/profile');
```

---

## ⚠️ 注意事项

1. **这是 Mock API**，所有数据都是模拟的
2. **密码不安全**，仅用于开发测试
3. **无数据持久化**，重启后所有数据重置
4. **不适用于生产环境**

---

## 🎯 后续计划

待 xboard 真实后端部署后：

1. 修改前端配置指向真实 API
2. 更新认证流程
3. 处理真实数据格式
4. 添加错误处理

---

## 📞 问题反馈

如遇问题，请检查：
1. 服务器是否运行（`curl http://localhost:3001/api/health`）
2. 端口是否被占用（`lsof -i :3001`）
3. 日志输出是否有错误

---

**最后更新**: 2025-12-16
**版本**: 1.0.0
