# 📚 Jithvar UI - Complete Components Guide

Comprehensive documentation with basic and advanced examples for all components.

---

## Table of Contents

1. [JTable](#jtable)
2. [DatePicker](#datepicker)
3. [DateRangePicker](#daterangepicker)
4. [SearchableSelect](#searchableselect)
5. [RangeSlider](#rangeslider)
6. [Styling & Theming](#styling--theming)

---

## JTable

Advanced data table with server-side operations, filtering, sorting, and pagination.

### Basic Example

```tsx
import { JTable, JTableColumn } from "jithvar-ui";

const BasicTableExample = () => {
  const columns: JTableColumn[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      type: "number",
      width: "80px",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      searchable: true,
    },
    {
      key: "email",
      label: "Email",
      searchable: true,
    },
  ];

  return (
    <JTable
      columns={columns}
      apiUrl="https://api.example.com/users"
      enableUniversalSearch={true}
      enablePagination={true}
    />
  );
};
```

### Advanced Example

```tsx
import {
  JTable,
  JTableColumn,
  JTableAction,
  JTableFloatingConfig,
} from "jithvar-ui";
import { useState } from "react";

const AdvancedTableExample = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns: JTableColumn[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      filterable: true,
      type: "number",
      width: "80px",
    },
    {
      key: "name",
      label: "Full Name",
      sortable: true,
      searchable: true,
      filterable: true,
      width: "200px",
      render: (value, row) => (
        <strong style={{ color: row.status === "active" ? "green" : "gray" }}>
          {value}
        </strong>
      ),
    },
    {
      key: "email",
      label: "Email Address",
      sortable: true,
      searchable: true,
      filterable: true,
      render: (value) => (
        <a href={`mailto:${value}`} style={{ color: "#3b82f6" }}>
          {value}
        </a>
      ),
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      filterable: true,
      type: "number",
      width: "100px",
    },
    {
      key: "salary",
      label: "Salary",
      sortable: true,
      filterable: true,
      type: "number",
      width: "120px",
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      filterable: true,
      type: "date",
      width: "140px",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      searchable: true,
      filterable: true,
    },
  ];

  const actions: JTableAction[] = [
    {
      icon: "👁️",
      tooltip: "View Details",
      onClick: (row) => console.log("View", row),
      variant: "primary",
    },
    {
      icon: "✏️",
      tooltip: "Edit",
      onClick: (row) => console.log("Edit", row),
      variant: "secondary",
      disabled: (row) => row.status === "inactive",
    },
    {
      icon: "🗑️",
      tooltip: "Delete",
      onClick: (row) => console.log("Delete", row),
      variant: "danger",
      visible: (row) => row.role === "admin",
    },
  ];

  const floatingActions: JTableFloatingConfig = {
    enabled: true,
    phoneField: "phone",
    emailField: "email",
    urlField: "website",
    actions: [
      {
        type: "copy",
        onClick: (row) => {
          navigator.clipboard.writeText(JSON.stringify(row));
          console.log("Copied!");
        },
      },
      {
        type: "call",
        onClick: (row) => (window.location.href = `tel:${row.phone}`),
      },
      {
        type: "email",
        onClick: (row) => (window.location.href = `mailto:${row.email}`),
      },
      {
        type: "visit",
        onClick: (row) => window.open(row.website, "_blank"),
      },
      {
        type: "custom",
        icon: "⭐",
        tooltip: "Add to Favorites",
        onClick: (row) => console.log("Favorite", row),
        variant: "warning",
      },
    ],
  };

  return (
    <JTable
      columns={columns}
      apiUrl="https://api.example.com/users"
      rowKey="id"
      // Search & Filter
      enableUniversalSearch={true}
      enableColumnSearch={true}
      universalSearchPlaceholder="Search users..."
      // Selection
      enableSelection={true}
      onSelectionChange={setSelectedRows}
      // Pagination
      enablePagination={true}
      defaultPageSize={20}
      pageSizeOptions={[10, 20, 50, 100]}
      // Actions
      actions={actions}
      floatingActions={floatingActions}
      actionColumnPosition="right"
      // Appearance
      striped={true}
      hover={true}
      bordered={false}
      compact={false}
      stickyHeader={true}
      // State Management
      enableUrlState={true}
      // Custom Classes
      className="my-custom-table"
      rowClassName={(row) =>
        row.status === "inactive" ? "jv-row-inactive" : ""
      }
    />
  );
};
```

### JTable Props Reference

| Prop                         | Type                               | Default             | Description               |
| ---------------------------- | ---------------------------------- | ------------------- | ------------------------- |
| `columns`                    | `JTableColumn[]`                   | **required**        | Column definitions        |
| `apiUrl`                     | `string`                           | **required**        | API endpoint URL          |
| `rowKey`                     | `string`                           | `'id'`              | Unique identifier field   |
| `enableUniversalSearch`      | `boolean`                          | `true`              | Enable global search      |
| `enableColumnSearch`         | `boolean`                          | `false`             | Enable per-column filters |
| `enableSelection`            | `boolean`                          | `true`              | Enable row selection      |
| `enablePagination`           | `boolean`                          | `true`              | Enable pagination         |
| `defaultPageSize`            | `number`                           | `10`                | Default rows per page     |
| `pageSizeOptions`            | `number[]`                         | `[10, 25, 50, 100]` | Page size options         |
| `actions`                    | `JTableAction[]`                   | `undefined`         | Action column buttons     |
| `floatingActions`            | `JTableFloatingConfig`             | `undefined`         | Floating action buttons   |
| `actionColumnPosition`       | `'left' \| 'right'`                | `'right'`           | Action column position    |
| `striped`                    | `boolean`                          | `false`             | Striped rows              |
| `hover`                      | `boolean`                          | `true`              | Hover effect              |
| `bordered`                   | `boolean`                          | `false`             | Table borders             |
| `compact`                    | `boolean`                          | `false`             | Compact mode              |
| `stickyHeader`               | `boolean`                          | `false`             | Sticky header             |
| `enableUrlState`             | `boolean`                          | `false`             | URL state management      |
| `universalSearchPlaceholder` | `string`                           | `'Search...'`       | Search placeholder        |
| `onSelectionChange`          | `(rows: any[]) => void`            | `undefined`         | Selection callback        |
| `className`                  | `string`                           | `undefined`         | Custom CSS class          |
| `rowClassName`               | `string \| ((row: any) => string)` | `undefined`         | Row CSS class             |

### JTableColumn Interface

```typescript
interface JTableColumn {
  key: string; // Column key (data field name)
  label: string; // Column header label
  sortable?: boolean; // Enable sorting (default: false)
  searchable?: boolean; // Include in universal search (default: false)
  filterable?: boolean; // Enable column filter (default: false)
  type?: "text" | "number" | "date"; // Column type (default: 'text')
  width?: string; // Column width (e.g., '100px', '20%')
  render?: (value: any, row: any) => React.ReactNode; // Custom renderer
  hidden?: boolean; // Hide column (default: false)
}
```

### JTableAction Interface

```typescript
interface JTableAction {
  icon: string | React.ReactNode; // Action icon
  tooltip?: string; // Tooltip text
  onClick: (row: any) => void; // Click handler
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "ghost";
  visible?: (row: any) => boolean; // Conditional visibility
  disabled?: (row: any) => boolean; // Conditional disabled state
}
```

### JTableFloatingConfig Interface

```typescript
interface JTableFloatingConfig {
  enabled: boolean; // Enable floating actions
  phoneField?: string; // Phone field name for 'call' action
  emailField?: string; // Email field name for 'email' action
  urlField?: string; // URL field name for 'visit' action
  actions: JTableFloatingAction[]; // Floating actions array
}

interface JTableFloatingAction {
  type:
    | "copy"
    | "view"
    | "edit"
    | "delete"
    | "call"
    | "email"
    | "visit"
    | "custom";
  icon?: string; // Custom icon (for 'custom' type)
  tooltip?: string; // Custom tooltip
  onClick: (row: any) => void; // Click handler
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "ghost";
  visible?: (row: any) => boolean; // Conditional visibility
  disabled?: (row: any) => boolean; // Conditional disabled state
}
```

### API Response Format

Your API should return data in this format:

```json
{
  "data": [{ "id": 1, "name": "John Doe", "email": "john@example.com" }],
  "total": 100
}
```

### API Query Parameters

JTable sends these parameters to your API:

- `page` - Current page number (1-based)
- `pageSize` - Number of rows per page
- `search` - Universal search query
- `sortColumn` - Column key to sort by
- `sortDirection` - Sort direction ('asc' or 'desc')
- `{columnKey}` - Individual column filter value
- `{columnKey}_min` - Range filter minimum (for number columns)
- `{columnKey}_max` - Range filter maximum (for number columns)
- `{columnKey}_start` - Date range start (for date columns)
- `{columnKey}_end` - Date range end (for date columns)

---

## DatePicker

Single date selection component with optional constraints.

### Basic Example

```tsx
import { DatePicker } from "jithvar-ui";
import { useState } from "react";

const BasicDatePickerExample = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
  );
};
```

### Advanced Example

```tsx
import { DatePicker } from "jithvar-ui";
import { useState } from "react";

const AdvancedDatePickerExample = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const today = new Date();
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const oneMonthFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  return (
    <div>
      {/* Date picker with minimum and maximum dates */}
      <DatePicker
        value={startDate}
        onChange={setStartDate}
        placeholder="Select start date"
        minDate={oneMonthAgo}
        maxDate={today}
        className="custom-datepicker"
      />

      {/* Date picker with dynamic min date based on start date */}
      <DatePicker
        value={endDate}
        onChange={setEndDate}
        placeholder="Select end date"
        minDate={startDate || today}
        maxDate={oneMonthFromNow}
        disabled={!startDate}
      />

      {/* Display selected dates */}
      {startDate && endDate && (
        <div>
          Selected range: {startDate.toLocaleDateString()} to{" "}
          {endDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
```

### DatePicker Props Reference

| Prop          | Type                           | Default         | Description             |
| ------------- | ------------------------------ | --------------- | ----------------------- |
| `value`       | `Date \| null`                 | **required**    | Selected date value     |
| `onChange`    | `(date: Date \| null) => void` | **required**    | Change handler          |
| `placeholder` | `string`                       | `'Select date'` | Input placeholder       |
| `minDate`     | `Date`                         | `undefined`     | Minimum selectable date |
| `maxDate`     | `Date`                         | `undefined`     | Maximum selectable date |
| `disabled`    | `boolean`                      | `false`         | Disable the picker      |
| `className`   | `string`                       | `undefined`     | Custom CSS class        |
| `format`      | `string`                       | `'MM/DD/YYYY'`  | Date display format     |

### CSS Customization

```css
/* Custom date picker styling */
.custom-datepicker {
  --jv-datepicker-bg: #ffffff;
  --jv-datepicker-border: #e5e7eb;
  --jv-datepicker-selected-bg: #3b82f6;
  --jv-datepicker-selected-text: #ffffff;
  --jv-datepicker-hover-bg: #f3f4f6;
  --jv-datepicker-disabled-bg: #f9fafb;
  --jv-datepicker-disabled-text: #9ca3af;
}

/* Override specific elements */
.custom-datepicker .jv-datepicker-input {
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
}

.custom-datepicker .jv-datepicker-calendar {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
```

---

## DateRangePicker

Date range selection with predefined ranges and custom selection.

### Basic Example

```tsx
import { DateRangePicker } from "jithvar-ui";
import { useState } from "react";

const BasicDateRangeExample = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }}
      placeholder="Select date range"
    />
  );
};
```

### Advanced Example

```tsx
import { DateRangePicker } from "jithvar-ui";
import { useState } from "react";

const AdvancedDateRangeExample = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);

    // Fetch data or update based on date range
    if (start && end) {
      console.log("Fetching data from", start, "to", end);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={handleRangeChange}
        placeholder="Select reporting period"
        minDate={new Date(2020, 0, 1)} // Jan 1, 2020
        maxDate={new Date()} // Today
        showPresets={true}
        className="custom-daterange"
      />

      {startDate && endDate && (
        <div className="selected-range-info">
          <p>
            <strong>Selected Range:</strong> {startDate.toLocaleDateString()} -{" "}
            {endDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Days:</strong>{" "}
            {Math.ceil(
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            )}
          </p>
          <button onClick={handleClear}>Clear Selection</button>
        </div>
      )}
    </div>
  );
};
```

### DateRangePicker Props Reference

| Prop          | Type                                               | Default               | Description             |
| ------------- | -------------------------------------------------- | --------------------- | ----------------------- |
| `startDate`   | `Date \| null`                                     | **required**          | Start date value        |
| `endDate`     | `Date \| null`                                     | **required**          | End date value          |
| `onChange`    | `(start: Date \| null, end: Date \| null) => void` | **required**          | Change handler          |
| `placeholder` | `string`                                           | `'Select date range'` | Input placeholder       |
| `minDate`     | `Date`                                             | `undefined`           | Minimum selectable date |
| `maxDate`     | `Date`                                             | `undefined`           | Maximum selectable date |
| `showPresets` | `boolean`                                          | `true`                | Show preset ranges      |
| `disabled`    | `boolean`                                          | `false`               | Disable the picker      |
| `className`   | `string`                                           | `undefined`           | Custom CSS class        |

### Predefined Ranges

- **Yesterday**: Previous day
- **Last 7 Days**: Past week
- **Last 15 Days**: Past 15 days
- **Last 30 Days**: Past month
- **Current Month**: First to last day of current month
- **Last Month**: Full previous month
- **Last 3 Months**: Past 3 months
- **Custom**: Manual selection

---

## SearchableSelect

Searchable dropdown with single/multiple selection and API support.

### Basic Example

```tsx
import { SearchableSelect } from "jithvar-ui";
import { useState } from "react";

const BasicSelectExample = () => {
  const [value, setValue] = useState(null);

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <SearchableSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a framework"
    />
  );
};
```

### Advanced Example

```tsx
import { SearchableSelect } from "jithvar-ui";
import { useState } from "react";

const AdvancedSelectExample = () => {
  const [singleValue, setSingleValue] = useState(null);
  const [multipleValues, setMultipleValues] = useState([]);
  const [apiValue, setApiValue] = useState(null);

  // Static options
  const staticOptions = [
    { value: "red", label: "Red", color: "#ef4444" },
    { value: "blue", label: "Blue", color: "#3b82f6" },
    { value: "green", label: "Green", color: "#10b981" },
  ];

  // Custom option renderer
  const renderOption = (option: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "4px",
          backgroundColor: option.color,
        }}
      />
      <span>{option.label}</span>
    </div>
  );

  return (
    <div>
      {/* Single selection with custom rendering */}
      <SearchableSelect
        options={staticOptions}
        value={singleValue}
        onChange={setSingleValue}
        placeholder="Select a color"
        renderOption={renderOption}
        className="color-select"
      />

      {/* Multiple selection */}
      <SearchableSelect
        options={staticOptions}
        value={multipleValues}
        onChange={setMultipleValues}
        placeholder="Select colors"
        multiple={true}
        maxSelections={3}
      />

      {/* API-based with server-side search */}
      <SearchableSelect
        apiUrl="https://api.example.com/users"
        value={apiValue}
        onChange={setApiValue}
        placeholder="Search users (min 3 characters)"
        searchable={true}
        minSearchLength={3}
        valueKey="id"
        labelKey="name"
        loadingMessage="Searching users..."
        noResultsMessage="No users found"
      />
    </div>
  );
};
```

### SearchableSelect Props Reference

| Prop               | Type                                 | Default        | Description                      |
| ------------------ | ------------------------------------ | -------------- | -------------------------------- |
| `options`          | `Array<{value: any, label: string}>` | `undefined`    | Static options array             |
| `apiUrl`           | `string`                             | `undefined`    | API endpoint for dynamic options |
| `value`            | `any \| any[]`                       | **required**   | Selected value(s)                |
| `onChange`         | `(value: any \| any[]) => void`      | **required**   | Change handler                   |
| `placeholder`      | `string`                             | `'Select...'`  | Input placeholder                |
| `multiple`         | `boolean`                            | `false`        | Enable multiple selection        |
| `maxSelections`    | `number`                             | `undefined`    | Max number of selections         |
| `searchable`       | `boolean`                            | `true`         | Enable search                    |
| `minSearchLength`  | `number`                             | `0`            | Min characters for API search    |
| `valueKey`         | `string`                             | `'value'`      | Value property name              |
| `labelKey`         | `string`                             | `'label'`      | Label property name              |
| `disabled`         | `boolean`                            | `false`        | Disable the select               |
| `clearable`        | `boolean`                            | `true`         | Show clear button                |
| `loadingMessage`   | `string`                             | `'Loading...'` | Loading state message            |
| `noResultsMessage` | `string`                             | `'No results'` | No results message               |
| `renderOption`     | `(option: any) => React.ReactNode`   | `undefined`    | Custom option renderer           |
| `className`        | `string`                             | `undefined`    | Custom CSS class                 |

### API Response Format

```json
{
  "data": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ]
}
```

---

## RangeSlider

Dual-handle range slider for selecting min/max values.

### Basic Example

```tsx
import { RangeSlider } from "jithvar-ui";
import { useState } from "react";

const BasicRangeSliderExample = () => {
  const [range, setRange] = useState({ min: 25, max: 75 });

  return <RangeSlider min={0} max={100} value={range} onChange={setRange} />;
};
```

### Advanced Example

```tsx
import { RangeSlider } from "jithvar-ui";
import { useState } from "react";

const AdvancedRangeSliderExample = () => {
  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [ageRange, setAgeRange] = useState({ min: 25, max: 45 });
  const [scoreRange, setScoreRange] = useState({ min: 0, max: 100 });

  return (
    <div>
      {/* Price range with currency formatting */}
      <div>
        <label>Price Range</label>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
          formatLabel={(value) => `$${value}`}
          showTooltip={true}
          className="price-slider"
        />
        <p>
          Selected: ${priceRange.min} - ${priceRange.max}
        </p>
      </div>

      {/* Age range with custom styling */}
      <div>
        <label>Age Range</label>
        <RangeSlider
          min={18}
          max={65}
          step={1}
          value={ageRange}
          onChange={setAgeRange}
          formatLabel={(value) => `${value} yrs`}
          showTooltip={true}
          trackColor="#3b82f6"
          handleColor="#2563eb"
        />
      </div>

      {/* Score with percentage */}
      <div>
        <label>Score Range</label>
        <RangeSlider
          min={0}
          max={100}
          step={5}
          value={scoreRange}
          onChange={setScoreRange}
          formatLabel={(value) => `${value}%`}
          showTooltip={true}
          disabled={false}
        />
      </div>
    </div>
  );
};
```

### RangeSlider Props Reference

| Prop          | Type                                            | Default      | Description          |
| ------------- | ----------------------------------------------- | ------------ | -------------------- |
| `min`         | `number`                                        | **required** | Minimum value        |
| `max`         | `number`                                        | **required** | Maximum value        |
| `value`       | `{ min: number, max: number }`                  | **required** | Selected range       |
| `onChange`    | `(range: { min: number, max: number }) => void` | **required** | Change handler       |
| `step`        | `number`                                        | `1`          | Value increment step |
| `formatLabel` | `(value: number) => string`                     | `undefined`  | Label formatter      |
| `showTooltip` | `boolean`                                       | `true`       | Show value tooltips  |
| `disabled`    | `boolean`                                       | `false`      | Disable the slider   |
| `trackColor`  | `string`                                        | `'#3b82f6'`  | Active track color   |
| `handleColor` | `string`                                        | `'#2563eb'`  | Handle color         |
| `className`   | `string`                                        | `undefined`  | Custom CSS class     |

---

## Styling & Theming

All components are styled with CSS variables for easy customization.

### Global Theme Variables

```css
:root {
  /* Colors */
  --jv-primary: #3b82f6;
  --jv-secondary: #64748b;
  --jv-danger: #ef4444;
  --jv-success: #10b981;
  --jv-warning: #f59e0b;
  --jv-info: #06b6d4;

  /* Backgrounds */
  --jv-bg-primary: #ffffff;
  --jv-bg-secondary: #f9fafb;
  --jv-bg-hover: #f3f4f6;

  /* Text */
  --jv-text-primary: #111827;
  --jv-text-secondary: #6b7280;
  --jv-text-disabled: #9ca3af;

  /* Borders */
  --jv-border-color: #e5e7eb;
  --jv-border-radius: 6px;

  /* Shadows */
  --jv-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --jv-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --jv-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --jv-transition: all 0.2s ease;
}
```

### Component-Specific Variables

#### JTable

```css
.jv-jtable {
  --jv-table-header-bg: #f9fafb;
  --jv-table-row-hover: #f3f4f6;
  --jv-table-border: #e5e7eb;
  --jv-table-striped: #fafafa;
}
```

#### DatePicker

```css
.jv-datepicker {
  --jv-datepicker-bg: #ffffff;
  --jv-datepicker-selected-bg: #3b82f6;
  --jv-datepicker-selected-text: #ffffff;
  --jv-datepicker-hover-bg: #f3f4f6;
}
```

#### SearchableSelect

```css
.jv-searchable-select {
  --jv-select-bg: #ffffff;
  --jv-select-border: #e5e7eb;
  --jv-select-hover: #f3f4f6;
  --jv-select-selected: #3b82f6;
}
```

#### RangeSlider

```css
.jv-range-slider {
  --jv-slider-track: #e5e7eb;
  --jv-slider-track-active: #3b82f6;
  --jv-slider-handle: #2563eb;
  --jv-slider-tooltip-bg: #111827;
}
```

### CSS Class Prefix

All CSS classes are prefixed with `jv-` to avoid conflicts:

- `.jv-jtable`
- `.jv-datepicker`
- `.jv-daterangepicker`
- `.jv-searchable-select`
- `.jv-range-slider`

### Custom Styling Examples

```css
/* Custom table theme */
.my-custom-table {
  --jv-primary: #8b5cf6;
  --jv-table-header-bg: #f5f3ff;
  border-radius: 12px;
  overflow: hidden;
}

/* Dark mode */
.dark-theme {
  --jv-bg-primary: #1f2937;
  --jv-bg-secondary: #111827;
  --jv-text-primary: #f9fafb;
  --jv-text-secondary: #d1d5db;
  --jv-border-color: #374151;
}

/* Custom action buttons */
.jv-jtable-action-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}
```

---

## Best Practices

### 1. **Server-Side Operations**

Always implement server-side filtering, sorting, and pagination for large datasets.

### 2. **Type Safety**

Use TypeScript interfaces for type safety:

```tsx
import { JTableColumn } from "jithvar-ui";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: JTableColumn[] = [
  { key: "id", label: "ID", type: "number" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];
```

### 3. **Performance**

- Use `React.memo` for custom renderers
- Implement proper key props
- Avoid inline functions in render methods

### 4. **Accessibility**

All components include proper ARIA attributes and keyboard navigation.

### 5. **Error Handling**

Implement proper error handling for API calls:

```tsx
<JTable
  columns={columns}
  apiUrl="/api/users"
  onError={(error) => {
    console.error("Table error:", error);
    showNotification("Failed to load data");
  }}
/>
```

---

## Support

For issues, feature requests, or questions:

- GitHub: [jithvar-ui](https://github.com/yourusername/jithvar-ui)
- Email: support@example.com
- Documentation: [docs.jithvar-ui.com](https://docs.jithvar-ui.com)

---

**Version**: 1.0.0  
**Last Updated**: November 2025
