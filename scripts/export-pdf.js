#!/usr/bin/env node
// PDF Export Engine v2.1 - Using md-to-pdf-cjk (ClawHub Skill)
// Lightweight PDF generation with full CJK support
// No Puppeteer/LaTeX/wkhtmltopdf required!

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ========================================
// Configuration
// ========================================
const MD_TO_PDF_SCRIPT = '/home/ubuntu/.openclaw/workspace/skills/md-to-pdf-cjk/scripts/md_to_pdf.py';

// ========================================
// PDF Export using md-to-pdf-cjk
// ========================================
function exportToPDF(markdownPath, outputPath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(markdownPath)) {
            console.error(`❌ File not found: ${markdownPath}`);
            reject(new Error('File not found'));
            return;
        }
        
        // Check if md-to-pdf-cjk is installed
        if (!fs.existsSync(MD_TO_PDF_SCRIPT)) {
            console.error('❌ md-to-pdf-cjk skill not found');
            console.error('💡 Install with: clawhub install md-to-pdf-cjk');
            reject(new Error('md-to-pdf-cjk not installed'));
            return;
        }
        
        console.log(`📄 Converting: ${markdownPath}`);
        
        // Use md-to-pdf-cjk Python script
        const command = `python3 "${MD_TO_PDF_SCRIPT}" "${markdownPath}" "${outputPath}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ PDF export failed: ${error.message}`);
                console.error(`stderr: ${stderr}`);
                reject(error);
                return;
            }
            
            // Check if PDF was created
            if (fs.existsSync(outputPath)) {
                const stats = fs.statSync(outputPath);
                console.log(`✅ PDF exported: ${outputPath}`);
                console.log(`📊 File size: ${stats.size} bytes`);
                resolve(true);
            } else {
                console.error(`❌ PDF file not created`);
                reject(new Error('PDF not created'));
            }
        });
    });
}

async function batchExport(files) {
    console.log('\n🚀 Resume Helper v2.1 - PDF Export Engine');
    console.log('='.repeat(60));
    console.log(`📋 Processing ${files.length} files...\n`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const file of files) {
        const markdownPath = file.input;
        const outputPath = file.output || markdownPath.replace(/\.md$/i, '.pdf');
        
        try {
            await exportToPDF(markdownPath, outputPath);
            successCount++;
        } catch (error) {
            failCount++;
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Export Summary');
    console.log('='.repeat(60));
    console.log(`✅ Success: ${successCount} files`);
    console.log(`❌ Failed: ${failCount} files`);
    console.log(`📄 Total: ${files.length} files`);
    
    return { successCount, failCount };
}

// ========================================
// Main Execution
// ========================================
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(`
📄 Resume Helper v2.1 - PDF Export Engine

Uses md-to-pdf-cjk for lightweight, server-friendly PDF generation.
No Puppeteer, LaTeX, or wkhtmltopdf required!

Usage:
  node export-pdf.js <input.md> [output.pdf]
  node export-pdf.js --batch <file1.md> <file2.md> ...

Examples:
  # Single file
  node export-pdf.js resume-optimized.md
  
  # With custom output name
  node export-pdf.js resume.md my-resume.pdf
  
  # Batch export
  node export-pdf.js --batch resume.md cover-letter.md

Requirements:
  - md-to-pdf-cjk skill (install: clawhub install md-to-pdf-cjk)
  - Python 3 with reportlab
  - CJK fonts (install: apt install fonts-noto-cjk)
`);
    process.exit(0);
}

// Batch mode
if (args[0] === '--batch') {
    const files = args.slice(1).map(file => ({
        input: file,
        output: file.replace(/\.md$/i, '.pdf')
    }));
    
    batchExport(files).then(result => {
        process.exit(result.failCount > 0 ? 1 : 0);
    });
} 
// Single file mode
else {
    const markdownPath = args[0];
    const outputPath = args[1] || markdownPath.replace(/\.md$/i, '.pdf');
    
    exportToPDF(markdownPath, outputPath).then(success => {
        process.exit(success ? 0 : 1);
    }).catch(() => {
        process.exit(1);
    });
}