# Jithvar UI - React Component Library

A modern, beautiful, and highly customizable React component library built with TypeScript. Features 34 production-ready components including 20 interactive charts, advanced input controls, and data visualization tools.

## 🎯 Features

- ✅ **34 Components** - Charts, inputs, layout, data tables, and more
- ✅ **TypeScript First** - Full type safety and IntelliSense support
- ✅ **Zero Dependencies** - Lightweight, pure React + SVG implementation
- ✅ **Tree Shakeable** - Import only what you need
- ✅ **Responsive** - Works beautifully on all screen sizes
- ✅ **Interactive** - Hover tooltips, animations, and smooth transitions
- ✅ **Customizable** - Extensive prop configuration and styling options

## 📦 Components

### 📊 Charts (20)

Interactive data visualization components with tooltips and animations:

- **BarChart** - Vertical/horizontal bars with 3D effects and gradients
- **PieChart** - Circular proportional charts
- **DonutChart** - Ring chart variant
- **LineChart** - Multi-line trends with smooth curves
- **AreaChart** - Filled area visualizations
- **GaugeChart** - Needle-style progress indicators
- **ScatterPlot** - X/Y correlation plots
- **BubbleChart** - 3D data visualization (x, y, size)
- **RadarChart** - Multi-axis spider/web charts
- **FunnelChart** - Conversion funnel stages
- **HeatmapChart** - Color-coded matrix (5 color schemes)
- **StackedBarChart** - Vertical/horizontal stacked bars
- **WaterfallChart** - Cumulative value changes
- **HistogramChart** - Frequency distribution
- **CandlestickChart** - Financial OHLC data
- **ComboChart** - Mixed bar + line with dual Y-axes
- **BoxPlotChart** - Statistical distribution
- **BulletChart** - Performance vs target
- **GanttChart** - Project timeline with dependencies
- **HeartbeatChart** - Time-series with spike detection

### 🎛️ Inputs (10)

Advanced form controls with validation and customization:

- **DatePicker** - Single date selection with constraints
- **DateRangePicker** - Predefined and custom date ranges
- **SearchableSelect** - API-based searchable dropdown (single/multi)
- **RangeSlider** - Dual-handle min/max value selector
- **Checkbox** - Customizable checkbox component
- **CheckboxList** - Multiple checkbox group
- **Radio** - Single radio button
- **RadioGroup** - Radio button group with orientation
- **ToggleButtons** - Segmented control buttons
- **MaskInput** - Formatted input (phone, SSN, credit card, etc.)

### 📐 Layout (2)

Organize and structure your UI:

- **Tabs** - Tabbed content with multiple orientations
- **Collapse** - Accordion-style collapsible panels

### 📋 Data (1)

Advanced data management:

- **JTable** - Full-featured data table with server-side operations
  - Pagination, sorting, filtering
  - Row selection with bulk actions
  - URL state management (shareable filters)
  - Floating row actions
  - Universal and column-specific search

### 🚨 Feedback (1)

User notifications and alerts:

- **JAlerts** - Beautiful alert/modal dialogs (Better than SweetAlert!)
  - Multiple types (success, error, warning, info, question)
  - Custom buttons and inputs
  - Toast notifications
  - Animations and positioning

## Installation

```bash
npm install jithvar-ui
```

## Quick Start

```tsx
import { JAlerts } from "jithvar-ui";

// Show a success alert
JAlerts.success({
  title: "Success!",
  message: "Your action was completed successfully.",
});
```

## Documentation

Run the demo to see all components in action:

```bash
npm run demo
```

## License

MIT
