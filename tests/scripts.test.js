const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const childProcess = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const scriptsDir = path.join(__dirname, '..', 'scripts');

test('optimizer preserves extensionless input and supports dotted parent directories', t => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-helper-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    const directory = path.join(root, 'candidate.v1');
    fs.mkdirSync(directory);
    const resume = path.join(directory, 'resume');
    fs.writeFileSync(resume, 'Synthetic Candidate\nPython');
    const before = fs.statSync(resume).mtimeMs;
    const run = spawnSync(process.execPath, [path.join(scriptsDir, 'optimize-resume.js'), resume, 'Python', 'ACME/West'], {
        cwd: root, encoding: 'utf8'
    });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(fs.statSync(resume).mtimeMs, before);
    assert.equal(fs.readFileSync(path.join(directory, 'resume-optimized'), 'utf8'), 'Synthetic Candidate\nPython');
    assert.ok(fs.existsSync(path.join(root, '简历优化说明-ACME-West.md')));
});

test('auto-hunt sends untrusted arguments to Node without a shell', async t => {
    const calls = [];
    t.mock.method(childProcess, 'execFile', (file, args, options, callback) => {
        if (typeof options === 'function') callback = options;
        calls.push({ file, args, options });
        callback(null, 'synthetic output', '');
    });
    t.mock.method(fs, 'writeFileSync', () => {});
    const { extractKeywordsWithSubAgent, optimizeResumeWithKeywords, deliverFinalOutputs } = require('../scripts/auto-hunt.js');
    const resume = 'candidate.v1/resume $(touch UNEXPECTED).txt';
    const company = 'ACME "quoted" $(touch UNEXPECTED)';
    await optimizeResumeWithKeywords(resume, 'Python, "quoted"', company);
    const result = await deliverFinalOutputs(resume, company);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].file, process.execPath);
    assert.deepEqual(calls[0].args, [path.join(scriptsDir, 'optimize-resume.js'), resume, 'Python, "quoted"', company]);
    assert.equal(calls[0].options.shell, undefined);
    assert.equal(calls[1].file, process.execPath);
    assert.equal(calls[1].args[1], 'candidate.v1/resume $(touch UNEXPECTED)-optimized.txt');
    assert.equal(result.optimizedResumePath, calls[1].args[1]);
    assert.equal(result.pdfPath, 'candidate.v1/resume $(touch UNEXPECTED)-optimized.pdf');
    await extractKeywordsWithSubAgent('Synthetic Python JD', 'Developer', true);
    assert.equal(calls[2].file, process.execPath);
    assert.deepEqual(calls[2].args, [path.join(scriptsDir, 'llm-extractor-agent.js'), '/tmp/auto-hunt-jd-content.txt']);
});

test('output paths preserve extensions and confine company labels to one filename', () => {
    const { optimizedResumePath, safeFilename, reportPath } = require('../scripts/output-paths');
    assert.equal(optimizedResumePath('resume'), 'resume-optimized');
    assert.equal(optimizedResumePath('draft.v1/resume.md'), path.join('draft.v1', 'resume-optimized.md'));
    assert.equal(optimizedResumePath('.resume'), '.resume-optimized');
    assert.equal(safeFilename('ACME/West\\East'), 'ACME-West-East');
    assert.equal(path.basename(reportPath('../../outside')), reportPath('../../outside'));
});
