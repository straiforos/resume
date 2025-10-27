function getEducationCSS() {
  return `
    .education-entry {
      margin-bottom: 4pt;
    }
    
    .education-row {
      display: flex;
      justify-content: space-between;
      font-size: 10pt;
    }
    
    .education-name {
      font-weight: bold;
      color: #2f5496;
    }
    
    .education-date {
      font-size: 10.5pt;
      color: #434649;
    }
  `;
}

module.exports = getEducationCSS;

