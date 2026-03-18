---
name: resume-helper
description: AI-powered resume optimization and job application assistant. Searches job descriptions, analyzes your resume, and provides targeted improvements to increase interview chances.
metadata:
  {
    "openclaw": {
      "requires": {
        "skills": ["multi-search-engine", "agent-browser"],
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

# Resume Helper Skill

AI-powered resume optimization and job application assistant for OpenClaw.

## Features

- **Job Description Search**: Automatically searches and extracts relevant job postings from major job boards
- **Resume Analysis**: Compares your current resume against job requirements  
- **Smart Optimization**: Suggests and implements targeted improvements based on JD keywords
- **Auto Application**: (Optional) Automatically applies to positions with one-click approval

## Usage

```bash
# Search jobs and optimize resume for backend development
openclaw resume-helper --role "software backend developer" --resume ./my-resume.md

# Include auto-application to supported platforms  
openclaw resume-helper --role "frontend engineer" --resume ./resume.md --auto-apply
```

## Safety & Privacy

- All resume data processed locally by default
- Auto-application requires explicit user approval per job
- No personal data stored or transmitted without consent
- Supports privacy-focused job boards and search engines

## Credits

Created by the Iron Triangle collaboration:
- **zealx**: Product vision and strategy
- **NOVA**: Implementation and automation  
- **Gemini**: Architecture and optimization

## Contributing

Follow OpenClaw's [CONTRIBUTING.md](https://github.com/zealxz/openclaw/blob/main/CONTRIBUTING.md) guidelines.