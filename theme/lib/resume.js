const renderHeader = require('../partials/header');
const renderSummary = require('../partials/summary');
const renderSkills = require('../partials/skills');
const renderWork = require('../partials/work');
const renderEducation = require('../partials/education');
const getCSS = require('./styles');

function render(data) {
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

module.exports = { render };

