import { escape } from '../lib/helpers.js';

export default function renderSummary(basics) {
  if (!basics.summary) return '';
  
  return `
    <div class="section">
      <h2>Summary</h2>
      <div class="divider"></div>
      <p class="summary-text">${escape(basics.summary)}</p>
    </div>
  `;
}

