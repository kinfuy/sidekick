# DevTester - 开发者测试工具集

<div align="center">

![DevTester Logo](packages/extension/public/logo.png)

**专注于开发测试，但不止于此**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.0.5-blue.svg)](https://github.com/kinfuy/dev-tester)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-DevTester-green.svg)]()

</div>

## Chrome Web Store 下载


[Chrome Web Store](https://chromewebstore.google.com/detail/devtester/lgdplgdlaacpegfninnaekfcpajmafga?hl=en&authuser=0)

## 📖 项目简介

DevTester 是一个功能丰富的 Chrome 扩展程序，专为开发者设计，提供多种实用的开发测试工具。从环境通知到点击统计，从账户管理到内容屏蔽，DevTester 致力于提升开发者的工作效率。

## ✨ 主要功能

### 🔔 环境通知 (Web Notice)
- 在网页中显示自定义通知信息
- 支持环境变量和配置信息的实时展示
- 可自定义通知样式和位置

### 👤 开发者账户 (Dev Account)
- 账户管理和自动登录功能
- 支持快捷键操作
- 用户仪表板和数据统计

### 🖱️ 点击计数器 (Click Count)
- 统计页面点击次数
- 可视化点击数据
- 支持数据导出和分析

### 🚫 内容屏蔽 (URL Block)
- 屏蔽内容农场和垃圾网站
- 自定义屏蔽规则
- 提升浏览体验

### 🔗 链接跳转 (Link Go)
- 智能链接跳转功能
- 自定义跳转规则
- 提升导航效率

### 💾 存储门户 (Storage Portal)
- 浏览器存储管理工具
- 支持 LocalStorage、SessionStorage 等
- 数据查看和编辑功能

### 📊 浏览行为分析 (Browse Behavior)
- 分析用户浏览行为
- 生成行为报告
- 数据可视化展示

### 🎨 应用布局 (App Layout)
- 自定义应用布局
- 响应式设计支持
- 主题切换功能

## 🚀 快速开始

### 安装方式

#### 方式一：从 Chrome Web Store 安装
1. 访问 [Chrome Web Store](https://chrome.google.com/webstore/detail/devtester)
2. 点击"添加至 Chrome"
3. 确认安装

#### 方式二：开发者模式安装
1. 下载项目源码
```bash
git clone https://github.com/kinfuy/dev-tester.git
cd dev-tester
```

2. 安装依赖
```bash
pnpm install
```

3. 构建项目
```bash
pnpm run build
```

4. 在 Chrome 浏览器中打开 `chrome://extensions/`
5. 开启"开发者模式"
6. 点击"加载已解压的扩展程序"
7. 选择 `packages/extension/dist` 目录

### 开发环境

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 启动后端服务
pnpm run serve

# 构建生产版本
pnpm run build

# 代码检查
pnpm run lint
```

## 🛠️ 技术栈

### 前端技术
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 下一代前端构建工具
- **Element Plus** - Vue 3 组件库
- **ECharts** - 数据可视化图表库
- **Less** - CSS 预处理器

### 后端技术
- **NestJS** - Node.js 框架
- **TypeScript** - 类型安全
- **MySQL** - 数据库
- **JWT** - 身份认证

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks
- **Commitlint** - 提交信息规范

## 📁 项目结构

```
sidekick/
├── packages/
│   ├── extension/          # Chrome 扩展主程序
│   │   ├── src/
│   │   │   ├── applications/  # 应用模块
│   │   │   ├── components/    # 公共组件
│   │   │   ├── core/         # 核心功能
│   │   │   ├── popup/        # 弹窗页面
│   │   │   ├── setting/      # 设置页面
│   │   │   └── sidepanel/    # 侧边栏
│   │   └── public/          # 静态资源
│   ├── server/              # 后端服务
│   │   ├── src/
│   │   │   ├── auth/        # 认证模块
│   │   │   ├── card/        # 卡片模块
│   │   │   ├── user/        # 用户模块
│   │   │   └── subscription/ # 订阅模块
│   │   └── public/          # 静态资源
│   ├── docs/                # 文档
│   └── landing/             # 落地页
└── README.md
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请查看以下指南：

### 提交 Issue
- 使用清晰的标题描述问题
- 提供详细的复现步骤
- 包含浏览器版本和操作系统信息

### 提交 Pull Request
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范
- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 添加适当的注释和文档

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 联系我们

- 项目主页：https://github.com/kinfuy/dev-tester
- 问题反馈：https://github.com/kinfuy/dev-tester/issues
- 邮箱：kinfuy@example.com

---

<div align="center">

**如果这个项目对您有帮助，请给它一个 ⭐️**

</div>
