# Project Structure

```
jithvar-ui/
├── .github/
│   └── copilot-instructions.md    # Copilot custom instructions
├── src/
│   ├── components/                # All UI components
│   │   ├── DateRangePicker/
│   │   │   ├── DateRangePicker.tsx
│   │   │   ├── DateRangePicker.css
│   │   │   └── index.ts
│   │   ├── DatePicker/
│   │   │   ├── DatePicker.tsx
│   │   │   ├── DatePicker.css
│   │   │   └── index.ts
│   │   ├── SearchableSelect/
│   │   │   ├── SearchableSelect.tsx
│   │   │   ├── SearchableSelect.css
│   │   │   └── index.ts
│   │   ├── RangeSlider/
│   │   │   ├── RangeSlider.tsx
│   │   │   ├── RangeSlider.css
│   │   │   └── index.ts
│   │   └── JTable/
│   │       ├── JTable.tsx
│   │       ├── JTable.css
│   │       └── index.ts
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── helpers.ts            # Utility functions
│   └── index.ts                  # Main export file
├── demo/
│   ├── index.html
│   ├── main.tsx                  # Demo application
│   └── demo.css                  # Demo styles
├── dist/                         # Build output (generated)
│   ├── index.js                  # CommonJS bundle
│   ├── index.esm.js              # ES Module bundle
│   └── index.d.ts                # TypeScript declarations
├── node_modules/                 # Dependencies
├── .gitignore
├── .npmignore
├── API_GUIDE.md                  # Backend API integration guide
├── package.json
├── PUBLISHING.md                 # NPM publishing guide
├── README.md                     # Main documentation
├── rollup.config.js              # Rollup bundler config
├── tsconfig.json                 # TypeScript config
└── vite.config.ts                # Vite config for demo
```

## Component Architecture

### Individual Component Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.tsx    # Main component logic
├── ComponentName.css    # Component styles
└── index.ts            # Export file
```

### Benefits of This Structure

1. **Modularity**: Each component is self-contained
2. **Scalability**: Easy to add new components
3. **Maintainability**: Clear separation of concerns
4. **Tree-shaking**: Consumers can import only what they need
5. **Type Safety**: Centralized type definitions

## Import Patterns

### For Consumers

```tsx
// Named imports
import { JTable, DateRangePicker, SearchableSelect } from "jithvar-ui";

// Type imports
import type { JTableColumn, JTableAction, DateRange } from "jithvar-ui";
```

### Internal Imports

```tsx
// Component imports
import { DateRangePicker } from "../DateRangePicker";

// Type imports
import { JTableColumn, FilterState } from "../../types";

// Utility imports
import { classNames, debounce } from "../../utils/helpers";
```

## CSS Class Naming Convention

All CSS classes are prefixed with `jv-` to avoid conflicts:

```css
.jv-jtable {
}
.jv-jtable-header {
}
.jv-jtable-filter-btn {
}
.jv-datepicker {
}
.jv-select-dropdown {
}
```

## TypeScript Configuration

- **Strict mode enabled** for type safety
- **Declaration files generated** for TypeScript consumers
- **React JSX** compilation mode
- **ES2020** target for modern JavaScript features

## Build Process

1. **Rollup** bundles the library into CommonJS and ES Module formats
2. **TypeScript** generates type declarations
3. **PostCSS** processes and injects CSS
4. **Output**: `dist/index.js`, `dist/index.esm.js`, `dist/index.d.ts`

## Development Workflow

```bash
# Install dependencies
npm install

# Build library
npm run build

# Run demo (dev mode with hot reload)
npm run demo

# Watch mode for library development
npm run dev
```

## Adding a New Component

1. Create component folder: `src/components/NewComponent/`
2. Create component files:
   - `NewComponent.tsx` - Component logic
   - `NewComponent.css` - Component styles
   - `index.ts` - Export file
3. Add types to `src/types/index.ts` if needed
4. Export from `src/index.ts`
5. Update documentation in `README.md`
6. Add example to `demo/main.tsx`

## Best Practices

### Component Development

- Use TypeScript for all components
- Follow React hooks best practices
- Prefix all CSS classes with `jv-`
- Make components fully configurable via props
- Provide sensible defaults
- Use controlled/uncontrolled patterns appropriately

### Type Definitions

- Export all prop interfaces
- Use generic types where appropriate
- Document complex types with JSDoc comments
- Keep types in centralized `types/` folder

### Styling

- Use scoped CSS with component-specific classes
- Support style customization via className props
- Use CSS variables for themeable values
- Ensure responsive design
- Follow accessibility guidelines

### Testing

- Test components with various prop combinations
- Test edge cases (empty data, errors, loading states)
- Ensure keyboard navigation works
- Verify screen reader compatibility

## Publishing Checklist

Before publishing to NPM:

1. ✅ Update version in `package.json`
2. ✅ Run `npm run build` successfully
3. ✅ Test demo application
4. ✅ Update `README.md` with new features
5. ✅ Update `CHANGELOG.md`
6. ✅ Commit all changes
7. ✅ Create git tag
8. ✅ Run `npm publish`

## Version Control

- Use semantic versioning (MAJOR.MINOR.PATCH)
- Commit message format: `type(scope): description`
- Create tags for releases
- Maintain CHANGELOG.md
