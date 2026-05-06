# Style AI · 个人形象 AI 助理

一款基于多模态大模型的个人形象分析 APP，帮助你全面分析 **发型、穿搭、妆容、配饰**，并给出可执行的改进建议。

## ✨ 核心功能

- **拍照 / 上传照片** - 相机实拍或从相册选取
- **AI 多维分析** - 一次性或按维度分别分析
  - 发型：发色、款式、质感、与脸型匹配度
  - 穿搭：色彩搭配、版型、风格统一性、场合适配度
  - 妆容：底妆、眉眼、唇妆、整体和谐度
  - 配饰：选择、协调度、层次感
- **评分 + 建议** - 每个维度 0-10 分 + 具体改进建议
- **历史记录** - 查看过往分析，追踪形象变化
- **个人偏好** - 设置性别和风格偏好，AI 给出更精准建议

## 🛠 技术栈

- **框架**: [Expo](https://expo.dev/) (SDK 54) + React Native 0.81
- **语言**: TypeScript
- **路由**: [Expo Router](https://docs.expo.dev/router/introduction/)（文件路由）
- **存储**: `@react-native-async-storage/async-storage`
- **图标**: FontAwesome（来自 `@expo/vector-icons`）
- **AI**: OpenAI/OpenRouter 兼容的多模态 API（默认 `claude-sonnet-4.6`）

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 AI API

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 API Key：

```
EXPO_PUBLIC_AI_API_URL=https://ai-gateway.happycapy.ai/api/v1/chat/completions
EXPO_PUBLIC_AI_API_KEY=your_api_key_here
EXPO_PUBLIC_AI_MODEL=anthropic/claude-sonnet-4.6
```

> 💡 **不配置 API Key 也能跑通流程** —— 服务层会返回 mock 数据，方便前端联调。

### 3. 启动开发

```bash
npm start
# 扫描二维码在 Expo Go 打开，或按 i/a 启动模拟器
```

## 📁 项目结构

```
style-ai/
├── app/                      # 页面（Expo Router 文件路由）
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab 导航
│   │   ├── index.tsx         # 首页 - 拍照/分析入口
│   │   ├── history.tsx       # 历史记录
│   │   └── profile.tsx       # 个人偏好设置
│   ├── analysis/[id].tsx     # 分析详情页
│   └── _layout.tsx           # 根布局
├── components/               # 主题化基础组件
├── constants/
│   ├── Categories.ts         # 分析分类定义
│   ├── Colors.ts             # 主题色
│   └── prompts.ts            # AI Prompt 模板
├── services/
│   ├── ai.ts                 # AI 分析 API 调用
│   └── storage.ts            # 本地持久化
├── types/index.ts            # 共享类型
└── assets/                   # 字体与图标
```

## 🧠 AI 设计思路

1. **System Prompt 分类注入** - 根据用户选择的维度（全面/发型/穿搭/妆容/配饰）动态组装 Prompt，避免让模型在无关维度浪费 token
2. **用户偏好注入** - 从本地读取 gender + 风格偏好，写入 Prompt，个性化点评
3. **严格 JSON 输出** - System Prompt 强约束输出格式，降低解析失败率
4. **容错解析** - `services/ai.ts` 兼容 markdown 代码块包裹的 JSON

## 🔮 后续规划

- [ ] 风格试穿（让 AI 生成改造后图）
- [ ] 单品识别 + 购物链接
- [ ] 气质关键词词云
- [ ] 多图对比分析
- [ ] 云端同步历史记录

## 📄 License

MIT
