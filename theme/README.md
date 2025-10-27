# Traiforce Resume Theme

A custom JSON Resume theme that matches the original PDF layout.

## Features

- **Header Layout**: Name + {JSON Resume} link + Phone + Email all on one line
- **Section Dividers**: Horizontal lines separating sections
- **Clean Typography**: Arial/Helvetica fonts matching original
- **Two-Column Skills**: Skills displayed in a grid layout
- **Professional Colors**: Blue headers (#2f5496), gray dates (#434649)
- **Bullet Points**: Indented bullet lists for work experience
- **Right-Aligned Dates**: Dates positioned on the right side

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

## Usage

This theme is automatically used by the resume-cli in this repository:

```bash
npm run generate          # Generate default resume
npm run generate:whoop     # Generate WHOOP-specific resume
```

## Customization

Edit the following files:
- `lib/resume.js` - HTML structure and rendering logic
- CSS within `lib/resume.js` - Styling and layout
- `helpers.js` - Utility functions

## Dependencies

- None (pure JavaScript)

## License

MIT

