# Step 07a: Product Concept

## Opening Question

Saga asked whether the structural core is "personal profile as the base, with all generation centered on my image."

## User Correction

Sue clarified that this is partly right but not fully: because of privacy and trust concerns, users may be willing to take/upload photos for generation, but may not be willing to formally establish a saved personal profile.

Sue further clarified:
- It is not a guest mode; users must log in to use the product.
- Personal image profile is optional.
- First logged-in home screen should present the two core actions side by side, not hide one behind the other.

## Reflection Checkpoint

Saga synthesized the concept:

**Core Structural Idea:** Style AI 是一个登录后使用的“个人形象生成画布”。用户不必先建立长期档案，只要本次授权上传/拍摄自己的照片，就可以从两个并列入口开始：一是让系统生成适合自己的主流形象方案，二是导入外部衣服/发型/配饰/妆容参考图进行万能试穿/试造型。个人档案是可选加速器，用来减少重复上传，而不是使用前提。

**Why This Approach:** 它平衡了商业与信任：登录保证额度、付费和历史记录能运转；不强制建档降低隐私压力；双入口并列既能服务首次用户“我想看看自己适合什么”，也能服务购物或内容种草场景“这个东西放我身上如何”。

**Concrete Example:** 用户登录后看到两个主按钮：`生成我的形象方案` 和 `试穿/试造型`。用户可以上传一张当前照片直接生成发型/穿搭/配饰方向，也可以导入小红书/电商图，把某件衣服或某个发型试到自己身上。生成后系统提示“保存为个人档案，下次更快生成”，但不强迫。

Sue confirmed: 可以.

## Final Product Concept

### Core Structural Idea

Style AI 是一个登录后使用的个人形象生成画布。用户不必先建立长期个人档案，只要本次授权上传或拍摄自己的照片，就可以从两个并列入口开始：

- 系统生成适合自己的主流形象方案
- 导入外部衣服、发型、配饰、妆容参考图进行万能试穿/试造型

个人档案是可选加速器，用来减少重复上传，而不是使用前提。

### Implementation Principle

- 登录是必要前提，用于额度、付费、历史记录和账号管理。
- 上传/拍摄照片即可生成，不强制保存为长期档案。
- 首页双入口并列：个人形象生成与万能试穿/试造型。
- 生成完成后再引导用户选择是否保存为个人档案。
- 历史记录与个人档案应分离：保存生成结果不等于保存可复用个人档案。

### Rationale

这个结构平衡了价值、商业和信任。登录让额度和付费模型成立；不强制建档减少隐私压力；双入口并列既服务首次用户的主动推荐需求，也服务购物和外部内容触发的即时试穿需求。

### Features That Stem From Concept

- 登录与账户体系
- 生成额度/图片额度管理
- 上传或拍摄个人照片
- 可选个人档案保存
- 个人形象方案生成
- 外部参考图导入试穿/试造型
- 历史生成结果
- 保存为档案的轻提示，而非强制流程
