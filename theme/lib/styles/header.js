export default function getHeaderCSS() {
  return `
    .header {
      margin-bottom: 4pt;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .name {
      font-size: 14pt;
      font-weight: bold;
    }
    
    .contact-group {
      font-size: 10pt;
    }
    
    .json-link {
      font-size: 10pt;
      font-weight: bold;
      color: #1155cc;
      margin-right: 12pt;
    }
    
    .contact {
      font-size: 10pt;
      color: #000;
      margin-right: 12pt;
    }
    
    .email {
      font-size: 10pt;
      color: #1155cc;
    }
    
    .divider {
      height: 0.8pt;
      background-color: #000;
      margin: 3pt 0 6pt 0;
    }
  `;
}

