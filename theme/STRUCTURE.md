# Theme Structure

This theme is organized into modular components for easy management and customization.

## Directory Structure

```
theme/
├── index.js                    # Main entry point
├── lib/
│   ├── resume.js               # Main render function (orchestrates all partials)
│   ├── styles.js                # Combines all CSS modules
│   ├── styles/                  # Individual CSS modules
│   │   ├── base.js              # Base styles (body, resume container)
│   │   ├── header.js            # Header and divider styles
│   │   ├── section.js         # Section headings (h2)
│   │   ├── skills.js            # Skills grid styles
│   │   ├── work.js              # Work experience styles
│   │   ├── education.js         # Education styles
│   │   └── print.js             # Print media queries
│   └── helpers.js               # Utility functions
└── partials/                   # HTML rendering components
    ├── header.js                # Header section
    ├── summary.js               # Summary section
    ├── skills.js                # Skills section
    ├── work.js                  # Work experience section
    └── education.js             # Education section
```

## Component Organization

### Partials (HTML Rendering)
Each partial is responsible for rendering a specific section of the resume:

- **header.js**: Renders name, contact info, {JSON Resume} link, and divider
- **summary.js**: Renders professional summary paragraph
- **skills.js**: Renders skills in a two-column grid
- **work.js**: Renders work experience with company, position, dates, and bullet points
- **education.js**: Renders education entries with dates

### Styles (CSS Modules)
Each style module contains CSS for a specific section:

- **base.js**: Body, fonts, container, and base reset styles
- **header.js**: Header layout, name, contact info, divider line
- **section.js**: Section headings (h2 styling)
- **skills.js**: Skills grid layout, labels, and keywords
- **work.js**: Work entry layout, company name, dates, position, bullet lists
- **education.js**: Education entry layout, names, dates
- **print.js**: Print media queries for PDF generation

### Main Files

- **resume.js**: Main render function that combines all partials
- **styles.js**: Combines all CSS modules
- **helpers.js**: Utility functions (escape, date formatting)

## Benefits of This Structure

1. **Maintainability**: Each component is isolated and easy to modify
2. **Reusability**: Styles and partials can be mixed and matched
3. **Readability**: Small, focused files are easier to understand
4. **Testability**: Individual components can be tested separately
5. **Scalability**: Easy to add new sections or customize existing ones

## Customization

### To Modify a Section
Edit the corresponding file:
- Change header layout? Edit `partials/header.js` and `lib/styles/header.js`
- Change skills display? Edit `partials/skills.js` and `lib/styles/skills.js`
- Change work experience? Edit `partials/work.js` and `lib/styles/work.js`

### To Add a New Section
1. Create a new partial in `partials/` (e.g., `projects.js`)
2. Create a new style in `lib/styles/` (e.g., `projects.js`)
3. Import both in `resume.js` and `styles.js`
4. Add to render function in `resume.js`

### To Adjust Fonts/Styling
Edit the specific style file in `lib/styles/` for the section you want to change.

## Example: Changing Font Sizes

To change all font sizes, edit:
- `lib/styles/base.js` - Base body font size
- `lib/styles/header.js` - Header font sizes
- `lib/styles/work.js` - Work experience font sizes
- etc.

## Example: Adding Projects Section

1. Create `partials/projects.js`:
```javascript
function renderProjects(projects) {
  // ... rendering logic
}
module.exports = renderProjects;
```

2. Create `lib/styles/projects.js`:
```javascript
function getProjectsCSS() {
  return `
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  `;
}
module.exports = getProjectsCSS;
```

3. Update `lib/resume.js`:
```javascript
const renderProjects = require('../partials/projects');
// ... in render function:
${renderProjects(data.projects)}
```

4. Update `lib/styles.js`:
```javascript
const getProjectsCSS = require('./styles/projects');
// ... in getCSS function:
${getProjectsCSS()}
```

