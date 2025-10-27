function getPrintCSS() {
  return `
    @media print {
      body {
        padding: 0;
      }
      
      .section {
        page-break-inside: avoid;
      }
      
      .work-entry {
        page-break-inside: avoid;
      }
    }
  `;
}

module.exports = getPrintCSS;

