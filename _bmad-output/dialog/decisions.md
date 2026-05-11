# Product Brief 决策日志

## 2026-05-07

- 项目按从 0 到 1 的新产品处理，现有 demo 仅作为方向参考。
- 首批用户定位为日常变美的新手。
- 初始核心场景为两类：此时此刻基于当前形象给出未来改变建议；买衣服试穿时判断是否适合、是否值得买。
- 项目组织形态为个人主导，Sue 负责方向判断与验收，AI 负责主要执行。
- 项目触发因素是 OpenAI image2 模型在个人形象风格变化场景表现优秀，但国内普通用户存在信息差和使用门槛。
- 初始商业假设：如果工具能让用户看到自己逼真的多种风格形象，降低尝试新发型、新衣服、新风格的心理门槛，则可能吸引并服务一批愿意付费的新手用户。
- 愿景确认：Style AI 是日常变美新手的个人风格试验室，通过真实预览不同主流风格和适配分析，帮助用户知道自己适合什么，同时保留个人喜好与最终选择权。
- 定位确认：MVP 是 AI 个人形象生成与万能试穿/试造型工具，双核心为个人形象生成和外部图片导入试穿/试造型。

## Business Model Decision

- **Opening question:** 第一阶段更想验证普通用户自己付费，还是商家/达人侧付费。
- **User response:** 普通用户自己付费。
- **Key discussion points:** 收费倾向为生成次数/图片额度；可以提供一些免费额度；第一批用户由 Sue 自己冷启动，拉种子用户试验。
- **Final decision:** B2C 模式，普通用户为 AI 生成次数/图片额度付费。
- **Rationale:** 图片生成有明确成本，用户容易理解额度付费；少量免费额度能先展示核心价值，再引导购买。
- **Implications:** MVP 聚焦个人用户建档、首次生成、额度消耗展示、购买入口、种子用户反馈与付费验证；暂不做 B 端商家后台或导购工具。

## Target Users Decision

- Primary user: 主动想变美但缺少判断力的新手。
- Secondary users: 购物决策型用户、轻度好奇型用户。
- MVP qualifying condition: 用户愿意上传照片或建立个人形象档案。
- Explicit non-target: 强隐私顾虑、不愿上传照片/建档的人；专业造型师级服务或 B 端工具需求方。

## Product Concept Decision

- 使用必须登录，但不强制建立个人形象档案。
- 用户可以本次授权上传/拍摄照片直接生成。
- 个人档案是可选加速器，用来减少重复上传，不是使用前提。
- 首页双入口并列：个人形象生成、万能试穿/试造型。
- 历史生成结果与个人档案需要概念分离，避免用户误以为生成即永久建档。

## Success Criteria Decision

- 第一轮测试规模：20-50 个种子用户。
- 测试周期：7-14 天。
- Primary metric：至少 60% 用户完成首次个人形象生成或试穿生成，并表示结果“像自己、可用于判断”。
- Secondary metrics：至少 30% 二次生成；10%-20% 愿意购买额度或明确表示愿意付费；至少 5 个用户给出具体使用反馈；记录生成质量问题。
- MVP validation north star：种子用户看到自己的生成结果后，是否愿意继续花额度探索更多风格。

## Competitive Landscape Decision

- 最危险竞品是直接 AI 试穿/试造型产品，而不是小红书本身。
- 小红书、电商图和买家秀是重要替代方案与灵感来源，但短板是展示别人效果，不展示用户自己的效果。
- 通用图像模型能力会持续商品化，因此 Style AI 不能只依赖“生成更真实”作为优势。
- MVP 的现实优势应聚焦于中国日常变美新手、双入口体验、推荐/避坑/原因解释、可选档案、额度付费和种子用户快速迭代。
- 风险：大平台或美图类工具加入个人形象分析报告后，会压缩 Style AI 的泛化试穿优势。

## Constraints Decision

- MVP 必须在国内用户环境可访问。
- MVP 图像生成模型只考虑 image2。
- AI 能力需要由服务端封装，不能暴露 API/模型复杂度给普通用户。
- 登录必需，个人形象档案可选。
- 免费额度要受控，图片生成成本是关键设计参数。
- MVP 范围限定为个人形象生成与万能试穿/试造型，不做 B 端、人工顾问、复杂社区或多模型选择。

## Platform Strategy Decision

- MVP 平台策略：React Native mobile app first。
- 设备优先级：mobile-first。
- iOS/Android 都是未来目标，MVP 可用 Expo、安卓包、TestFlight 等方式给种子用户分发。
- 独立服务端必需，负责登录、额度、订单/支付、图片存储、image2 封装、生成历史和国内访问稳定性。
- MVP 不做离线生成。
- H5 可作为介绍页/邀请页/下载页，不承载核心生成体验。

## Tone of Voice Decision

- UI 微文案语气：温和但不讨好、具体但不专业压迫、鼓励尝试但保留选择权、可信且克制、轻松生活化。
- 禁用方向：外貌打击式、夸张营销式、专家审判式、含糊鸡汤式。
- 重点：推荐和避坑都要解释原因，但不剥夺用户最终选择。

## Product Brief Synthesis (Step 12)

- **Final narrative presented:** Yes.
- **Adjustments during synthesis:** No additional changes requested.
- **User confirmation:** Confirmed with "ok".
- **Brief generated:** `_bmad-output/A-Product-Brief/product-brief.md`
- **Completion:** 2026-05-09
