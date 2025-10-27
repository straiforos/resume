export default function getPrintCSS() {
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
      
      .resume {
        height: 100%;
        overflow: hidden;
      }
    }
  `;
}

