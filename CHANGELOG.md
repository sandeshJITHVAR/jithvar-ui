# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-10

### Added

- **Floating Actions** - Brand new feature for JTable component

  - Hover-activated action buttons that appear near mouse pointer
  - Built-in action types: copy, view, edit, delete, call, email, visit, custom
  - Conditional visibility based on field values (phone, email, URL)
  - Smooth animations and transitions
  - Fully customizable icons and tooltips
  - See [FLOATING_ACTIONS_GUIDE.md](./FLOATING_ACTIONS_GUIDE.md) for details

- **Demo Application Overhaul**

  - New sidebar navigation with React Router
  - Individual pages for each component
  - Copyable code examples with one-click copy
  - Live interactive demos
  - Installation guide as landing page
  - Modern, responsive design
  - Component-specific documentation

- **New Type Definitions**

  - `JTableFloatingAction` interface
  - `JTableFloatingConfig` interface
  - Enhanced `JTableAction` with required tooltip

- **Documentation**
  - `FLOATING_ACTIONS_GUIDE.md` - Complete guide for floating actions
  - `COMPLETE_IMPLEMENTATION_SUMMARY.md` - Full implementation details
  - Updated `README.md` with floating actions examples
  - Enhanced API documentation

### Fixed

- **SearchableSelect Infinite Loop** - Resolved infinite re-render issue when using static options

  - Added `isInitialMount` ref to track first render
  - Proper initialization of `filteredOptions`
  - Safe dependency array management

- **JTable Continuous Loading** - Fixed infinite data fetching loop
  - Optimized useEffect dependencies
  - Removed callback functions from dependency array
  - Now only refetches when actual state changes

### Changed

- **JTableAction Interface** - Breaking changes for better API

  - `icon` is now **required** (was optional)
  - `tooltip` is now **required** (was optional)
  - `label` remains **optional**
  - Removed `showOnHover` property (use floating actions instead)
  - Removed `dropdown` property (use floating actions instead)

- **Demo Structure** - Complete reorganization

  - Moved from single-page to multi-page app
  - Added `demo/App.tsx` with router
  - Added `demo/pages/` folder with component demos
  - Added `demo/components/` folder for shared components
  - New `demo/newDemo.css` with modern styling

- **Export Structure**
  - Added `JTableFloatingAction` to type exports
  - Added `JTableFloatingConfig` to type exports
  - Updated index files for better tree-shaking

### Improved

- **Type Safety** - All new features fully typed with TypeScript
- **Performance** - Optimized re-renders in SearchableSelect and JTable
- **User Experience** - Cleaner table interface with floating actions
- **Developer Experience** - Better documentation and examples
- **Accessibility** - Required tooltips for all actions

### Migration Guide

#### From Column Actions to Floating Actions

**Before (v0.x):**

```typescript
actions={[
  {
    icon: '👁️',
    label: 'View',
    tooltip: 'View Details',
    onClick: viewRow,
  }
]}
```

**After (v1.0):**

```typescript
// Option 1: Use floating actions (recommended)
floatingActions={{
  enabled: true,
  actions: [
    {
      type: 'view',
      onClick: viewRow,
    }
  ]
}}

// Option 2: Keep column actions (icon and tooltip now required)
actions={[
  {
    icon: '👁️',
    tooltip: 'View Details',  // Now required
    label: 'View',            // Optional
    onClick: viewRow,
  }
]}
```

#### Breaking Changes

1. **JTableAction.tooltip is now required**

   ```typescript
   // Before: tooltip was optional
   { icon: '✏️', onClick: edit }

   // After: tooltip is required
   { icon: '✏️', tooltip: 'Edit', onClick: edit }
   ```

2. **JTableAction.icon is now required**

   ```typescript
   // Before: icon was optional
   { label: 'Edit', onClick: edit }

   // After: icon is required
   { icon: '✏️', label: 'Edit', tooltip: 'Edit', onClick: edit }
   ```

3. **Removed showOnHover and dropdown properties**
   - Use floating actions instead for hover-based actions
   - Use multiple floating actions instead of dropdown menu

### Technical Details

- Fixed SearchableSelect infinite loop by:

  - Adding `useRef` for `isInitialMount` tracking
  - Separate useEffect for initial static options load
  - Proper handling of `staticOptions` in dependencies

- Fixed JTable loading loop by:

  - Changed from function dependencies to value dependencies
  - `useEffect` now depends on state values, not callbacks
  - Prevents recreation of fetch function from triggering re-fetch

- Implemented floating actions with:
  - Fixed positioning relative to mouse pointer
  - Z-index management for proper layering
  - Click-outside detection for menu dismissal
  - Smooth CSS animations and transitions
  - Conditional rendering based on field values

### Known Issues

None at this time.

### Deprecated

- `showOnHover` property in JTableAction (use floating actions)
- `dropdown` property in JTableAction (use floating actions)

### Security

No security issues in this release.

## [0.9.0] - Previous Release

- Initial implementation of all components
- Basic functionality established
- TypeScript support
- CSS module system

---

For detailed implementation notes, see [COMPLETE_IMPLEMENTATION_SUMMARY.md](./COMPLETE_IMPLEMENTATION_SUMMARY.md).

For floating actions documentation, see [FLOATING_ACTIONS_GUIDE.md](./FLOATING_ACTIONS_GUIDE.md).
