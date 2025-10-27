export default function getWorkCSS() {
  return `
    .work-entry {
      margin-bottom: 6pt;
    }
    
    .company-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3pt;
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
      margin-bottom: 2pt;
    }
    
    .highlights {
      list-style: none;
      margin-left: 36pt;
      margin-top: 3pt;
    }
    
    .highlights li {
      font-size: 10pt;
      font-family: Arial, sans-serif;
      margin-bottom: 0pt;
      position: relative;
      padding-left: 18pt;
      line-height: 1.1;
    }
    
    .highlights li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #000;
      font-size: 10pt;
    }
  `;
}

