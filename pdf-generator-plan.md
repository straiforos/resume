# PDF Resume Generator Plan

## Goal
Create a JavaScript-based PDF generator that transforms `resume.json` (or tailored variants like `whoop-resume.json`) into professional PDF resumes, eliminating the need to manually manage a Google Doc.

## Current State Analysis

### Input Files
- **`resume.json`**: Full JSON resume with all experience, skills, projects, etc.
- **`whoop-resume.json`**: Tailored version for WHOOP application

### Reference Output
- **`Resume (1).pdf`**: Current PDF format from Google Docs
- **`Resume.txt`**: Plain text version showing structure
- **`Resume.html`**: HTML export with embedded styling

### Key Design Elements from PDF
1. **Header**: Name + JSON Resume link + Phone + Email
2. **Summary Section**: Professional summary paragraph
3. **Skills Section**: Multi-column layout grouped by category
4. **Work Experience**: Company name + dates + position + bullet points
5. **Education**: University + degree + dates
6. **Styling**: Clean, professional, single-column layout

## Technical Implementation Options

### Option 1: PDFKit (Node.js) - Recommended
**Pros:**
- Lightweight, pure JavaScript/Node.js
- Great control over layout and typography
- Small footprint, fast PDF generation
- Good for programmatic generation

**Cons:**
- Manual positioning (margins, coordinates)
- Need to implement layout logic

**Ideal for:** Command-line generation, CI/CD integration

### Option 2: Puppeteer (Headless Chrome)
**Pros:**
- HTML/CSS to PDF (use existing web skills)
- Beautiful rendering
- Easy styling with CSS
- Can reuse React/Angular components

**Cons:**
- Heavier (requires Chromium)
- Slower startup time

**Ideal for:** Existing web app, complex styling needs

### Option 3: jsPDF
**Pros:**
- Browser-compatible (pure JavaScript)
- Good for simple layouts
- No server needed

**Cons:**
- Limited typography control
- Can be tricky for complex layouts

**Ideal for:** Browser-based tools, simple resumes

## Recommended Architecture

### Project Structure
```
resume-pdf-generator/
├── src/
│   ├── generator.js           # Main PDF generation logic
│   ├── layout.js              # Layout calculations
│   ├── renderers/
│   │   ├── header.js          # Name + contact info
│   │   ├── summary.js         # Professional summary
│   │   ├── skills.js          # Skills section
│   │   ├── work.js            # Work experience
│   │   ├── education.js       # Education section
│   │   └── projects.js        # Projects section (optional)
│   └── styles.js              # Fonts, colors, spacing
├── templates/
│   └── default.json          # Template configuration
├── output/                    # Generated PDFs
├── input/                     # JSON resume files
│   ├── resume.json
│   └── whoop-resume.json
├── package.json
└── README.md
```

### Core Flow
1. **Load JSON**: Read resume.json or whoop-resume.json
2. **Parse Data**: Extract sections (basics, work, education, skills)
3. **Generate Layout**: Calculate positions, margins, line breaks
4. **Render PDF**: Use PDFKit to draw text, lines, sections
5. **Save Output**: Write to `output/resume.pdf` or `output/whoop-resume.pdf`

## Implementation Details

### PDFKit Setup
```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'LETTER',
  margins: {
    top: 36,
    right: 36,
    bottom: 36,
    left: 36
  }
});

doc.pipe(fs.createWriteStream('output/resume.pdf'));
```

### Layout Components

#### Header Section
- Name: Large, bold (16pt)
- Contact: Phone + Email (10pt)
- JSON Resume link
- Section separator line

#### Summary Section
- Heading: "Summary" (13pt, bold)
- Paragraph: Full width text
- Line spacing: 1.15

#### Skills Section
- Heading: "Skills" (13pt, bold)
- Multi-column layout (2-3 columns)
- Category labels bold, keywords inline
- Example: "Azure: Pipelines, Team Foundation Server"

#### Work Experience
- Company + Position (left aligned)
- Dates (right aligned) - requires careful positioning
- Bullet points indented
- Multiple jobs with spacing between

#### Education
- University + Degree (left aligned)
- Dates (right aligned)

### Font Handling
- **Primary**: Arial or Helvetica (standard PDF font)
- **Sizes**: 10pt (body), 13pt (section headings), 16pt (name)
- **Weights**: Regular (400), Bold (700)

### Colors
- **Black**: #000000 (body text)
- **Blue**: #2f5496 (section headings, links)
- **Gray**: #434649 (dates, secondary text)

### Spacing
- Section spacing: 12pt before section headers
- Bullet indent: 36pt left margin
- Bullet spacing: 6pt between bullets
- Work entry spacing: 12pt between companies

## Usage

### Command Line
```bash
# Generate default resume
npm run generate

# Generate WHOOP-specific resume
npm run generate:whoop

# Watch mode - regenerate on JSON changes
npm run generate:watch
```

### Programmatic
```javascript
const generate = require('./src/generator');

// Generate from JSON file
await generate('input/whoop-resume.json', 'output/whoop-resume.pdf');

// Or with customization
await generate('input/whoop-resume.json', 'output/whoop-resume.pdf', {
  hideProjects: true,
  customOrder: ['basics', 'work', 'education', 'skills']
});
```

## Features

### Phase 1: Core Functionality
- ✅ Load JSON resume format
- ✅ Render header with name + contact
- ✅ Render summary section
- ✅ Render skills section (multi-column)
- ✅ Render work experience
- ✅ Render education
- ✅ Basic typography and spacing

### Phase 2: Polish
- [ ] Accurately replicate exact spacing from PDF
- [ ] Add support for links (phone, email, URLs)
- [ ] Implement right-aligned dates
- [ ] Fine-tune bullet point rendering
- [ ] Add page break handling for long resumes

### Phase 3: Customization
- [ ] Templates: different layouts (standard, modern, compact)
- [ ] CLI flags: --theme, --layout, --hide-section
- [ ] Color schemes (professional, creative)
- [ ] Font choices (Arial, Times, etc.)

### Phase 4: Advanced
- [ ] Resume variants (whoop-resume.json, company-specific)
- [ ] Watch mode: auto-regenerate on JSON changes
- [ ] Validation: check JSON resume format
- [ ] Multiple output formats (PDF, HTML for preview)

## Dependencies

```json
{
  "name": "resume-pdf-generator",
  "version": "1.0.0",
  "dependencies": {
    "pdfkit": "^0.13.0",
    "fs-extra": "^11.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "generate": "node src/generator.js",
    "generate:whoop": "node src/generator.js --input=input/whoop-resume.json --output=output/whoop-resume.pdf",
    "generate:watch": "nodemon --watch input --ext json src/generator.js"
  }
}
```

## File Structure Reference

### Current PDF Structure
```
Stephen G. Traiforos         {JSON Resume}     (508) 494-5048 stephen@traiforos.com

Summary

[Paragraph about background]

Skills

Azure: Pipelines, Team Foundation Server        AWS: S3, Kinesis, SQS, Lambda...
IDEs: VS Code, IntelliJ                         Object-Oriented: Java, JS/TS...

Work Experience

Company Name                                               Dates
Position Title
• Bullet point 1
• Bullet point 2

Education

Worcester State University, BS Computer Science          Dates
```

## Next Steps

1. **Create project structure**: Set up `package.json` and folders
2. **Implement basic PDFKit setup**: Fonts, margins, document creation
3. **Build header renderer**: Name + contact + section divider
4. **Build summary renderer**: Load and display summary text
5. **Build skills renderer**: Parse skill groups, multi-column layout
6. **Build work renderer**: Company + dates + bullets
7. **Build education renderer**: University + degree + dates
8. **Test with resume.json**: Compare output to existing PDF
9. **Test with whoop-resume.json**: Verify tailoring works
10. **Polish spacing and typography**: Match existing PDF exactly

## Benefits

1. **Quick Iteration**: Change JSON → Regenerate PDF instantly
2. **Version Control**: Track resume changes in Git (JSON is text)
3. **Multiple Variants**: Easy to create `company-resume.json` files
4. **Automation**: Can integrate into CI/CD or make a web app
5. **Consistency**: Always use exact same formatting
6. **Programming Experience**: Demonstrates problem-solving for technical roles

## Success Criteria

- Generated PDF visually matches existing resume PDF
- Can generate multiple variants (whoop-resume.json works)
- Spacing, typography, and layout are professional
- Command-line tool is easy to use
- Code is maintainable and extensible

