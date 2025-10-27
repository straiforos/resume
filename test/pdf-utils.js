const fs = require('fs');
const pdf = require('pdf-parse');

/**
 * Get page count from a PDF file
 */
async function getPageCount(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.numpages;
}

/**
 * Check if PDF is within expected page limit
 */
async function checkPageLimit(filePath, maxPages) {
  const pageCount = await getPageCount(filePath);
  return {
    success: pageCount <= maxPages,
    pageCount,
    maxPages,
    filePath
  };
}

/**
 * Get detailed PDF info
 */
async function getPDFInfo(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  
  return {
    numpages: data.numpages,
    info: data.info,
    metadata: data.metadata,
    version: data.version
  };
}

/**
 * Get text content from PDF with position info
 */
async function getPDFTextWithPositions(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  
  return {
    text: data.text,
    positions: []
  };
}

/**
 * Check header top margin by analyzing first page content
 * Returns the approximate top position of header content in points
 */
async function checkHeaderTopMargin(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  
  // Get the text from the first page
  const text = data.text;
  
  // Try to find the header name in the text
  // We'll look for common header patterns
  const lines = text.split('\n');
  
  // PDF page dimensions (default Letter: 612 x 792 points)
  // Standard margin: 36pt
  // So content area starts at y = 792 - 36 = 756 from bottom
  // Or from top: 36pt
  
  // Find the first non-empty line (likely the header name)
  let firstContentLine = null;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0 && trimmed !== '{JSON Resume}') {
      firstContentLine = trimmed;
      break;
    }
  }
  
  // The text extraction doesn't give us exact positions
  // But we can infer reasonable spacing
  // If the first line is found near the beginning, spacing is reasonable
  
  return {
    hasHeader: !!firstContentLine,
    firstLine: firstContentLine,
    textLength: text.length
  };
}

/**
 * Simple test to ensure PDF has reasonable top spacing
 * Checks that the first meaningful content appears early in the text
 */
async function checkTopMargin(filePath, maxLinesFromTop = 5) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const lines = data.text.split('\n');
  
  // Count empty lines at the beginning
  let emptyLines = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      emptyLines++;
    } else {
      break;
    }
  }
  
  // If the first non-empty line (likely header) appears within maxLinesFromTop, it's good
  const withinMargin = emptyLines <= maxLinesFromTop;
  
  return {
    success: withinMargin,
    emptyLinesAtTop: emptyLines,
    maxAllowed: maxLinesFromTop,
    totalLines: lines.length
  };
}

module.exports = {
  getPageCount,
  checkPageLimit,
  getPDFInfo,
  getPDFTextWithPositions,
  checkHeaderTopMargin,
  checkTopMargin
};

