const { execSync } = require('child_process');
const fs = require('fs');
const pdf = require('pdf-parse');

/**
 * Generate resume and check page count
 */
async function generateResume(outputPath, resumeJson, shouldBeOnePage = false) {
  console.log(`\n📄 Generating resume: ${outputPath}...\n`);
  
  try {
    // Generate the PDF
    execSync(
      `resume export --theme traiforce ${outputPath} --resume ${resumeJson}`,
      { stdio: 'inherit' }
    );
    
    // Check page count
    if (!fs.existsSync(outputPath)) {
      console.log(`⚠️  Warning: File not found: ${outputPath}`);
      return;
    }

    const dataBuffer = fs.readFileSync(outputPath);
    const data = await pdf(dataBuffer);
    const pageCount = data.numpages;

    if (shouldBeOnePage && pageCount > 1) {
      console.log(`\n⚠️  WARNING: ${path.basename(outputPath)} has ${pageCount} pages but should be 1 page!`);
      console.log(`   Consider reducing content or spacing to fit on one page.\n`);
      process.exit(1);
    } else if (pageCount === 1) {
      console.log(`✓ ${path.basename(outputPath)}: 1 page ✓\n`);
    } else {
      console.log(`✓ ${path.basename(outputPath)}: ${pageCount} pages\n`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const path = require('path');

if (args.length === 0) {
  console.log('Usage: npm run generate -- <output-path> [resume-json] [one-page]');
  console.log('');
  console.log('Examples:');
  console.log('  npm run generate -- resume.pdf');
  console.log('  npm run generate -- output/one-page.pdf one-page.json 1');
  console.log('  npm run generate -- output/whoop-resume.pdf whoop-resume.json');
  console.log('');
  console.log('Shortcuts:');
  console.log('  npm run generate -- onepage   # Generate one-page.pdf');
  console.log('  npm run generate -- whoop     # Generate whoop-resume.pdf');
  console.log('  npm run generate -- default  # Generate resume.pdf');
  process.exit(0);
}

// Handle shortcuts
let outputPath, resumeJson, shouldBeOnePage;

if (args[0] === 'onepage') {
  outputPath = 'output/one-page.pdf';
  resumeJson = 'one-page.json';
  shouldBeOnePage = true;
} else if (args[0] === 'whoop') {
  outputPath = 'output/whoop-resume.pdf';
  resumeJson = 'whoop-resume.json';
  shouldBeOnePage = false;
} else if (args[0] === 'default') {
  outputPath = 'resume.pdf';
  resumeJson = 'resume.json';
  shouldBeOnePage = false;
} else {
  outputPath = args[0];
  resumeJson = args[1] || 'resume.json';
  shouldBeOnePage = args[2] === '1' || args[2] === 'true';
}

// Extract resume.json name from outputPath if not provided
if (!resumeJson || resumeJson.includes('/')) {
  const outputName = path.basename(outputPath, '.pdf');
  if (fs.existsSync(`${outputName}.json`)) {
    resumeJson = `${outputName}.json`;
  } else if (fs.existsSync('resume.json')) {
    resumeJson = 'resume.json';
  } else {
    console.error(`❌ Error: Could not find resume JSON file. Please specify one.`);
    process.exit(1);
  }
}

// Generate the resume
generateResume(outputPath, resumeJson, shouldBeOnePage);

