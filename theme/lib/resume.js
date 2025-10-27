import renderHeader from '../partials/header.js';
import renderSummary from '../partials/summary.js';
import renderSkills from '../partials/skills.js';
import renderWork from '../partials/work.js';
import renderEducation from '../partials/education.js';
import getCSS from './styles.js';

export function render(data) {
  const { basics, work, education, skills } = data;
  
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${basics.name} - Resume</title>
  <style>
    ${getCSS()}
  </style>
</head>
<body>
  <div class="resume">
    ${renderHeader(basics)}
    ${renderSummary(basics)}
    ${renderSkills(skills)}
    ${renderWork(work)}
    ${renderEducation(education)}
  </div>
</body>
</html>`;
  
  return html;
}

