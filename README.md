# Stephen Traiforos Resume

Generate professional PDF resumes from JSON format using resume-cli.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate default resume:**
   ```bash
   npm run generate
   ```

3. **Generate WHOOP-specific resume:**
   ```bash
   npm run generate:whoop
   ```

## CLI Usage

### Basic Command
```bash
node src/generator.js [json-file]
```

### Examples
```bash
# Generate from default resume.json
node src/generator.js resume.json

# Generate WHOOP-specific resume
node src/generator.js whoop-resume.json

# Output will be saved to output/ directory
```

## File Structure

```
resume/
├── input/
│   ├── resume.json          # Full resume JSON
│   └── whoop-resume.json    # WHOOP-tailored resume JSON
├── output/
│   ├── resume.pdf           # Generated PDF
│   └── whoop-resume.pdf     # Generated PDF (WHOOP)
├── src/
│   └── generator.js         # PDF generation script
├── package.json
└── README.md
```

## Resume JSON Format

This generator uses the [JSON Resume](https://jsonresume.org/) schema with sections:

- `basics`: Name, contact, summary
- `work`: Employment history with highlights
- `education`: Academic background
- `skills`: Technical skills by category
- `projects`: Personal projects (optional)
- `interests`: Personal interests (optional)

## Features

- ✅ Clean, professional layout matching your existing PDF
- ✅ Automatic line wrapping and page breaks
- ✅ Multi-column skills section
- ✅ Right-aligned dates
- ✅ Bullet point formatting
- ✅ Custom colors and typography

## Customization

Edit the generation logic in `src/generator.js`:

- Adjust spacing and margins
- Change fonts and colors
- Modify section layouts
- Add new sections (projects, interests)

## npm Scripts

- `npm run generate` - Generate default resume
- `npm run generate:whoop` - Generate WHOOP-specific resume
- `npm test` - Test with default resume.json

## Requirements

- Node.js 14+
- resume-cli 3.0.6+
- jsonresume-theme-elegant

## Available Themes

- `elegant` - Clean, professional layout (default)

To use a different theme:
```bash
npm install --save-dev jsonresume-theme-[name]
npm run generate -- --theme [name]
```

## License

MIT

