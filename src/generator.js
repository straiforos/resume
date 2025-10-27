import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

/**
 * Generate a PDF resume from a JSON resume file
 */
function generatePDF(jsonFilePath) {
  // Load JSON resume data
  const resumeData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  
  // Initialize PDF document (LETTER size: 8.5 x 11 inches)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt', // points (1/72 inch)
    format: 'letter' // 612 x 792 points
  });
  
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 36; // 0.5 inches
  const maxWidth = pageWidth - (margin * 2);
  
  let yPos = margin;
  
  /**
   * Add text with automatic line wrapping
   */
  function addText(text, x, y, options = {}) {
    const {
      fontSize = 11,
      fontStyle = 'normal',
      color = '#000000',
      maxWidth: textMaxWidth = maxWidth,
      align = 'left'
    } = options;
    
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    doc.setFont('helvetica', fontStyle);
    
    const lines = doc.splitTextToSize(text, textMaxWidth);
    doc.text(lines, x, y, { align });
    
    return y + (lines.length * fontSize * 1.2); // Return new Y position
  }
  
  /**
   * Render header section
   */
  function renderHeader() {
    const { basics } = resumeData;
    
    // Name - Large and bold
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(basics.name, margin, yPos);
    
    // Calculate spacing for contact info on same line
    const nameWidth = doc.getTextWidth(basics.name);
    const spacing = 120;
    
    // JSON Resume link (optional)
    let textX = margin + nameWidth + spacing;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#1155cc');
    const jsonResumeText = '{JSON Resume}';
    doc.text(jsonResumeText, textX, yPos);
    
    // Phone
    textX = textX + doc.getTextWidth(jsonResumeText) + spacing;
    doc.setTextColor('#000000');
    doc.setFont('helvetica', 'normal');
    doc.text(basics.phone || '', textX, yPos);
    
    // Email
    textX = textX + doc.getTextWidth(basics.phone || '') + 20;
    doc.setTextColor('#1155cc');
    doc.text(basics.email || '', textX, yPos);
    
    doc.setTextColor('#000000');
    yPos += 18;
    
    // Add separator line
    doc.setLineWidth(0.8);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 24;
  }
  
  /**
   * Render summary section
   */
  function renderSummary() {
    const { basics } = resumeData;
    
    if (!basics.summary) return;
    
    // Section heading
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2f5496');
    doc.text('Summary', margin, yPos);
    yPos += 18;
    
    // Summary text
    doc.setTextColor('#000000');
    yPos = addText(basics.summary, margin, yPos, { fontSize: 11 });
    yPos += 18;
  }
  
  /**
   * Render skills section
   */
  function renderSkills() {
    const { skills } = resumeData;
    
    if (!skills || skills.length === 0) return;
    
    // Section heading
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2f5496');
    doc.text('Skills', margin, yPos);
    yPos += 18;
    
    // Group skills into rows (2-3 columns)
    const rowHeight = 18;
    const colWidth = maxWidth / 2;
    let currentRow = 0;
    
    skills.forEach((skill, index) => {
      const x = margin + (index % 2) * colWidth;
      
      const nameText = skill.name + ': ';
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      const nameWidth = doc.getTextWidth(nameText);
      
      doc.text(nameText, x, yPos);
      
      // Keywords
      const keywords = skill.keywords.join(', ');
      doc.setFont('helvetica', 'normal');
      doc.text(keywords, x + nameWidth, yPos, { maxWidth: colWidth - nameWidth - 10 });
      
      if ((index + 1) % 2 === 0) {
        yPos += rowHeight;
      }
    });
    
    if (skills.length % 2 !== 0) {
      yPos += rowHeight;
    }
    
    yPos += 12;
  }
  
  /**
   * Render work experience section
   */
  function renderWork() {
    const { work } = resumeData;
    
    if (!work || work.length === 0) return;
    
    // Section heading
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2f5496');
    doc.text('Work Experience', margin, yPos);
    yPos += 18;
    
    work.forEach((job) => {
      // Company name and dates on same line
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      
      // Company name
      doc.text(job.company || job.name, margin, yPos);
      
      // Dates (right aligned)
      const dateText = formatDateRange(job.startDate, job.endDate);
      const dateWidth = doc.getTextWidth(dateText);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#434649');
      doc.text(dateText, pageWidth - margin - dateWidth, yPos);
      doc.setTextColor('#000000');
      
      yPos += 14;
      
      // Position title
      if (job.position) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#0563c1');
        yPos = addText(job.position, margin, yPos, { fontSize: 10 });
        doc.setTextColor('#000000');
      }
      
      // Bullet points
      if (job.highlights && job.highlights.length > 0) {
        job.highlights.forEach((highlight) => {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          
          // Bullet character
          doc.text('•', margin + 18, yPos);
          yPos = addText(highlight, margin + 36, yPos, {
            fontSize: 10,
            maxWidth: maxWidth - 36
          });
        });
      }
      
      yPos += 12;
      
      // Check for page break
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
    });
  }
  
  /**
   * Render education section
   */
  function renderEducation() {
    const { education } = resumeData;
    
    if (!education || education.length === 0) return;
    
    // Section heading
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#2f5496');
    doc.text('Education', margin, yPos);
    yPos += 18;
    
    education.forEach((edu) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      
      // Institution and degree
      let eduText = edu.institution;
      if (edu.area) {
        eduText += ', ' + edu.area;
      }
      
      doc.text(eduText, margin, yPos);
      
      // Dates
      const dateText = formatDateRange(edu.startDate, edu.endDate);
      const dateWidth = doc.getTextWidth(dateText);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#434649');
      doc.text(dateText, pageWidth - margin - dateWidth, yPos);
      doc.setTextColor('#000000');
      
      yPos += 14;
    });
  }
  
  /**
   * Format date range (e.g., "June 2022 - Present")
   */
  function formatDateRange(startDate, endDate) {
    if (!startDate) return '';
    
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };
    
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    
    return `${start} - ${end}`;
  }
  
  // Render all sections
  renderHeader();
  renderSummary();
  renderSkills();
  renderWork();
  renderEducation();
  
  // Save the PDF
  const outputPath = path.join('output', path.basename(jsonFilePath, '.json') + '.pdf');
  
  // Ensure output directory exists
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }
  
  doc.save(outputPath);
  console.log(`✅ Generated: ${outputPath}`);
}

// CLI: Get filename from command line arguments
const jsonFile = process.argv[2] || 'resume.json';
const jsonPath = path.join('input', jsonFile);

if (!fs.existsSync(jsonPath)) {
  console.error(`❌ File not found: ${jsonPath}`);
  process.exit(1);
}

// Copy JSON files to input directory if they don't exist there
if (!fs.existsSync('input')) {
  fs.mkdirSync('input');
}

if (!fs.existsSync(jsonPath)) {
  // Try to copy from root
  if (fs.existsSync(jsonFile)) {
    fs.copyFileSync(jsonFile, jsonPath);
  }
}

generatePDF(jsonPath);

