#!/usr/bin/env node
// Anonymizer Agent - 简历脱敏子代理
// 语义分析 + 个人信息替换

const fs = require('fs');

// ========================================
// 脱敏规则引擎
// ========================================
function anonymizeContent(content) {
    console.error('[脱敏子代理] 启动语义分析脱敏引擎');
    
    let result = content;
    
    // 1. 姓名脱敏
    result = result.replace(/赵一鸣/g, '求职者 A (AI Job Seeker)');
    
    // 2. 电话脱敏
    result = result.replace(/139-2286-1220/g, '13X-XXXX-XXXX');
    result = result.replace(/13922861220/g, '13XXXXXXXXX');
    
    // 3. 邮箱脱敏
    result = result.replace(/592029162@qq\.com/g, 'email@example.com');
    result = result.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, 'email@example.com');
    
    // 4. 个人网站脱敏
    result = result.replace(/zealx\.131\.996h\.cn/g, 'portfolio.example.com');
    result = result.replace(/zhaoyiming\.top/g, 'portfolio.example.com');
    
    // 5. GitHub 脱敏
    result = result.replace(/github\.com\/zealxz/g, 'github.com/job-seeker-a');
    result = result.replace(/github\.com\/[a-zA-Z0-9_-]+/g, 'github.com/job-seeker-a');
    
    // 6. 微信脱敏
    result = result.replace(/微信\s*zealxfk/g, '微信 job_seeker_a');
    result = result.replace(/zealxfk/g, 'job_seeker_a');
    
    // 7. 学校名脱敏
    result = result.replace(/广东药科大学/g, '某985/211高校');
    result = result.replace(/智能医学工程/g, '计算机相关专业');
    
    // 8. 公司名脱敏
    result = result.replace(/深圳普罗医学有限公司/g, '某网络安全企业');
    result = result.replace(/普罗医学/g, '某网络安全企业');
    result = result.replace(/优哲信息技术/g, '某互联网科技公司');
    
    // 9. 项目名脱敏
    result = result.replace(/手势识别无人车/g, '某智能硬件项目');
    result = result.replace(/水下管道检修机器人/g, '某智能硬件项目');
    result = result.replace(/《修赛博金仙：引星丹大道》/g, '《某游戏项目》');
    
    // 10. 地址脱敏
    result = result.replace(/深圳/g, '某一线城市');
    result = result.replace(/广州/g, '某一线城市');
    
    // 11. 移除可能泄漏的链接
    result = result.replace(/https?:\/\/[^\s]+/g, '[已脱敏链接]');
    
    console.error('[脱敏子代理] 脱敏处理完成');
    
    return result;
}

// ========================================
// 主函数
// ========================================
function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.error('用法: node anonymizer-agent.js <prompt-file>');
        process.exit(1);
    }
    
    const promptFile = args[0];
    
    if (!fs.existsSync(promptFile)) {
        console.error(`错误: 文件不存在 ${promptFile}`);
        process.exit(1);
    }
    
    const prompt = fs.readFileSync(promptFile, 'utf8');
    
    // 提取原始简历内容
    const resumeMatch = prompt.match(/【原始简历】\n([\s\S]+?)\n\n【输出要求】/);
    const resumeContent = resumeMatch ? resumeMatch[1] : '';
    
    // 执行脱敏
    const anonymizedContent = anonymizeContent(resumeContent);
    
    // 输出结果（stdout 将被父进程捕获）
    console.log(anonymizedContent);
    
    console.error('[脱敏子代理] 脱敏简历已输出');
}

main();