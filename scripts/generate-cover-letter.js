#!/usr/bin/env node
// Cover Letter Generator - High-Conversion Personalized Letters
// Replaces auto-apply feature (v2.0)

const fs = require('fs');

// ========================================
// COVER LETTER TEMPLATE ENGINE
// ========================================
const COVER_LETER_TEMPLATES = {
    tech: `
Dear Hiring Manager,

I am excited to apply for the {POSITION} role at {COMPANY}. After carefully reviewing the job description, I am confident that my background in {KEY_SKILLS} aligns perfectly with your team's needs.

In my current role, I have successfully {KEY_ACHIEVEMENT}, which directly relates to your requirement for {JD_REQUIREMENT}. This experience has equipped me with the expertise to contribute immediately to your team's goals.

What excites me most about this opportunity is {COMPANY_SPECIFIC}, and I am eager to bring my {UNIQUE_VALUE} to help drive {BUSINESS_IMPACT}.

I would welcome the chance to discuss how my experience can benefit your team. Thank you for considering my application.

Best regards,
{YOUR_NAME}
`,
    
    business: `
Dear Hiring Team,

I am writing to express my strong interest in the {POSITION} position at {COMPANY}. My background in {KEY_SKILLS} and proven track record of {KEY_ACHIEVEMENT} make me an ideal candidate for this role.

The job description emphasizes the need for {JD_REQUIREMENT}, which aligns directly with my experience in {RELEVANT_EXPERIENCE}. I am particularly drawn to this opportunity because {MOTIVATION}.

I am confident that my skills in {SKILLS_LIST} will enable me to make an immediate contribution to your team's objectives around {BUSINESS_GOAL}.

I look forward to the opportunity to discuss how I can add value to your organization.

Sincerely,
{YOUR_NAME}
`
};

// ========================================
// COVER LETTER GENERATOR ENGINE
// ========================================
function generateCoverLetter(resumeContent, jdContent, companyName, position) {
    console.log('\n' + '='.repeat(60));
    console.log('✍️  COVER LETTER GENERATION ENGINE');
    console.log('='.repeat(60));
    
    // Extract key information from resume
    const skills = extractSkills(resumeContent);
    const achievements = extractAchievements(resumeContent);
    
    // Extract requirements from JD
    const requirements = extractRequirements(jdContent);
    
    // Determine template based on industry
    const template = detectIndustry(jdContent) === 'tech' ? 
        COVER_LETER_TEMPLATES.tech : COVER_LETER_TEMPLATES.business;
    
    // Fill template with extracted information
    let coverLetter = template
        .replace('{POSITION}', position)
        .replace('{COMPANY}', companyName)
        .replace('{KEY_SKILLS}', skills.slice(0, 3).join(', '))
        .replace('{KEY_ACHIEVEMENT}', achievements[0] || 'delivering results')
        .replace('{JD_REQUIREMENT}', requirements[0] || 'this role')
        .replace('{UNIQUE_VALUE}', skills[0] || 'expertise')
        .replace('{YOUR_NAME}', extractName(resumeContent));
    
    console.log('✅ Cover letter generated successfully!');
    console.log('📊 Key elements included:');
    console.log(`   - Position: ${position}`);
    console.log(`   - Company: ${companyName}`);
    console.log(`   - Skills highlighted: ${skills.slice(0, 3).join(', ')}`);
    console.log(`   - Top achievement: ${achievements[0] || 'Not found'}`);
    
    return coverLetter;
}

// Helper functions
function extractSkills(content) {
    // Simple keyword extraction (would use AI in production)
    const skillKeywords = ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'SQL'];
    return skillKeywords.filter(skill => content.includes(skill));
}

function extractAchievements(content) {
    // Extract bullet points with metrics
    const lines = content.split('\n');
    return lines.filter(line => line.includes('%') || line.includes('$') || /\d+/.test(line));
}

function extractRequirements(jdContent) {
    // Extract key requirements from JD
    const lines = jdContent.split('\n');
    return lines.filter(line => 
        line.toLowerCase().includes('require') || 
        line.toLowerCase().includes('must have')
    );
}

function detectIndustry(jdContent) {
    const techKeywords = ['software', 'developer', 'engineer', 'code', 'api'];
    const lowerJD = jdContent.toLowerCase();
    return techKeywords.some(keyword => lowerJD.includes(keyword)) ? 'tech' : 'business';
}

function extractName(resumeContent) {
    const firstLine = resumeContent.split('\n')[0];
    return firstLine.replace(/^#+\s*/, '').trim() || '[Your Name]';
}

// ========================================
// MAIN EXECUTION
// ========================================
const resumePath = process.argv[2];
const jdPath = process.argv[3];
const companyName = process.argv[4] || 'the company';
const position = process.argv[5] || 'the position';

if (!resumePath || !jdPath) {
    console.error('❌ Usage: node generate-cover-letter.js <resume-file> <jd-file> <company> <position>');
    console.error('   Example: node generate-cover-letter.js resume.md job-description.md "Tech Corp" "Software Engineer"');
    process.exit(1);
}

const resumeContent = fs.readFileSync(resumePath, 'utf8');
const jdContent = fs.readFileSync(jdPath, 'utf8');

console.log('🚀 Cover Letter Generator v2.0');
console.log('📄 Generating personalized cover letter...');

const coverLetter = generateCoverLetter(resumeContent, jdContent, companyName, position);

const outputPath = `cover-letter-${companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
fs.writeFileSync(outputPath, coverLetter);

console.log(`\n✅ Cover letter saved to: ${outputPath}`);