const path = require('node:path');

function optimizedResumePath(resumePath) {
    const parsed = path.parse(resumePath);
    return path.join(parsed.dir, `${parsed.name}-optimized${parsed.ext}`);
}

function safeFilename(value) {
    return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').replace(/[. ]+$/g, '').trim() || 'company';
}

function reportPath(company) {
    return `简历优化说明-${safeFilename(company)}.md`;
}

module.exports = { optimizedResumePath, safeFilename, reportPath };
