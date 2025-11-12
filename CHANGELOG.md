# Changelog

All notable changes to Jithvar UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0-beta.1] - 2024-11-12

### 🚀 New Features

#### Enhanced JTable Component

- **Custom API Parameter Mapping**: New `apiParams` prop allows mapping table parameters to your API's expected names
  ```tsx
  <JTable
    apiParams={{
      page: "offset", // Maps 'page' to 'offset'
      pageSize: "limit", // Maps 'pageSize' to 'limit'
      sortColumn: "sort_by", // Maps 'sortColumn' to 'sort_by'
      universalSearch: "q", // Maps 'search' to 'q'
    }}
  />
  ```
- **Built-in Skeleton Loading**: Skeleton loading is now integrated within the table component itself, no need for external skeleton components
- **Improved Floating Actions**: Enhanced hover-based quick actions with better positioning and performance

### ✨ Improvements

#### JTable Component

- **Cleaner Filter Interface**: Removed search mode display from filter dropdowns for a cleaner UI
- **Better Performance**: Optimized rendering and reduced unnecessary re-renders
- **Enhanced Type Safety**: Improved TypeScript definitions for better IntelliSense support
- **API Parameter Flexibility**: Support for any custom parameter mapping through the new `JTableApiParams` interface

#### Documentation

- **Comprehensive Installation Guide**: Added detailed setup instructions for React, Next.js, and Vite
- **Real-world Examples**: Added complete working examples for dashboards, forms, and data management
- **API Parameter Mapping Examples**: Detailed examples for Laravel, REST API, and GraphQL parameter formats
- **Framework-specific Setup**: Dedicated setup guides for different React frameworks

### 🔧 Technical Changes

#### Code Structure

- Added `JTableApiParams` interface for type-safe parameter mapping
- Removed `searchMode` prop from JTable (no longer needed)
- Enhanced skeleton loading styles and animations
- Improved floating action button positioning and hover states

#### Bundle Optimization

- Maintained full tree-shaking capability
- Optimized component imports and exports
- Reduced overall bundle size through code optimization

### 📖 Documentation

#### New Documentation Files

- **GETTING_STARTED.md**: Comprehensive setup guide for all frameworks
- **Enhanced Installation.tsx**: Real-world examples and use cases
- **API Parameter Mapping Guide**: Complete reference for custom parameter mapping

#### Updated Documentation

- README.md with latest features and examples
- Installation guide with framework-specific instructions
- JTable demo with comprehensive configuration examples

### 🐛 Bug Fixes

- Fixed floating action button positioning issues
- Resolved skeleton loading display inconsistencies
- Improved table state management with custom API parameters
- Fixed TypeScript compilation issues with new parameter mapping

### 💥 Breaking Changes

None. This release is fully backward compatible with v1.0.x.

### 🔄 Migration Guide

No migration needed from v1.0.x. All existing code will continue to work.

**Optional Enhancements:**

- Consider using the new `apiParams` prop if your API uses different parameter names
- Remove external skeleton loading components as JTable now handles this internally

---

## [1.0.5] - 2024-10-15

### 🐛 Bug Fixes

- Fixed date picker calendar positioning
- Resolved chart tooltip rendering issues
- Improved table pagination performance

### ✨ Improvements

- Enhanced accessibility for all form components
- Better mobile responsiveness for charts
- Optimized bundle size through code splitting

---

## [1.0.4] - 2024-09-20

### 🚀 New Features

- Added HeartbeatChart component
- Enhanced JAlerts with custom positioning
- New MaskInput component for formatted inputs

### ✨ Improvements

- Better TypeScript definitions
- Improved chart animations
- Enhanced table filtering performance

---

## [1.0.3] - 2024-08-25

### 🚀 New Features

- Added GanttChart component
- New BulletChart for performance metrics
- Enhanced SearchableSelect with API integration

### 🐛 Bug Fixes

- Fixed chart responsiveness on mobile
- Resolved date picker locale issues
- Improved table sorting stability

---

## [1.0.2] - 2024-07-30

### 🚀 New Features

- Added BoxPlotChart component
- Enhanced JTable with floating actions
- New RadioGroup component

### ✨ Improvements

- Better chart color schemes
- Improved table performance with large datasets
- Enhanced accessibility compliance

---

## [1.0.1] - 2024-07-01

### 🐛 Bug Fixes

- Fixed chart legend positioning
- Resolved table column sizing issues
- Improved date picker accessibility

### ✨ Improvements

- Better error handling in components
- Enhanced documentation examples
- Optimized CSS bundle size

---

## [1.0.0] - 2024-06-15

### 🚀 Initial Release

#### 34 Production-Ready Components

**📊 Charts (20 Components)**

- BarChart, PieChart, DonutChart, LineChart, AreaChart
- GaugeChart, ScatterPlot, BubbleChart, RadarChart
- FunnelChart, HeatmapChart, StackedBarChart
- WaterfallChart, HistogramChart, CandlestickChart
- ComboChart, BoxPlotChart, BulletChart
- GanttChart, HeartbeatChart

**🎛️ Form Inputs (10 Components)**

- DatePicker, DateRangePicker, SearchableSelect
- RangeSlider, Checkbox, CheckboxList
- Radio, RadioGroup, ToggleButtons, MaskInput

**📐 Layout (2 Components)**

- Tabs, Collapse

**📋 Data (1 Component)**

- JTable (Advanced data table)

**🔔 Feedback (1 Component)**

- JAlerts (Modal dialogs & notifications)

#### Key Features

- **TypeScript First**: 100% type-safe with complete IntelliSense
- **Zero Dependencies**: Pure React + SVG implementation
- **Tree Shakeable**: Import only what you need
- **Responsive Design**: Mobile-first approach
- **Enterprise Ready**: Production-tested components
- **Framework Support**: React 17+, Next.js 13+

#### Framework Compatibility

- ✅ React 17.x, 18.x, 19.x
- ✅ Next.js 13.x, 14.x, 15.x
- ✅ Create React App
- ✅ Vite + React
- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)

---

## Support & Contribution

### 🐛 Found a Bug?

Please report it on [GitHub Issues](https://github.com/jithvar/jithvar-ui/issues) with:

- Steps to reproduce
- Expected vs actual behavior
- Browser and React version
- Minimal code example

### 💡 Feature Requests

We welcome feature requests! Please:

- Check existing issues first
- Provide detailed use cases
- Include mockups or examples if applicable

### 🤝 Contributing

See our [Contributing Guide](./CONTRIBUTING.md) for:

- Development setup
- Code style guidelines
- Testing requirements
- Pull request process

---

**Built with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)**
