const helpers = require('../lib/helpers');

function renderWork(work) {
  if (!work || work.length === 0) return '';
  
  let html = `
    <div class="section">
      <h2>Work Experience</h2>
  `;
  
  work.forEach((job) => {
    const dateRange = formatDateRange(job.startDate, job.endDate);
    html += `
      <div class="work-entry">
        <div class="company-row">
          <span class="company-name">${helpers.escape(job.company || job.name)}</span>
          <span class="date-range">${helpers.escape(dateRange)}</span>
        </div>
        ${job.position ? `<div class="position">${helpers.escape(job.position)}</div>` : ''}
        ${renderHighlights(job.highlights)}
      </div>
    `;
  });
  
  html += `</div>`;
  
  return html;
}

function renderHighlights(highlights) {
  if (!highlights || highlights.length === 0) return '';
  
  let html = '<ul class="highlights">';
  highlights.forEach((highlight) => {
    html += `<li>${helpers.escape(highlight)}</li>`;
  });
  html += '</ul>';
  
  return html;
}

function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  
  return `${start} - ${end}`;
}

module.exports = renderWork;

