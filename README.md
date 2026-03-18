<div align="center">
  <a href="README.md">English</a> | <a href="README_zh-CN.md">简体中文</a>
</div>

<br>

# 🚀 Resume-Helper: The Honest, AI-Powered Resume Engine

> **"Don't let AI hallucinations ruin your real career."**

Resume-Helper is a local AI resume optimization skill built for real job seekers. Unlike other AI tools that blindly embellish and fabricate content, we employ a strict **"Anti-Hallucination Protocol"** and **"Clean Text Standard"**. It only extracts and aligns your *actual* past experiences with the target Job Description (JD), generating an HR-friendly, beautifully formatted PDF in seconds.

---

## ⚡ Quick Start

Launch your personal job-hunting engine locally with just three lines of code:

```bash
# 1. Install core skill and PDF export dependencies
clawhub install resume-helper
clawhub install md-to-pdf-cjk

# 2. Rebuild your resume safely based on target JD keywords
node optimize-resume.js my-resume.md "Python, Microservices, High Concurrency, Agile" "Target Company Name"

# 3. Export the optimized, clean Markdown to a native PDF
node export-pdf.js my-resume-optimized.md

🔥 Core Features

    🛡️ Anti-Hallucination Protocol: Absolutely forbids the fabrication of work experiences or project metrics! The engine is strictly limited to extracting, translating, and restructuring your existing experiences into the "industry jargon" the target JD is looking for.

    📊 ATS Match Score Report: No black-box optimization. Every run generates an independent report showing the before-and-after ATS (Applicant Tracking System) match score improvement (e.g., Match Score: 20% ➡️ 85%).

    🧹 "Clean Text" Output: Completely strips out AI-flavored formatting like asterisks (*), meaningless emphasis, and robotic tones. Outputs a clean, highly professional business text structure.

    📄 Native PDF Export: Built-in CJK (Chinese, Japanese, Korean) font support. Ditch the heavy headless browsers or LaTeX. Instantly generate standard PDF formats and tailored Cover Letters that HRs love.

🎯 Use Cases

    🎓 Fresh Graduates: Unsure how to write a resume? Translate your university projects and lab work into "project execution capabilities" and "architectural thinking" that tech giants seek.

    🔄 Career Pivot: Break industry barriers by repackaging your underlying, transferable skills with your target industry's keywords.

    🚀 High-Volume Applying: Targeting 10 different companies? Use this local script to generate 10 perfectly aligned, customized PDF resumes in under 5 minutes.

💻 Tech Highlights

    Ultra-Lightweight: PDF generation is built on Python's reportlab engine and native CJK fonts—no need to install bulky Puppeteer or complex environments.

    Low Barrier: Runs smoothly on any local terminal with just 2GB RAM.

🤝 Credits

Conceptualized and built by the "Iron Triangle":

    zealx (@zealxz) - Product Vision & Stress Test Directives

    NOVA (Autonomous AI Agent) - Core Logic Implementation & MVP Build

    Gemini (Chief Architect) - Architecture Review & Commercialization Strategy

“Let your true talent be seen accurately. Keep your career real.”


---

### 📦 第二步：给你的中文版加上导航头

打开你刚才保存了中文内容的那个文件（把它重命名为 `README_zh-CN.md`），并在最上面**第一行**加上这段导航代码，确保双向互通：

```markdown
<div align="center">
  <a href="README.md">English</a> | <a href="README_zh-CN.md">简体中文</a>
</div>

<br>

# 🚀 Resume-Helper: 拒绝“AI 塑料味”的诚信简历定制引擎
...（保留后面的所有中文内容）...
