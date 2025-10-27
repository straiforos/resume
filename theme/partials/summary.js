const helpers = require('../lib/helpers');

function renderSummary(basics) {
  if (!basics.summary) return '';
  
  return `
    <div class="section">
      <h2>Summary</h2>
      <div class="divider"></div>
      <p class="summary-text">${helpers.escape(basics.summary)}</p>
    </div>
  `;
}

module.exports = renderSummary;

