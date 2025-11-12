# 🚀 Getting Started with Jithvar UI

Complete setup guide for different frameworks and environments.

## 📦 Installation

### Basic Installation

```bash
# npm
npm install jithvar-ui

# yarn
yarn add jithvar-ui

# pnpm
pnpm add jithvar-ui
```

### Peer Dependencies

Jithvar UI requires React 17+ as a peer dependency:

```bash
# React 18 (Recommended)
npm install react@^18.2.0 react-dom@^18.2.0

# React 17 (Minimum)
npm install react@^17.0.0 react-dom@^17.0.0

# React 19 (Latest - Beta Support)
npm install react@^19.0.0 react-dom@^19.0.0
```

## 🎯 Framework-Specific Setup

### Create React App (CRA)

```tsx
// src/App.js or App.tsx
import React, { useState } from "react";
import { DatePicker, BarChart, JAlerts } from "jithvar-ui";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="App">
      <h1>My React App with Jithvar UI</h1>

      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        placeholder="Select a date"
      />

      <BarChart
        data={[
          { label: "Jan", value: 65 },
          { label: "Feb", value: 78 },
          { label: "Mar", value: 90 },
        ]}
        title="Monthly Sales"
        width={600}
        height={300}
      />

      <button
        onClick={() => {
          JAlerts.success({
            title: "Welcome!",
            message: "Jithvar UI is working perfectly!",
          });
        }}
      >
        Test Alert
      </button>
    </div>
  );
}

export default App;
```

### Next.js (App Router - 13, 14, 15)

For Next.js 13+ with App Router, use `"use client"` directive:

```tsx
// app/page.tsx
"use client";

import { useState } from "react";
import { DateRangePicker, JTable, JAlerts } from "jithvar-ui";

export default function HomePage() {
  const [range, setRange] = useState({ startDate: null, endDate: null });

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", searchable: true },
    { key: "email", label: "Email" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="Select date range"
      />

      <JTable
        columns={columns}
        apiUrl="/api/users"
        enableUniversalSearch={true}
      />
    </div>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/index.tsx
import { useState } from "react";
import { SearchableSelect, PieChart } from "jithvar-ui";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const countries = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
  ];

  return (
    <div>
      <h1>My Next.js App</h1>

      <SearchableSelect
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        placeholder="Select country"
      />

      <PieChart
        data={[
          { label: "Desktop", value: 45 },
          { label: "Mobile", value: 35 },
          { label: "Tablet", value: 20 },
        ]}
        title="Traffic Sources"
      />
    </div>
  );
}
```

### Vite + React

```tsx
// src/App.tsx
import { useState } from "react";
import { RangeSlider, LineChart, Checkbox } from "jithvar-ui";

function App() {
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [enabled, setEnabled] = useState(true);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Vite + Jithvar UI</h1>

      <RangeSlider
        min={0}
        max={1000}
        value={priceRange}
        onChange={setPriceRange}
        label="Price Range"
        showLabels={true}
      />

      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        label="Enable notifications"
      />

      <LineChart
        data={[
          { x: "Jan", y: 30 },
          { x: "Feb", y: 45 },
          { x: "Mar", y: 60 },
          { x: "Apr", y: 55 },
        ]}
        title="Revenue Growth"
        height={300}
      />
    </div>
  );
}

export default App;
```

**vite.config.ts:**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["jithvar-ui"], // Optional: Pre-bundle Jithvar UI
  },
});
```

## 🎨 TypeScript Configuration

Jithvar UI includes full TypeScript support out of the box:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

### Using Types

```tsx
import type {
  JTableColumn,
  DateRange,
  JAlertOptions,
  ChartDataPoint,
  JTableAction,
} from "jithvar-ui";

// Type-safe column definitions
const columns: JTableColumn[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    type: "number",
  },
  {
    key: "name",
    label: "Name",
    searchable: true,
    render: (value: string, row: any) => <strong>{value}</strong>,
  },
];

// Type-safe date range
const [dateRange, setDateRange] = useState<DateRange>({
  startDate: null,
  endDate: null,
});

// Type-safe chart data
const chartData: ChartDataPoint[] = [
  { label: "Q1", value: 1200 },
  { label: "Q2", value: 1500 },
];

// Type-safe table actions
const actions: JTableAction[] = [
  {
    icon: "👁️",
    tooltip: "View Details",
    onClick: (row: any, index: number) => {
      console.log("Viewing row:", row);
    },
    variant: "primary",
  },
];
```

## 🌐 Server-Side Rendering (SSR)

### Next.js SSR Compatibility

Most Jithvar UI components work with SSR. For components that use browser APIs, use dynamic imports:

```tsx
// app/components/ClientOnlyTable.tsx
"use client";

import { JTable } from "jithvar-ui";

export default function ClientOnlyTable({ columns, apiUrl }) {
  return (
    <JTable columns={columns} apiUrl={apiUrl} enableUniversalSearch={true} />
  );
}
```

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';

const ClientOnlyTable = dynamic(
  () => import('./components/ClientOnlyTable'),
  { ssr: false }
);

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <ClientOnlyTable
        columns={[...]}
        apiUrl="/api/users"
      />
    </div>
  );
}
```

## 🎛️ Configuration Options

### Global Theme Configuration

Create a CSS file to customize the global theme:

```css
/* styles/jithvar-theme.css */
:root {
  /* Primary Colors */
  --jv-primary: #8b5cf6; /* Purple theme */
  --jv-secondary: #64748b;
  --jv-success: #10b981;
  --jv-danger: #ef4444;
  --jv-warning: #f59e0b;
  --jv-info: #06b6d4;

  /* Backgrounds */
  --jv-bg-primary: #ffffff;
  --jv-bg-secondary: #f9fafb;
  --jv-bg-hover: #f3f4f6;

  /* Text */
  --jv-text-primary: #111827;
  --jv-text-secondary: #6b7280;

  /* Border & Radius */
  --jv-border-color: #e5e7eb;
  --jv-border-radius: 8px;
}

/* Dark theme */
.dark-theme {
  --jv-bg-primary: #1f2937;
  --jv-bg-secondary: #111827;
  --jv-text-primary: #f9fafb;
  --jv-text-secondary: #d1d5db;
  --jv-border-color: #374151;
}
```

Import in your main CSS:

```css
/* In your main CSS file */
@import "styles/jithvar-theme.css";
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. React Version Conflicts

```bash
# Check React version
npm list react

# Install compatible version
npm install react@^18.2.0 react-dom@^18.2.0
```

#### 3. TypeScript Errors

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

#### 4. Bundle Size Issues

Use tree-shaking by importing specific components:

```tsx
// ✅ Good - Tree-shakeable
import { DatePicker } from "jithvar-ui";

// ❌ Bad - Imports everything
import * as JithvarUI from "jithvar-ui";
```

#### 5. Next.js Build Errors

For SSR issues, use dynamic imports:

```tsx
const JTable = dynamic(() => import("jithvar-ui").then((mod) => mod.JTable), {
  ssr: false,
});
```

## 📚 Next Steps

1. **[📊 Explore All Components](https://ui.jithvar.com)** - Interactive demos and examples
2. **[⚙️ Configuration Guide](./CONFIGURATION.md)** - Detailed customization options
3. **[🎨 Theming Guide](./THEMING.md)** - Custom styling and themes
4. **[📋 JTable Guide](./JTABLE.md)** - Advanced table configuration
5. **[🔔 JAlerts Guide](./JALERTS.md)** - Alert and notification patterns

## 💡 Need Help?

- **📧 Email**: [contact@jithvar.com](mailto:contact@jithvar.com)
- **🌐 Website**: [jithvar.com](https://jithvar.com)
- **📖 Documentation**: [ui.jithvar.com](https://ui.jithvar.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/jithvar/jithvar-ui/issues)

---

Built with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)
