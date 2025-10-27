# Stephen Traiforos Resume Generator

A professional PDF resume generator using JSON Resume format with a custom theme and automated testing.

## Features

- ✅ **Custom Theme**: Professional, compact single-page layout
- ✅ **Automated Page Count Verification**: Ensures one-page PDFs stay on one page
- ✅ **Comprehensive Testing**: Unit tests for header rendering and PDF page validation
- ✅ **Flexible Generation**: Multiple resume variants with different content
- ✅ **Jest DOM Testing**: Modern testing tools with DOM matchers

## Quick Start

### Installation
```bash
npm install
```

### Generate Resumes

```bash
# Generate one-page resume (with 1-page verification)
npm run generate -- onepage

# Generate WHOOP-specific resume
npm run generate -- whoop

# Generate default resume
npm run generate -- default

# Custom output path
npm run generate -- output/my-resume.pdf resume.json
```

### Available Shortcuts

- `npm run generate -- onepage` - Generate one-page.pdf (verifies it's 1 page)
- `npm run generate -- whoop` - Generate whoop-resume.pdf
- `npm run generate -- default` - Generate resume.pdf

### Full Command Syntax
```bash
npm run generate -- <output-path> [resume-json] [one-page-flag]
```

Examples:
```bash
npm run generate -- output/resume.pdf resume.json
npm run generate -- output/one-page.pdf one-page.json 1
```

## Project Structure

```
resume/
├── theme/                    # Custom JSON Resume theme
│   ├── partials/            # HTML rendering components
│   │   ├── header.js        # Header with name, contact, link
│   │   ├── summary.js       # Professional summary
│   │   ├── skills.js        # Skills grid
│   │   ├── work.js          # Work experience
│   │   └── education.js      # Education section
│   └── lib/
│       └── styles/           # CSS modules
│           ├── base.js      # Base styles & margins
│           ├── header.js    # Header layout
│           ├── section.js   # Section headings
│           ├── work.js      # Work experience styles
│           ├── skills.js    # Skills grid styles
│           └── education.js # Education styles
├── scripts/
│   └── generate-resume.js   # Unified generation script
├── test/
│   ├── header.test.js       # Header unit tests (Jest DOM)
│   ├── test-pdf-pages.test.js  # PDF validation tests
│   ├── pdf-utils.js         # PDF testing utilities
│   └── setup.js            # Jest configuration
├── output/                  # Generated PDFs
├── one-page.json           # One-page resume data
├── resume.json             # Full resume data
└── package.json
```

## Custom Theme Layout

The custom theme creates a professional, space-efficient resume:

### Layout Features

- **Compact Header**: Name + contact info on one line
- **Section Dividers**: Clean horizontal lines (with margins)
- **Condensed Spacing**: Optimized margins and padding for one-page fit
- **Professional Typography**: Arial/Helvetica with consistent sizing
- **Color Coding**: Blue section headers (#2f5496), gray dates (#434649)
- **Right-Aligned Dates**: Dates positioned on the right
- **Indented Bullet Lists**: Work experience highlights with bullets

### Spacing Optimizations

The theme has been optimized for one-page layouts:
- Top margin: 12pt (reduced from 18pt)
- Section spacing: 8pt (reduced from 12pt)
- Work entry spacing: 6pt (reduced from 8pt)
- Bottom padding: 30pt (reduced from 36pt)

## Testing

### Run All Tests
```bash
npm test
```

### Test Coverage

1. **Header Unit Tests** (`test/header.test.js`)
   - Renders name correctly
   - Includes contact information
   - Website link with proper href attribute
   - HTML escaping/XSS protection
   - Special character handling
   - DOM structure validation

2. **PDF Validation Tests** (`test/test-pdf-pages.test.js`)
   - Page count verification
   - Header spacing checks
   - Content validation

### Test Results

All 16 tests passing:
- 7 header rendering tests
- 9 PDF validation tests

## Customization

### Modify Theme Styles

Edit files in `theme/lib/styles/`:

- `base.js` - Overall layout, margins, padding
- `header.js` - Header layout and divider
- `section.js` - Section heading styles
- `work.js` - Work experience formatting
- `skills.js` - Skills grid layout
- `education.js` - Education formatting

### Modify Content Rendering

Edit files in `theme/partials/`:

- `header.js` - Header HTML structure
- `summary.js` - Summary section
- `skills.js` - Skills grid rendering
- `work.js` - Work experience list
- `education.js` - Education entries

### Example: Adjust Header Layout

Edit `theme/partials/header.js` to modify the header structure.

Edit `theme/lib/styles/header.js` to adjust spacing and layout.

### Regenerate After Changes

```bash
npm run generate -- onepage
```

## JSON Resume Schema

The project uses the [JSON Resume](https://jsonresume.org/) format:

```json
{
  "basics": {
    "name": "John Doe",
    "label": "Software Engineer",
    "email": "john@example.com",
    "phone": "(555) 123-4567",
    "summary": "Professional summary..."
  },
  "work": [
    {
      "name": "Company Name",
      "company": "Company Name",
      "position": "Position Title",
      "startDate": "2020-01",
      "endDate": "2022-12",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "education": [...],
  "skills": [...]
}
```

## Page Count Verification

The generation script automatically checks PDF page counts:

- **One-page resumes** warn if they exceed 1 page
- **Multi-page resumes** show page count for reference
- Exit code 1 if one-page requirement is violated

### Warnings

If a one-page PDF has more than 1 page:
```
⚠️  WARNING: one-page.pdf has 2 pages but should be 1 page!
   Consider reducing content or spacing to fit on one page.
```

## Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Dependencies
```bash
npm install
```

### Key Dependencies
- `resume-cli` - JSON Resume PDF generation
- `pdf-parse` - PDF page counting
- `jest` - Testing framework
- `@testing-library/jest-dom` - DOM testing utilities

## Available npm Scripts

```bash
npm run generate    # Generate resume (requires arguments)
npm test             # Run all tests
```

## License

MIT
