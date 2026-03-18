# Resume Helper v3.1

AI 驱动的完全自治求职流水线 - **铁三角增强版**

## ⚙️ 环境依赖 (Prerequisites)

**注意：** resume-helper v3.0 已经从单体脚本进化为完全自治的求职流水线。为了使用最新的 `Auto-Hunt` 功能，你必须在本地安装并运行 **OpenClaw** 环境。

* **OpenClaw**: 提供底层的大模型算力与 `sessions_spawn` 子代理调度。
* **multi-search-engine (Skill)**: 必须安装此技能，用于在全网自动抓取真实的岗位 JD。
* **md-to-pdf-cjk (Skill)**: 用于 PDF 导出，支持中文简历。

## 🚀 v3.0 全新工作流：Auto-Hunt (全自动猎头)

我们打通了从"职位搜索"到"简历投递"的全自动闭环。输入目标岗位，引擎将自动：

1. **感知 (Search)**：调用搜索引擎抓取最新的真实 JD。
2. **提纯 (Extract)**：大模型自动清洗网页噪音，提取 5-8 个核心技能关键词。
3. **确认 (Human-in-the-loop)**：终端暂停，等待你确认或修改关键词，确保零失误。
4. **交付 (Deliver)**：底层反幻觉协议启动，输出高度对齐的 PDF 简历与 ATS 体检报告。

---

## 📊 效果展示 (Demo)

### Before & After 对比

**优化前 ATS 评分**: 38% (匹配 3/8 关键词)

**优化后 ATS 评分**: 88% (匹配 7/8 关键词)

**提升幅度**: **+50%**

查看完整 Demo 资产：[docs/demo/](docs/demo/)

---

## 🎯 核心特性

### ✅ 反幻觉协议 (Anti-Hallucination)

**绝不捏造简历经历**

- 所有优化基于现有内容
- 无虚构工作经历、技能或成就
- 保护求职者职业诚信

### ✅ ATS 评分系统

**量化优化效果**

- 优化前后对比
- 关键词匹配分析
- 缺失项识别报告

### ✅ 智能精简 (v3.1 新增)

**自动压缩到 1 页**

- 保留关键信息
- 删除冗余内容
- JD 关键词对齐

### ✅ PDF 导出引擎

**服务器友好方案**

- 完美中文支持
- 无需 Puppeteer/LaTeX
- 2GB RAM 即可运行

---

## 🚀 快速开始

### 安装

```bash
# 安装 OpenClaw
npm install -g openclaw

# 安装技能
clawhub install resume-helper
clawhub install multi-search-engine
clawhub install md-to-pdf-cjk

# 安装系统依赖
apt install python3-reportlab fonts-noto-cjk
```

### 使用方法

#### 交互式求职（推荐）

```bash
# 自动搜索 JD → 提取关键词 → 人工确认 → 生成 PDF
node scripts/auto-hunt.js "游戏策划培训生" resume.md "腾讯"
```

#### 自动化求职

```bash
# 跳过人工确认，全自动运行
node scripts/auto-hunt.js "游戏策划培训生" resume.md "腾讯" --auto
```

#### 手动优化简历

```bash
# 指定关键词优化
node scripts/optimize-resume.js resume.md "Unity,Roguelike,关卡设计" "凉屋游戏"

# 导出 PDF
node scripts/export-pdf.js resume-optimized.md
```

---

## 📁 项目结构

```
resume-helper/
├── scripts/
│   ├── auto-hunt.js           # v3.0 主控脚本
│   ├── optimize-resume.js     # 简历优化引擎
│   ├── export-pdf.js          # PDF 导出
│   ├── anonymizer-agent.js    # 脱敏子代理
│   └── llm-extractor-agent.js # 关键词提取子代理
├── docs/
│   └── demo/                  # Before & After Demo
├── templates/
│   └── resume-template.md     # 简历模板
└── examples/
    └── example-resume.md      # 示例简历
```

---

## 🔧 工作流程架构

```
用户输入 (目标岗位 + 简历)
    ↓
PHASE 1: JD 搜索引擎
    - multi-search-engine 技能
    - 获取真实职位描述
    ↓
PHASE 2: LLM 关键词提纯引擎
    - 子代理处理
    - 清洗杂乱网页文本
    - 提取 5-8 个核心关键词
    ↓
HITL: 人工确认
    - 用户审核关键词
    - 可覆盖或确认
    ↓
PHASE 3: 简历优化引擎
    - 反幻觉协议
    - ATS 评分对比
    - 智能精简到 1 页
    ↓
PHASE 4: 最终交付
    - PDF 简历
    - ATS 优化报告
```

---

## 🛡️ 安全与隐私

### 反幻觉保证

- 所有优化基于用户真实经历
- 无捏造工作经历、技能或成就
- 全程透明可审查

### 脱敏展示

- Demo 资产已完全脱敏
- 无任何真实个人信息泄漏
- 可安全公开展示

---

## 📈 版本历史

### v3.1 (2026-03-18)
- ✨ 新增智能精简功能（自动压缩到 1 页）
- 🔧 优化关键词提取逻辑
- 📊 Demo 资产脱敏展示

### v3.0 (2026-03-18)
- 🚀 Auto-Hunt 完全自治流水线
- 🤖 LLM 关键词提纯引擎
- 👤 Human-in-the-loop 确认机制

### v2.1 (2026-03-18)
- 🎨 文本洁癖协议
- 📄 优化说明独立报告
- 🔒 反幻觉协议强化

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

请遵循 [OpenClaw 贡献指南](https://github.com/zealxz/openclaw/blob/main/CONTRIBUTING.md)

---

## 📄 许可证

MIT License

---

## 🙏 致谢

**铁三角团队协作**：

- **zealx**: 产品愿景、战略决策、技术决策
- **NOVA**: 架构设计、代码实现、测试验证
- **Gemini**: 架构审查、质量保证、优化建议

---

**GitHub**: https://github.com/zealxz/resume-helper

**问题反馈**: https://github.com/zealxz/resume-helper/issues