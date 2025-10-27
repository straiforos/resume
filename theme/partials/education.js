const helpers = require('../lib/helpers');

function renderEducation(education) {
  if (!education || education.length === 0) return '';
  
  let html = `
    <div class="section">
      <h2>Education</h2>
  `;
  
  education.forEach((edu) => {
    const dateRange = formatDateRange(edu.startDate, edu.endDate);
    const degree = edu.area ? `${edu.studyType || ''}, ${edu.area}` : edu.studyType || '';
    
    html += `
      <div class="education-entry">
        <div class="education-row">
          <span class="education-name">${helpers.escape(edu.institution)}${degree ? ', ' + helpers.escape(degree) : ''}</span>
          <span class="education-date">${helpers.escape(dateRange)}</span>
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  
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

module.exports = renderEducation;

