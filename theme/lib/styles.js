import getBaseCSS from './styles/base.js';
import getHeaderCSS from './styles/header.js';
import getSectionCSS from './styles/section.js';
import getSkillsCSS from './styles/skills.js';
import getWorkCSS from './styles/work.js';
import getEducationCSS from './styles/education.js';
import getPrintCSS from './styles/print.js';

export default function getCSS() {
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

