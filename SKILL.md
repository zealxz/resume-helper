---
name: resume-helper
description: AI-powered resume optimization with anti-hallucination protection, ATS scoring, PDF export, and autonomous job hunting workflow. Integrates with multi-search-engine for real-time JD analysis.
metadata:
  {
    "openclaw": {
      "requires": {
        "skills": ["multi-search-engine", "md-to-pdf-cjk"],
        "bins": ["node", "python3"]
      },
      "install": [
        {
          "id": "resume-helper",
          "kind": "copy",
          "source": ".",
          "dest": "{openclaw.skills}/resume-helper"
        }
      ]
    }
  }
---

# Resume Helper Skill v3.0

AI-powered autonomous job hunting workflow for OpenClaw - **Iron Triangle Enhanced Edition**

## 🚀 What's New in v3.0

### ✅ Autonomous Job Hunting Workflow
**Fully Automated Pipeline**:
- JD Search Engine (multi-search-engine integration)
- LLM Keyword Extraction (sessions_spawn sub-agent)
- Human-in-the-Loop Confirmation
- Resume Optimization (anti-hallucination protocol)
- Final Delivery (PDF + ATS Report)

### ✅ Intelligent Keyword Extraction
**LLM-Powered Purification**:
- Extracts core skills from messy JD web content
- Merges synonyms (Unity/U3D → Unity)
- Ranks by frequency and importance
- Human confirmation before optimization

### ✅ Clean Resume Output
**Text Purity Protocol**:
- No optimization traces in final resume
- Optimization reports saved separately
- HR-friendly, ATS-compatible format

## 🎯 v2.1 Features (Still Included)

### ✅ Anti-Hallucination Protocol
**CRITICAL FEATURE**: Never fabricates resume content
- Absolute prohibition on invented work experience
- Only extracts, reorganizes, and rephrases EXISTING experience
- Prioritizes user trust and authenticity over optimization

### ✅ ATS Scoring System
**Visual Progress Tracking**:
- Before/After match scores
- Keyword matching analysis
- Gap identification reports
- Quantified improvement metrics

### ✅ Cover Letter Generator
**High-Conversion Letters**:
- Personalized for each JD
- Industry-specific templates
- No wasted compute on auto-apply

### ✅ PDF Export Engine
**Server-Friendly Solution**:
- Uses md-to-pdf-cjk from ClawHub
- Full CJK support
- No Puppeteer/LaTeX required

## Usage

### Auto-Hunt Workflow (New!)

```bash
# Interactive mode (recommended)
node scripts/auto-hunt.js "游戏策划培训生" resume.md "腾讯"

# Automatic mode (skip human confirmation)
node scripts/auto-hunt.js "游戏策划培训生" resume.md "腾讯" --auto

# Full workflow:
# PHASE 1: JD Search → Real job descriptions
# PHASE 2: LLM Extraction → Core keywords
# HITL:    Human Confirm → User approval
# PHASE 3: Resume Optimization → Anti-hallucination
# PHASE 4: Final Delivery → PDF + ATS Report
```

### Manual Resume Optimization

```bash
# Basic optimization
node scripts/optimize-resume.js resume.md "Unity,Roguelike,关卡设计" "腾讯"

# Generate cover letter
node scripts/generate-cover-letter.js resume.md jd.md "腾讯" "游戏策划"

# Export to PDF
node scripts/export-pdf.js resume-optimized.md

# Batch PDF export
node scripts/export-pdf.js --batch resume.md cover-letter.md
```

## Installation

```bash
# Install via ClawHub
clawhub install resume-helper

# Install dependencies
clawhub install md-to-pdf-cjk
clawhub install multi-search-engine

# Install system dependencies
apt install python3-reportlab fonts-noto-cjk
```

## Dependencies

### Required
- Node.js 14+
- Python 3 with reportlab
- CJK fonts: `apt install fonts-noto-cjk`

### Skills
- `multi-search-engine`: For JD search
- `md-to-pdf-cjk`: For PDF export

## Workflow Architecture

```
User Input (Position + Resume)
    ↓
┌──────────────────────────────┐
│  PHASE 1: JD Search Engine   │
│  - multi-search-engine       │
│  - Real job postings         │
└──────────────────────────────┘
    ↓ (Messy web content)
┌──────────────────────────────┐
│  PHASE 2: LLM Extraction     │
│  - sessions_spawn sub-agent  │
│  - Keyword purification      │
│  - Synonym merging           │
└──────────────────────────────┘
    ↓ (Pure keywords)
┌──────────────────────────────┐
│  HITL: Human Confirmation    │
│  - Review keywords           │
│  - Approve or override       │
└──────────────────────────────┘
    ↓ (Confirmed keywords)
┌──────────────────────────────┐
│  PHASE 3: Resume Optimization│
│  - Anti-hallucination        │
│  - ATS scoring               │
│  - Clean output              │
└──────────────────────────────┘
    ↓
┌──────────────────────────────┐
│  PHASE 4: Final Delivery     │
│  - PDF resume                │
│  - ATS report                │
│  - Cover letter (optional)   │
└──────────────────────────────┘
```

## Safety & Privacy

### 🔒 Anti-Hallucination Guarantee
- All optimizations based ONLY on existing resume content
- No fabricated experience, skills, or achievements
- Full transparency in optimization process
- User can review all modifications

### 🛡️ Data Protection
- All processing done locally
- No personal data stored without consent
- Privacy-focused search engines
- User maintains full control

## Roadmap

- [x] Phase 1: JD Search Integration
- [x] Phase 2: LLM Keyword Extraction
- [x] Phase 3: Resume Optimization
- [x] Phase 4: PDF Export
- [ ] Real-time JD fetching (web_fetch integration)
- [ ] Multi-language support
- [ ] Interview preparation

## Credits

Created by the **Iron Triangle** collaboration:

- **zealx**: Product vision, strategy, and user requirements
- **NOVA**: Implementation, automation, and technical development
- **Gemini**: Architecture review, quality assurance, and optimization insights

## Contributing

Follow OpenClaw's [CONTRIBUTING.md](https://github.com/zealxz/openclaw/blob/main/CONTRIBUTING.md) guidelines.

## License

MIT License - See LICENSE file for details

---

**Version**: 3.0.0  
**Last Updated**: 2026-03-18  
**Repository**: https://github.com/zealxz/resume-helper