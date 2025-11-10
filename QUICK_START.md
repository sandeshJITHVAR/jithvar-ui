# 🚀 Quick Start Guide - Jithvar UI

## Installation

```bash
npm install jithvar-ui
# or
yarn add jithvar-ui
```

## Components at a Glance

### 📅 DateRangePicker

```tsx
import { DateRangePicker } from "jithvar-ui";

<DateRangePicker value={dateRange} onChange={setDateRange} />;
```

### 📆 DatePicker

```tsx
import { DatePicker } from "jithvar-ui";

<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date("2020-01-01")}
  placeholder="Select date"
/>;
```

### 🔍 SearchableSelect

```tsx
import { SearchableSelect } from 'jithvar-ui';

// Static options
<SearchableSelect
  value={value}
  onChange={setValue}
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]}
  multiple={false}
/>

// API-based
<SearchableSelect
  value={value}
  onChange={setValue}
  apiUrl="https://api.example.com/search"
  minSearchLength={3}
  labelKey="name"
  valueKey="id"
/>
```

### 🎚️ RangeSlider

```tsx
import { RangeSlider } from "jithvar-ui";

<RangeSlider
  min={0}
  max={1000}
  value={[100, 500]}
  onChange={setRange}
  formatLabel={(val) => `$${val}`}
  showLabels
  showTooltip
/>;
```

### 📊 JTable (Advanced)

```tsx
import { JTable } from "jithvar-ui";

<JTable
  apiUrl="https://api.example.com/users"
  columns={[
    {
      key: "name",
      label: "Name",
      sortable: true,
      filterable: true,
      searchable: true,
      type: "text",
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      filterable: true,
      type: "number",
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      filterable: true,
      type: "date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ]}
  actions={[
    {
      label: "View",
      icon: "👁️",
      onClick: (row) => console.log(row),
      variant: "primary",
    },
  ]}
  enableUniversalSearch
  enableColumnToggle
  enableSelection
  searchMode="like"
/>;
```

## JTable Features

### 🎯 Column Configuration

```typescript
{
  key: 'columnName',
  label: 'Display Name',
  sortable: true,        // Enable sorting
  filterable: true,      // Enable filter (popup)
  searchable: true,      // Include in universal search
  type: 'text',          // text | number | date | custom
  visible: true,         // Show/hide column
  width: '150px',        // Column width
  align: 'left',         // left | center | right
  render: (value, row, index) => <custom />,
  headerRender: () => <custom />
}
```

### 🎬 Action Buttons

```typescript
{
  label: 'Delete',
  icon: '🗑️',
  onClick: (row, index) => deleteRow(row),
  variant: 'danger',     // primary | secondary | danger | success | warning
  tooltip: 'Delete record',
  visible: (row) => row.canDelete,
  disabled: (row) => row.isLocked
}
```

### 🔍 Smart Filters (Click to Open)

- **Text columns:** Search input with mode selector
- **Number columns:** Range slider (min/max)
- **Date columns:** Date range picker

### ⚙️ Column Visibility

Click "Columns" button to toggle column visibility. Hidden columns are saved in URL.

### 🎨 Styling Options

```typescript
striped={true}         // Alternating row colors
hover={true}           // Hover effect
bordered={false}       // Table border
compact={false}        // Compact padding
stickyHeader={false}   // Sticky header on scroll
```

### 📡 API Integration

Your API should handle these query parameters:

```
?page=1
&pageSize=10
&sortColumn=name
&sortDirection=asc
&search=john
&searchMode=like
&name=john                    // Column text filter
&age_min=25&age_max=45        // Number range filter
&joinDate_start=2020-01-01    // Date range filter
&joinDate_end=2020-12-31
```

Expected response:

```json
{
  "data": [...],
  "total": 100
}
```

## Search Modes

- **like:** Matches anywhere (default)
- **exact:** Exact match only
- **startsWith:** Matches from beginning
- **endsWith:** Matches from end

## Events

```typescript
onRowClick={(row, index) => {}}
onRowDoubleClick={(row, index) => {}}
onSelectionChange={(selectedRows) => {}}
```

## URL State Management

All table state (filters, sorting, pagination, column visibility) is automatically synced with URL. Share the URL to share the exact view!

## Customization

All components use `jv-` prefixed CSS classes. Override in your CSS:

```css
/* Customize date picker */
.jv-calendar-day-selected {
  background: #your-color !important;
}

/* Customize table */
.jv-jtable-row-selected {
  background: #your-color !important;
}

/* Customize action buttons */
.jv-jtable-action-btn-primary {
  background: #your-color;
}
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import {
  JTableColumn,
  JTableAction,
  JTableProps,
  DateRange,
  Option,
} from "jithvar-ui";
```

## Need Help?

- 📖 Full docs: [README.md](./README.md)
- 🔧 API reference: [API_GUIDE.md](./API_GUIDE.md)
- 📁 Project structure: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- 📦 Publishing: [PUBLISHING.md](./PUBLISHING.md)
- ✨ Improvements: [IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)

---

Happy coding! 🎉
