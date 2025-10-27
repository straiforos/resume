const getBaseCSS = require('./styles/base');
const getHeaderCSS = require('./styles/header');
const getSectionCSS = require('./styles/section');
const getSkillsCSS = require('./styles/skills');
const getWorkCSS = require('./styles/work');
const getEducationCSS = require('./styles/education');
const getPrintCSS = require('./styles/print');

function getCSS() {
  return `
    ${getBaseCSS()}
    ${getHeaderCSS()}
    ${getSectionCSS()}
    ${getSkillsCSS()}
    ${getWorkCSS()}
    ${getEducationCSS()}
    ${getPrintCSS()}
  `;
}

module.exports = getCSS;

