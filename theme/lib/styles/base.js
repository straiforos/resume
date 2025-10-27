export default function getBaseCSS() {
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      font-size: 11pt;
      color: #000;
      line-height: 1.15;
      background: white;
      margin: 0;
      padding: 12pt 36pt 30pt 36pt;
    }
    
    .resume {
      max-width: 540pt;
      margin: 0 auto;
    }
  `;
}

