#!/usr/bin/env node
// Create Demo Assets - 脱敏展示窗口资产生成脚本
// 自动化流程：脱敏 → 优化 → 归档

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ========================================
// 配置
// ========================================
const CONFIG = {
    sourceResume: '/home/ubuntu/赵一鸣-简历.md',
    outputDir: '/home/ubuntu/.openclaw/workspace/skills/resume-helper/docs/demo',
    anonymizedResume: 'my-resume-anonymized.md',
    targetCompany: '腾讯',
    targetPosition: '游戏策划培训生',
    jdKeywords: '沟通能力,游戏策划,游戏经验,Unity,Python,逻辑思维,Excel,关卡设计'
};

// ========================================
// 工具函数
// ========================================
function log(phase, message) {
    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    console.log(`[${timestamp}] [${phase}] ${message}`);
}

// ========================================
// PHASE 1: AI 基础脱敏
// ========================================
async function anonymizeResume(sourcePath, outputPath) {
    log('PHASE 1', '🔒 启动 AI 基础脱敏引擎');
    
    if (!fs.existsSync(sourcePath)) {
        throw new Error(`源简历文件不存在: ${sourcePath}`);
    }
    
    const resumeContent = fs.readFileSync(sourcePath, 'utf8');
    log('PHASE 1', `读取源简历: ${sourcePath} (${resumeContent.length} 字符)`);
    
    // 构建脱敏 Prompt
    const anonymizePrompt = buildAnonymizePrompt(resumeContent);
    
    // 保存 Prompt 供子代理读取
    const tempPromptFile = '/tmp/anonymize-prompt.txt';
    fs.writeFileSync(tempPromptFile, anonymizePrompt);
    
    log('PHASE 1', '⚡ 调用脱敏子代理...');
    
    // 调用脱敏子代理
    return new Promise((resolve, reject) => {
        const agentScript = path.join(__dirname, 'anonymizer-agent.js');
        const command = `node "${agentScript}" "${tempPromptFile}"`;
        
        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                log('PHASE 1', `❌ 脱敏失败: ${error.message}`);
                reject(error);
            } else {
                const anonymizedContent = stdout.trim();
                fs.writeFileSync(outputPath, anonymizedContent);
                log('PHASE 1', `✅ 脱敏完成: ${outputPath}`);
                resolve(outputPath);
            }
        });
    });
}

function buildAnonymizePrompt(resumeContent) {
    return `【AI 脱敏任务 - 最高优先级指令】

你是一个专业的简历脱敏专家。请对以下简历进行深度脱敏处理。

【脱敏规则】
1. 姓名：替换为 "求职者 A (AI Job Seeker)"
2. 电话：替换为 "13X-XXXX-XXXX"
3. 邮箱：替换为 "email@example.com"
4. 个人网站/GitHub：替换为 "github.com/job-seeker-a"
5. 微信：替换为 "wechat_id"
6. 学校名：替换为 "某985/211高校"
7. 公司名：替换为 "某网络安全企业" 或 "某游戏头部企业"（根据上下文）
8. 具体项目名：替换为 "某智能硬件项目" 或 "某游戏项目"（根据上下文）
9. 具体地址：替换为 "某一线城市"
10. 所有可识别个人身份的信息必须脱敏

【保留内容】
- 技能列表
- 游戏战绩
- 奖项名称（去掉具体排名）
- 工作职责描述（去掉具体公司名）

【原始简历】
${resumeContent}

【输出要求】
直接输出脱敏后的完整简历 Markdown 内容，不要添加任何说明文字。`;
}

// ========================================
// PHASE 2: 脱敏基础优化流程
// ========================================
async function optimizeAnonymizedResume(resumePath, outputDir) {
    log('PHASE 2', '🔧 启动脱敏简历优化流程');
    
    const optimizeScript = path.join(__dirname, 'optimize-resume.js');
    const command = `cd "${outputDir}" && node "${optimizeScript}" "${resumePath}" "${CONFIG.jdKeywords}" "${CONFIG.targetCompany}"`;
    
    log('PHASE 2', `执行优化: ${CONFIG.targetPosition} @ ${CONFIG.targetCompany}`);
    
    return new Promise((resolve, reject) => {
        exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                log('PHASE 2', `❌ 优化失败: ${error.message}`);
                reject(error);
            } else {
                log('PHASE 2', '✅ 简历优化完成');
                console.log(stdout);
                resolve();
            }
        });
    });
}

// ========================================
// PHASE 3: PDF 导出
// ========================================
async function exportToPDF(resumePath) {
    log('PHASE 3', '📄 导出 PDF 简历');
    
    const exportScript = path.join(__dirname, 'export-pdf.js');
    const command = `node "${exportScript}" "${resumePath}"`;
    
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log('PHASE 3', `❌ PDF导出失败: ${error.message}`);
                reject(error);
            } else {
                log('PHASE 3', '✅ PDF 导出完成');
                resolve();
            }
        });
    });
}

// ========================================
// PHASE 4: 资产归档
// ========================================
async function archiveAssets(outputDir) {
    log('PHASE 4', '📦 整理资产文件');
    
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 查找生成的文件
    const anonymizedMd = path.join(outputDir, CONFIG.anonymizedResume);
    const optimizedMd = anonymizedMd.replace('.md', '-optimized.md');
    const optimizedPdf = optimizedMd.replace('.md', '.pdf');
    const atsReport = `简历优化说明-${CONFIG.targetCompany}.md`;
    
    const files = [];
    
    if (fs.existsSync(anonymizedMd)) files.push({ name: '脱敏简历 (Before)', path: anonymizedMd });
    if (fs.existsSync(optimizedMd)) files.push({ name: '优化简历 (After)', path: optimizedMd });
    if (fs.existsSync(optimizedPdf)) files.push({ name: '优化简历 PDF', path: optimizedPdf });
    if (fs.existsSync(atsReport)) files.push({ name: 'ATS 优化报告', path: atsReport });
    
    log('PHASE 4', `找到 ${files.length} 个资产文件`);
    
    return files;
}

// ========================================
// 主流程
// ========================================
async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('🔒 脱敏展示窗口资产生成流程');
    console.log('='.repeat(60));
    console.log(`📅 时间: ${new Date().toLocaleString('zh-CN')}`);
    console.log(`📄 源简历: ${CONFIG.sourceResume}`);
    console.log(`📁 输出目录: ${CONFIG.outputDir}`);
    console.log(`🎯 目标: ${CONFIG.targetPosition} @ ${CONFIG.targetCompany}`);
    console.log('='.repeat(60) + '\n');
    
    try {
        // 确保输出目录存在
        if (!fs.existsSync(CONFIG.outputDir)) {
            fs.mkdirSync(CONFIG.outputDir, { recursive: true });
        }
        
        const anonymizedPath = path.join(CONFIG.outputDir, CONFIG.anonymizedResume);
        
        // PHASE 1: 脱敏
        await anonymizeResume(CONFIG.sourceResume, anonymizedPath);
        
        // PHASE 2: 优化
        await optimizeAnonymizedResume(anonymizedPath, CONFIG.outputDir);
        
        // PHASE 3: PDF 导出
        const optimizedPath = anonymizedPath.replace('.md', '-optimized.md');
        await exportToPDF(optimizedPath);
        
        // PHASE 4: 归档
        const files = await archiveAssets(CONFIG.outputDir);
        
        // 输出审计提示
        console.log('\n' + '='.repeat(60));
        console.log('🚨 NOVA：脱敏资产已生成至 ./docs/demo/');
        console.log('='.repeat(60));
        console.log('\n📋 生成的文件：');
        files.forEach(f => {
            const size = fs.statSync(f.path).size;
            console.log(`   ${f.name}: ${path.basename(f.path)} (${size} bytes)`);
        });
        
        console.log('\n' + '='.repeat(60));
        console.log('🚨 最高级别审计提示 🚨');
        console.log('='.repeat(60));
        console.log('\n指挥官 zealx，请立刻手动审计该目录下的 Markdown 和 PDF 文件，');
        console.log('确认无任何个人真实隐私泄漏后，方可将其更新至 GitHub 的 README 中！');
        console.log('\n审计要点：');
        console.log('  ✅ 姓名、电话、邮箱已脱敏');
        console.log('  ✅ 学校、公司名称已脱敏');
        console.log('  ✅ 个人网站、GitHub 链接已脱敏');
        console.log('  ✅ 微信号已脱敏');
        console.log('  ✅ 无任何可识别个人身份的信息');
        console.log('\n资产目录: ' + CONFIG.outputDir);
        console.log('='.repeat(60) + '\n');
        
    } catch (error) {
        console.error('\n❌ 流程执行失败:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// 启动主流程
main();