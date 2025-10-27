const helpers = require('../lib/helpers');

function renderHeader(basics) {
  const phone = basics.phone || '';
  const email = basics.email || '';
  
  return `
    <div class="header">
      <span class="name">${helpers.escape(basics.name)}</span>
      <span class="json-link">{JSON Resume}</span>
      <span class="contact">${helpers.escape(phone)}</span>
      <span class="email">${helpers.escape(email)}</span>
    </div>
    <div class="divider"></div>
  `;
}

module.exports = renderHeader;

