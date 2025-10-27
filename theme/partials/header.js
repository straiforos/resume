import { escape } from '../lib/helpers.js';

export default function renderHeader(basics) {
  const phone = basics.phone || '';
  const email = basics.email || '';
  
  return `
    <div class="header">
      <div class="name">${escape(basics.name)}</div>
      <div class="contact-group">
        <span class="json-link"><a href="https://stephen.traiforos.com/">{stephen.traiforos.com}</a></span>
        <span class="contact">${escape(phone)}</span>
        <span class="email">${escape(email)}</span>
      </div>
    </div>
  `;
}

