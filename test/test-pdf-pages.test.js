const fs = require('fs');
const path = require('path');
const { getPageCount, checkPageLimit, checkTopMargin, checkHeaderTopMargin } = require('./pdf-utils.js');

/**
 * Test that generated PDFs are within the expected page count
 */

describe('PDF Page Count Tests', () => {
  
  test('resume.pdf should be 2 pages or less', async () => {
    const resumePath = path.join('resume.pdf');
    
    if (fs.existsSync(resumePath)) {
      const pageCount = await getPageCount(resumePath);
      expect(pageCount).toBeLessThanOrEqual(2);
    }
  });
  
  test('one-page.pdf should be exactly 1 page', async () => {
    const onePagePath = path.join('output', 'one-page.pdf');
    
    if (fs.existsSync(onePagePath)) {
      const pageCount = await getPageCount(onePagePath);
      expect(pageCount).toBe(1);
    }
  });
  
  test('whoop-resume.pdf should be 2 pages or less', async () => {
    const whoopPath = path.join('output', 'whoop-resume.pdf');
    
    if (fs.existsSync(whoopPath)) {
      const pageCount = await getPageCount(whoopPath);
      expect(pageCount).toBeLessThanOrEqual(2);
    }
  });
  
  test('one-page.pdf exists and is readable', () => {
    const onePagePath = path.join('output', 'one-page.pdf');
    
    expect(fs.existsSync(onePagePath)).toBe(true);
    
    const stats = fs.statSync(onePagePath);
    expect(stats.size).toBeGreaterThan(0);
  });
  
  test('get PDF info for all generated files', async () => {
    const files = [
      path.join('output', 'one-page.pdf'),
      path.join('output', 'whoop-resume.pdf'),
      path.join('resume.pdf')
    ];
    
    for (const file of files) {
      if (fs.existsSync(file)) {
        const pageCount = await getPageCount(file);
        console.log(`${path.basename(file)}: ${pageCount} page(s)`);
      }
    }
  });
});

describe('PDF Header Spacing Tests', () => {
  
  test('output/one-page.pdf should not have excessive top margin', async () => {
    const onePagePath = path.join('output', 'one-page.pdf');
    
    if (fs.existsSync(onePagePath)) {
      const result = await checkTopMargin(onePagePath, 5);
      expect(result.success).toBe(true);
      expect(result.emptyLinesAtTop).toBeLessThanOrEqual(5);
      console.log(`Header spacing check: ${result.emptyLinesAtTop} empty lines at top (max: ${result.maxAllowed})`);
    }
  });
  
  test('resume.pdf should not have excessive top margin', async () => {
    const resumePath = path.join('resume.pdf');
    
    if (fs.existsSync(resumePath)) {
      const result = await checkTopMargin(resumePath, 5);
      expect(result.success).toBe(true);
      expect(result.emptyLinesAtTop).toBeLessThanOrEqual(5);
      console.log(`Header spacing check: ${result.emptyLinesAtTop} empty lines at top (max: ${result.maxAllowed})`);
    }
  });
  
  test('output/whoop-resume.pdf should not have excessive top margin', async () => {
    const whoopPath = path.join('output', 'whoop-resume.pdf');
    
    if (fs.existsSync(whoopPath)) {
      const result = await checkTopMargin(whoopPath, 5);
      expect(result.success).toBe(true);
      expect(result.emptyLinesAtTop).toBeLessThanOrEqual(5);
      console.log(`Header spacing check: ${result.emptyLinesAtTop} empty lines at top (max: ${result.maxAllowed})`);
    }
  });
  
  test('output/one-page.pdf header should contain expected name', async () => {
    const onePagePath = path.join('output', 'one-page.pdf');
    
    if (fs.existsSync(onePagePath)) {
      const result = await checkHeaderTopMargin(onePagePath);
      expect(result.hasHeader).toBe(true);
      expect(result.firstLine).toContain('Traiforos');
      console.log(`Header found: ${result.firstLine}`);
    }
  });
});

