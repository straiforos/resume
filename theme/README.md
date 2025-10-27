# jsonresume-theme-traiforce

A clean, professional JSON Resume theme with modern styling.

## Features

- **Header Layout**: Name + {JSON Resume} link + Phone + Email all on one line
- **Section Dividers**: Horizontal lines separating sections
- **Clean Typography**: Arial/Helvetica fonts
- **Two-Column Skills**: Skills displayed in a grid layout
- **Professional Colors**: Blue headers (#2f5496), gray dates (#434649)
- **Bullet Points**: Indented bullet lists for work experience
- **Right-Aligned Dates**: Dates positioned on the right side

## Installation

Install the theme using npm:

```bash
npm install -g resume-cli jsonresume-theme-traiforce
```

Or install it locally:

```bash
npm install jsonresume-theme-traiforce
```

## Usage

### Using resume-cli

Generate a resume HTML file with this theme:

```bash
resume export resume.html --theme traiforce
```

### Programmatically

```javascript
import { render } from 'jsonresume-theme-traiforce';
import fs from 'fs';

const resumeData = JSON.parse(fs.readFileSync('resume.json', 'utf8'));
const html = render(resumeData);
fs.writeFileSync('resume.html', html);
```

## Theme Structure

The theme is organized into modular components:
- `lib/resume.js` - Main render function
- `lib/styles/` - CSS modules for each section
- `partials/` - HTML rendering components for each section
- `lib/helpers.js` - Utility functions

## Customization

The theme uses ES modules and inline CSS. To customize:

1. Fork this repository
2. Modify the CSS in `lib/styles/*.js` files
3. Adjust the HTML structure in `partials/*.js` files
4. Publish your own theme

## Layout Structure

```
[Name]     {JSON Resume}     (Phone)    email@example.com
───────────────────────────────────────────────────────────

Summary
───────────────────────────────────────────────────────────
[Summary text paragraph]

Skills
───────────────────────────────────────────────────────────
Category 1: Keywords...    Category 3: Keywords...
Category 2: Keywords...    Category 4: Keywords...

Work Experience
───────────────────────────────────────────────────────────
Company Name                                          Dates
Position Title
• Highlight 1
• Highlight 2

Education
───────────────────────────────────────────────────────────
University Name, Degree                                 Dates
```

## License

MIT

