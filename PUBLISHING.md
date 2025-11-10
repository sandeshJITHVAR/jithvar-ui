# Publishing jithvar-ui to npm

This guide will walk you through publishing the jithvar-ui package to npm.

## Prerequisites

1. **npm Account**: You need an npm account. If you don't have one, create it at [npmjs.com](https://www.npmjs.com/signup)

2. **Login to npm**: Run the following command and enter your credentials:

   ```bash
   npm login
   ```

3. **Verify Login**: Check that you're logged in:
   ```bash
   npm whoami
   ```

## Before Publishing

### 1. Update package.json

Make sure to update the following fields in `package.json`:

```json
{
  "name": "jithvar-ui",
  "version": "1.0.0",
  "description": "A modern React/Next.js UI component library",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/jithvar-ui.git"
  }
}
```

### 2. Check Package Name Availability

```bash
npm search jithvar-ui
```

If the name is taken, choose a different name (e.g., `@yourusername/jithvar-ui` for scoped packages).

### 3. Build the Library

```bash
npm run build
```

Verify that the `dist` folder is created with the compiled files.

### 4. Test Locally

Before publishing, test your package locally:

```bash
# In the jithvar-ui directory
npm link

# In a test project
npm link jithvar-ui
```

Then try importing and using the components in your test project.

### 5. Review Files to be Published

```bash
npm pack --dry-run
```

This shows what will be included in the package. Make sure only necessary files are included.

## Publishing Steps

### First Time Publishing

1. **Publish to npm**:

   ```bash
   npm publish
   ```

   For scoped packages (if using @username/package-name):

   ```bash
   npm publish --access public
   ```

2. **Verify**: Check your package at `https://www.npmjs.com/package/jithvar-ui`

### Updating the Package

1. **Make your changes**

2. **Update version** (follows semantic versioning):

   ```bash
   # Patch release (1.0.0 -> 1.0.1) - Bug fixes
   npm version patch

   # Minor release (1.0.0 -> 1.1.0) - New features (backward compatible)
   npm version minor

   # Major release (1.0.0 -> 2.0.0) - Breaking changes
   npm version major
   ```

3. **Build**:

   ```bash
   npm run build
   ```

4. **Publish**:

   ```bash
   npm publish
   ```

5. **Push to git** (if using version control):
   ```bash
   git push && git push --tags
   ```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible API changes
- **MINOR**: Add functionality (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Examples:

- `1.0.0` -> `1.0.1`: Fixed a bug in DatePicker
- `1.0.0` -> `1.1.0`: Added new RangeSlider component
- `1.0.0` -> `2.0.0`: Changed DateRangePicker API (breaking change)

## Publishing Checklist

- [ ] All components are working correctly
- [ ] TypeScript types are properly exported
- [ ] README.md is up to date
- [ ] Version number is updated
- [ ] Code is built (`npm run build`)
- [ ] Tests pass (if you have tests)
- [ ] CHANGELOG.md is updated (recommended)
- [ ] Git repository is up to date

## Post-Publishing

1. **Verify Installation**:

   ```bash
   npx clear-npx-cache
   npm install jithvar-ui
   ```

2. **Test in a Real Project**:
   Create a new React project and test the installation:

   ```bash
   npx create-react-app test-app
   cd test-app
   npm install jithvar-ui
   ```

3. **Update Documentation**: Make sure your GitHub repository README matches the npm package.

## Unpublishing (Use with Caution)

You can unpublish within 72 hours of publishing:

```bash
npm unpublish jithvar-ui@1.0.0
```

**Warning**: Unpublishing can break projects that depend on your package. Only use in emergencies.

## Best Practices

1. **Always test before publishing**
2. **Use semantic versioning consistently**
3. **Maintain a CHANGELOG.md**
4. **Write comprehensive documentation**
5. **Respond to issues and pull requests**
6. **Keep dependencies up to date**
7. **Use npm scripts for consistency**

## Troubleshooting

### "Package name already exists"

- Use a scoped package: `@yourusername/jithvar-ui`
- Choose a different name

### "You need to login"

```bash
npm logout
npm login
```

### "Permission denied"

- Make sure you're the owner of the package
- Check if you're logged in: `npm whoami`

### "Files missing after install"

- Check `.npmignore` and ensure necessary files are included
- Verify `files` field in package.json

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
