function getSkillsCSS() {
  return `
    .summary-text {
      font-size: 11pt;
      line-height: 1.15;
      margin-top: 0pt;
      margin-bottom: 0pt;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0pt;
      margin-top: 0pt;
    }
    
    .skill-group {
      font-size: 10pt;
      margin-bottom: 0pt;
    }
    
    .skill-label {
      font-weight: bold;
      color: #2f5496;
    }
    
    .skill-keywords {
      color: #2f5496;
    }
  `;
}

module.exports = getSkillsCSS;

