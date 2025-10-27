# Publish JSON Resume Theme Package

## Overview

Convert the existing `theme/` folder into a standalone, publishable npm package called `jsonresume-theme-traiforce` that follows JSON Resume standards with ES modules.

## Key Changes

### 1. Convert to ES Modules

Convert all files from CommonJS (`require`/`module.exports`) to ES modules (`import`/`export`):

- `theme/index.js` - Change to named export `render`
- `theme/lib/resume.js` - Convert imports and export
- `theme/lib/styles.js` - Convert to ES module
- `theme/lib/helpers.js` - Convert to ES module
- All files in `theme/lib/styles/*.js` - Convert exports
- All files in `theme/partials/*.js` - Convert exports

### 2. Update Package Configuration

Update `theme/package.json`:

- Add `"type": "module"` for ES module support
- Add repository, homepage, and bugs URLs
- Add keywords for discoverability on npm
- Add scripts: `test`, `example`
- Add npm publishConfig (public access)
- Update version to `1.0.0` for initial release

### 3. Add Essential Files

Create new files in `theme/`:

- `.gitignore` - Ignore node_modules, .DS_Store, etc.
- `LICENSE` - MIT license with your name
- `example.json` - Copy from `input/resume.json` as sample
- `.npmignore` - Exclude example and test files from npm package

### 4. Initialize Git Repository

- Run `git init` in theme folder
- Create initial commit with all files

### 5. Publish to NPM

- Run `npm publish --access public` to publish the package

## Files Modified

- `theme/index.js`
- `theme/lib/resume.js`
- `theme/lib/styles.js`
- `theme/lib/helpers.js`
- `theme/lib/styles/base.js`
- `theme/lib/styles/header.js`
- `theme/lib/styles/section.js`
- `theme/lib/styles/skills.js`
- `theme/lib/styles/work.js`
- `theme/lib/styles/education.js`
- `theme/lib/styles/print.js`
- `theme/partials/header.js`
- `theme/partials/summary.js`
- `theme/partials/skills.js`
- `theme/partials/work.js`
- `theme/partials/education.js`
- `theme/package.json`
- `theme/README.md`

## Files Created

- `theme/.gitignore`
- `theme/LICENSE`
- `theme/example.json`
- `theme/.npmignore`

