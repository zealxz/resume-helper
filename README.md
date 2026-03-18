# Resume Helper v3.1

AI-Powered Autonomous Job Hunting Pipeline - **Iron Triangle Enhanced Edition**

## ⚙️ Prerequisites

**Note:** resume-helper v3.1 has evolved from a standalone script into a fully autonomous job-hunting pipeline. To utilize the latest `Auto-Hunt` features, you must have the **OpenClaw** environment installed and running locally.

* **OpenClaw**: Provides the underlying LLM compute and `sessions_spawn` agent orchestration.
* **multi-search-engine (Skill)**: Required for autonomous, real-time fetching of Job Descriptions from the web.
* **md-to-pdf-cjk (Skill)**: Required for PDF export with full CJK support.

## 🚀 v3.0 New Workflow: Auto-Hunt

We have bridged the gap between "job searching" and "resume tailoring" into a fully automated loop:

1. **Search**: Automatically fetches the latest real JDs based on your target role.
2. **Extract**: The LLM filters out web noise and extracts 5-8 core skill keywords.
3. **Human-in-the-loop**: The terminal pauses for your confirmation or modification of the keywords, ensuring zero critical errors.
4. **Deliver**: The anti-hallucination engine generates a perfectly aligned PDF resume and an ATS health report.

---

## 📊 Demo (Before & After)

**Before ATS Score**: 38% (3/8 keywords matched)

**After ATS Score**: 88% (7/8 keywords matched)

**Improvement**: **+50%**

View full demo assets: [docs/demo/](docs/demo/)

---

## 🎯 Core Features

### ✅ Anti-Hallucination Protocol

**Never fabricates resume content**

- All optimizations based on existing content
- No invented work experience, skills, or achievements
- Protects job seekers' professional integrity

### ✅ ATS Scoring System

**Quantified optimization results**

- Before/after comparison
- Keyword matching analysis
- Gap identification reports

### ✅ Smart Condensation (v3.1 New)

**Auto-compress to 1 page**

- Retains key information
- Removes redundancy
- Aligns with JD keywords

### ✅ PDF Export Engine

**Server-friendly solution**

- Full CJK support
- No Puppeteer/LaTeX required
- Runs on 2GB RAM

---

## 🚀 Quick Start

### Installation

```bash
# Install OpenClaw
npm install -g openclaw

# Install skills
clawhub install resume-helper
clawhub install multi-search-engine
clawhub install md-to-pdf-cjk

# Install system dependencies
apt install python3-reportlab fonts-noto-cjk
```

### Usage

#### Interactive Mode (Recommended)

```bash
# Auto-search JD → Extract keywords → Human confirm → Generate PDF
node scripts/auto-hunt.js "Game Designer Trainee" resume.md "Tencent"
```

#### Automatic Mode

```bash
# Skip human confirmation, fully automated
node scripts/auto-hunt.js "Game Designer Trainee" resume.md "Tencent" --auto
```

#### Manual Resume Optimization

```bash
# Optimize with specified keywords
node scripts/optimize-resume.js resume.md "Unity,Roguelike,Level Design" "ChillyRoom"

# Export to PDF
node scripts/export-pdf.js resume-optimized.md
```

---

## 📁 Project Structure

```
resume-helper/
├── scripts/
│   ├── auto-hunt.js           # v3.0 Main controller
│   ├── optimize-resume.js     # Resume optimization engine
│   ├── export-pdf.js          # PDF export
│   ├── anonymizer-agent.js    # Anonymization sub-agent
│   └── llm-extractor-agent.js # Keyword extraction sub-agent
├── docs/
│   └── demo/                  # Before & After Demo
├── templates/
│   └── resume-template.md     # Resume template
└── examples/
    └── example-resume.md      # Example resume
```

---

## 🔧 Workflow Architecture

```
User Input (Target Position + Resume)
    ↓
PHASE 1: JD Search Engine
    - multi-search-engine skill
    - Fetch real job descriptions
    ↓
PHASE 2: LLM Keyword Extraction
    - Sub-agent processing
    - Clean messy web content
    - Extract 5-8 core keywords
    ↓
HITL: Human Confirmation
    - User reviews keywords
    - Can override or confirm
    ↓
PHASE 3: Resume Optimization
    - Anti-hallucination protocol
    - ATS scoring comparison
    - Smart condensation to 1 page
    ↓
PHASE 4: Final Delivery
    - PDF resume
    - ATS optimization report
```

---

## 🛡️ Safety & Privacy

### Anti-Hallucination Guarantee

- All optimizations based on user's real experience
- No fabricated work history, skills, or achievements
- Fully transparent and auditable process

### Anonymized Demo

- Demo assets fully anonymized
- No real personal information leaked
- Safe for public display

---

## 📈 Version History

### v3.1 (2026-03-18)
- ✨ Added smart condensation (auto-compress to 1 page)
- 🔧 Improved keyword extraction logic
- 📊 Anonymized demo assets

### v3.0 (2026-03-18)
- 🚀 Auto-Hunt fully autonomous pipeline
- 🤖 LLM keyword extraction engine
- 👤 Human-in-the-loop confirmation

### v2.1 (2026-03-18)
- 🎨 Text purity protocol
- 📄 Separate optimization report
- 🔒 Enhanced anti-hallucination protocol

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

Please follow [OpenClaw Contributing Guidelines](https://github.com/zealxz/openclaw/blob/main/CONTRIBUTING.md)

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

**Iron Triangle Collaboration**:

- **zealx**: Product vision, strategic decisions, technical decisions
- **NOVA**: Architecture design, code implementation, testing & validation
- **Gemini**: Architecture review, quality assurance, optimization suggestions

---

**GitHub**: https://github.com/zealxz/resume-helper

**Issue Tracker**: https://github.com/zealxz/resume-helper/issues