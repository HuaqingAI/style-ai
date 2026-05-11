# Feature Impact Analysis: style-ai

> 基于 Trigger Map 的 MVP 功能优先级评估。

**Created:** 2026-05-11
**Primary Persona Weight:** 小雨 = High 5 / Medium 3 / Low 1
**Other Personas Weight:** 林曼、阿澄 = High 3 / Medium 1 / Low 0
**Must Have Rule:** Primary High or total score >= 8

---

## Scoring Table

| Rank | Feature | 小雨 | 林曼 | 阿澄 | Score | Decision |
|------|---------|------|------|------|-------|----------|
| 1 | 本人照片上传/拍摄 + 照片质量引导 | High | High | Medium | 9 | Must Have |
| 2 | 个人形象生成主入口 | High | Medium | High | 9 | Must Have |
| 3 | 生成结果本人相似度与失败重试机制 | High | High | Medium | 9 | Must Have |
| 4 | 推荐/谨慎尝试/原因解释 | High | High | Low | 8 | Must Have |
| 5 | 照片用途、历史结果、常用形象档案分离 | High | Medium | Medium | 7 | Must Have |
| 6 | 额度余额、消耗提示、失败处理 | High | High | Medium | 9 | Must Have |
| 7 | 外部参考图导入试穿/试造型 | Medium | High | Medium | 7 | Consider for MVP |
| 8 | 结果历史、收藏和对比 | Medium | High | Medium | 7 | Consider for MVP |
| 9 | 可选保存为常用形象 | Medium | Medium | Low | 4 | Consider for MVP |
| 10 | 种子用户反馈入口 | High | Medium | Low | 6 | Must Have |
| 11 | 保存/分享结果 | Medium | Medium | High | 7 | Consider for MVP |
| 12 | 主流风格分类/风格枚举 | Medium | Medium | High | 7 | Consider for MVP |
| 13 | 购买额度入口 | Medium | High | Low | 6 | Consider for MVP |
| 14 | 社区/广场/公开作品流 | Low | Low | Medium | 2 | Defer |
| 15 | 达人合作/种草链路 | Low | Medium | Medium | 3 | Defer |
| 16 | 专业造型师人工咨询 | Low | Medium | Low | 2 | Defer |
| 17 | B 端商家后台 | Low | Low | Low | 1 | Defer |
| 18 | 多模型选择/高级生成参数 | Low | Low | Low | 1 | Defer |

---

## Must Have MVP

### 1. 本人照片上传/拍摄 + 照片质量引导

**Reasoning:** 所有核心体验都从可信照片开始。照片质量差会直接破坏"像本人"和"可判断"两个关键指标。

### 2. 个人形象生成主入口

**Reasoning:** 小雨是首要用户，首页必须让她不依赖外部参考图也能立刻获得价值。

### 3. 生成结果本人相似度与失败重试机制

**Reasoning:** 如果结果不像本人，产品会从决策工具降级为娱乐滤镜。失败处理也影响额度信任。

### 4. 推荐/谨慎尝试/原因解释

**Reasoning:** Style AI 的差异不只是图像生成，而是帮助新手判断。解释必须温和、具体、保留选择权。

### 5. 照片用途、历史结果、常用形象档案分离

**Reasoning:** 隐私和档案边界是上传照片的关键心理门槛。不能把建档做成隐形默认。

### 6. 额度余额、消耗提示、失败处理

**Reasoning:** B2C 额度付费模型需要从第一天就可信。用户必须知道每次生成消耗什么。

### 7. 种子用户反馈入口

**Reasoning:** MVP 的核心任务是学习。每次生成后都应收集"像不像、能不能判断、哪里不对"。

---

## Consider for MVP

### 外部参考图导入试穿/试造型

这是林曼的核心入口，也在 Product Brief 中被确定为双核心之一。若开发成本可控，应进入 MVP；若成本压力大，至少保留简化版本。

### 结果历史、收藏和对比

帮助林曼做决策，也帮助小雨回看不同方向。建议做轻量历史，不要一开始做复杂作品管理。

### 可选保存为常用形象

能减少重复上传，但必须在首次生成后再提示，不能成为前置门槛。

### 保存/分享结果

帮助阿澄传播，也帮助林曼问朋友。MVP 可以只做保存图片和系统分享，不做社区。

### 主流风格分类/风格枚举

帮助新手启动探索。需要控制数量，避免让用户陷入选择困难。

### 购买额度入口

需要验证付费意愿，但购买入口不应比首次价值更早出现。种子测试可先用模拟购买或人工记录付费意愿。

---

## Defer

- 社区/广场/公开作品流
- 达人合作/种草链路
- 专业造型师人工咨询
- B 端商家后台
- 多模型选择/高级生成参数

这些功能会扩大范围、增加治理成本，且不能直接提升第一轮种子测试最关键的"像本人、可判断、愿意继续花额度"。

---

## MVP Priority Recommendation

第一版产品应先完成一条闭环：

1. 登录进入。
2. 选择"生成我的形象方案"。
3. 上传/拍摄照片，看到照片用途说明。
4. 消耗免费额度生成。
5. 查看本人风格结果 + 推荐/谨慎原因。
6. 反馈像不像、能不能判断。
7. 保存结果或继续生成。
8. 在价值出现后展示剩余额度和购买入口。

第二条闭环是"试穿/试造型"，可作为并列入口进入 MVP，但它的第一版应保持克制：导入参考图、生成本人效果、给出适配判断、保存/分享。

---

## Strategic Rationale

Style AI 的 MVP 不应追求一次性覆盖所有美妆、发型、服饰和社交玩法。第一轮要证明的是：

- AI 结果足够像本人。
- 用户相信它能帮助自己判断。
- 用户愿意继续生成。
- 用户理解并接受额度付费。
- 用户信任照片和档案处理方式。

只要这五点成立，后续才有理由扩展更多品类、更多风格、更强购物链路和更复杂的商业化。

