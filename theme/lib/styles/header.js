function getHeaderCSS() {
  return `
    .header {
      margin-bottom: 8pt;
      padding: 0 36pt;
      margin-left: -36pt;
      margin-right: -36pt;
    }
    
    .name {
      font-size: 14pt;
      font-weight: bold;
      display: inline-block;
      margin-right: 108pt;
    }
    
    .json-link {
      font-size: 10pt;
      font-weight: bold;
      color: #1155cc;
      margin-right: 60pt;
    }
    
    .contact {
      font-size: 10pt;
      color: #000;
      margin-right: 20pt;
    }
    
    .email {
      font-size: 10pt;
      color: #1155cc;
    }
    
    .divider {
      height: 0.8pt;
      background-color: #000;
      margin: 8pt 0 18pt 0;
    }
  `;
}

module.exports = getHeaderCSS;

