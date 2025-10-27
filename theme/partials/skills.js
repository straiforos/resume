import { escape } from '../lib/helpers.js';

export default function renderSkills(skills) {
  if (!skills || skills.length === 0) return '';
  
  let html = `
    <div class="section">
      <h2>Skills</h2>
      <div class="divider"></div>
      <div class="skills-grid">
  `;
  
  skills.forEach((skill) => {
    html += `<div class="skill-group">
      <span class="skill-label">${escape(skill.name)}:</span>
      <span class="skill-keywords">${skill.keywords.join(', ')}</span>
    </div>`;
  });
  
  html += `</div></div>`;
  
  return html;
}

