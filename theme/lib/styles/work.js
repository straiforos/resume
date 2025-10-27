function getWorkCSS() {
  return `
    .work-entry {
      margin-bottom: 12pt;
    }
    
    .company-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4pt;
    }
    
    .company-name {
      font-size: 11pt;
      font-weight: bold;
      color: #000000;
    }
    
    .date-range {
      font-size: 10.5pt;
      color: #434649;
    }
    
    .position {
      font-size: 10pt;
      color: #0563c1;
      font-weight: bold;
      margin-bottom: 4pt;
    }
    
    .highlights {
      list-style: none;
      margin-left: 36pt;
      margin-top: 6pt;
    }
    
    .highlights li {
      font-size: 11pt;
      font-family: Arial, sans-serif;
      margin-bottom: 12pt;
      position: relative;
      padding-left: 18pt;
    }
    
    .highlights li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #000;
      font-size: 11pt;
    }
  `;
}

module.exports = getWorkCSS;

