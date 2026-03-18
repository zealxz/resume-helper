#!/usr/bin/env node
// LLM Extractor Agent - 关键词提取子代理
// 使用本地关键词库进行智能提取（无需外部API）

const fs = require('fs');

// ========================================
// 本地关键词提取引擎（智能提取）
// ========================================
function extractKeywordsLocally(jdText, position) {
    console.error('[子代理] 启动智能关键词提取引擎');
    
    // 预定义的关键词映射库（游戏策划相关）
    const keywordPatterns = {
        // 技术类
        'Unity': ['unity', 'u3d', 'unity3d', 'unity引擎'],
        'Python': ['python', 'python3', 'py'],
        'SQL': ['sql', 'mysql', '数据库'],
        'Excel': ['excel', '表格', '数据分析'],
        'Git': ['git', '版本控制'],
        
        // 设计类
        '关卡设计': ['关卡', '关卡设计', '地图设计', '副本设计', '场景设计'],
        '系统设计': ['系统', '系统设计', '玩法设计', '系统策划'],
        '数值设计': ['数值', '数值设计', '数值策划', '数值平衡'],
        'Roguelike': ['roguelike', '肉鸽', '随机地牢'],
        '游戏策划': ['游戏策划', '策划', '策划培训生', '游戏设计师'],
        
        // 能力类
        '玩家心理': ['玩家心理', '玩家需求', '用户体验', '玩家体验'],
        '沟通能力': ['沟通', '协作', '团队协作', '沟通能力', '团队合作'],
        '逻辑思维': ['逻辑', '逻辑思维', '分析能力', '思维能力'],
        
        // 经验类
        '游戏经验': ['游戏经验', '热爱游戏', '深度玩家', '游戏爱好者']
    };
    
    // 统计关键词出现频率
    const keywordScores = {};
    const jdLower = jdText.toLowerCase();
    
    for (const [standardKeyword, patterns] of Object.entries(keywordPatterns)) {
        let count = 0;
        for (const pattern of patterns) {
            const regex = new RegExp(pattern, 'gi');
            const matches = jdText.match(regex);
            if (matches) {
                count += matches.length;
            }
        }
        if (count > 0) {
            keywordScores[standardKeyword] = count;
        }
    }
    
    // 按分数排序并取前8个
    const sortedKeywords = Object.entries(keywordScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([keyword]) => keyword);
    
    const result = sortedKeywords.join(',');
    console.error(`[子代理] 提取结果: ${result}`);
    
    return result;
}

// ========================================
// 主函数
// ========================================
function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.error('用法: node llm-extractor-agent.js <prompt-file>');
        process.exit(1);
    }
    
    const promptFile = args[0];
    
    if (!fs.existsSync(promptFile)) {
        console.error(`错误: 文件不存在 ${promptFile}`);
        process.exit(1);
    }
    
    const prompt = fs.readFileSync(promptFile, 'utf8');
    
    // 提取目标岗位
    const positionMatch = prompt.match(/【目标岗位】:\s*(.+)/);
    const position = positionMatch ? positionMatch[1].trim() : '游戏策划';
    
    // 提取JD文本
    const jdMatch = prompt.match(/【原始JD文本[\s\S]*?】:\n([\s\S]+?)\n\n【强制提取规则】/);
    const jdText = jdMatch ? jdMatch[1] : '';
    
    // 使用本地引擎提取关键词
    const keywords = extractKeywordsLocally(jdText, position);
    
    // 输出结果（stdout 将被父进程捕获）
    console.log(keywords);
    
    // 同时保存到结果文件
    const resultFile = promptFile + '.result';
    fs.writeFileSync(resultFile, keywords);
    console.error(`[子代理] 结果已保存到: ${resultFile}`);
}

main();