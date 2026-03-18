---
name: resume-helper
description: AI-powered resume optimization with anti-hallucination protection, ATS scoring, and cover letter generation. Searches job descriptions, analyzes your resume, and provides targeted improvements without fabricating experience.
metadata:
  {
    "openclaw": {
      "requires": {
        "skills": ["multi-search-engine"],
        "bins": ["node"]
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

# Resume Helper Skill v2.0

AI-powered resume optimization assistant for OpenClaw - **Iron Triangle Enhanced Edition**

## 🚀 What's New in v2.0

### ✅ Anti-Hallucination Protocol
**CRITICAL FEATURE**: Never fabricates resume content
- Absolute prohibition on invented work experience
- Only extracts, reorganizes, and rephrases EXISTING experience
- Prioritizes user trust and authenticity over optimization

### 📊 ATS Scoring System
**Visual Progress Tracking**:
- Before/After match scores
- Keyword matching analysis
- Gap identification reports
- Quantified improvement metrics

### ✍️ Cover Letter Generator
**Replaces Auto-Apply Feature**:
- Personalized cover letters for each JD
- High-conversion template engine
- Industry-specific adaptations
- No wasted compute on anti-scraping

## Features

- **Job Description Search**: Automatically searches and extracts relevant job postings
- **Resume Analysis**: Compares your resume against job requirements with ATS scoring
- **Smart Optimization**: Suggests improvements WITHOUT fabricating experience
- **Cover Letter Generation**: Creates personalized, high-conversion cover letters

## Usage

```bash
# Basic resume optimization with ATS scoring
node scripts/optimize-resume.js my-resume.md "python,react,aws,api"

# Generate cover letter for specific job
node scripts/generate-cover-letter.js resume.md job-description.md "Tech Corp" "Software Engineer"

# Full workflow (coming soon)
openclaw resume-helper --role "backend developer" --resume ./my-resume.md
```

## Safety & Privacy

### 🔒 Anti-Hallucination Guarantee
- All optimizations based ONLY on existing resume content
- No fabricated experience, skills, or achievements
- Full transparency in what was changed and why
- User can review all modifications before use

### 🛡️ Data Protection
- All processing done locally by default
- No personal data stored without consent
- Privacy-focused job search engines
- User maintains full control over data

## Installation

```bash
# Install via ClawHub (when published)
npx skills add zealxz/resume-helper -g -y

# Or clone directly
git clone https://github.com/zealxz/resume-helper.git
cd resume-helper && npm install
```

## Roadmap

- [ ] Integration with multi-search-engine for real job search
- [ ] AI-powered content analysis using OpenClaw models
- [ ] Multi-format resume support (PDF, DOCX, JSON)
- [ ] Interview preparation based on JD analysis

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

**Version**: 2.0.0  
**Last Updated**: 2026-03-18  
**Repository**: https://github.com/zealxz/resume-helper