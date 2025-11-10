# Jithvar UI

A modern, feature-rich React/Next.js UI component library built with TypeScript. Designed to provide beautiful, accessible, and highly configurable components for your applications.

## 🎨 Features

- 🎯 **TypeScript First** - Full TypeScript support with complete type definitions
- 📦 **Tree-shakeable** - Import only what you need
- 🎨 **Customizable** - CSS classes prefixed with `jv-` for easy customization
- ♿ **Accessible** - Built with accessibility in mind
- 📱 **Responsive** - Works seamlessly on all devices
- ⚡ **Lightweight** - Minimal dependencies
- ✨ **Floating Actions** - NEW! Hover-activated action buttons for clean table UIs

## 📦 Installation

```bash
npm install jithvar-ui
```

or

```bash
yarn add jithvar-ui
```

## 🚀 Components

### DateRangePicker

A powerful date range picker with predefined ranges and custom selection.

```tsx
import { DateRangePicker } from "jithvar-ui";

function MyComponent() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  return <DateRangePicker value={dateRange} onChange={setDateRange} />;
}
```

**Features:**

- Predefined ranges (Yesterday, Last 7/15/30 Days, etc.)
- Custom date selection
- Dual calendar view
- Highlights dates in range

### DatePicker

Single date selection with optional constraints.

```tsx
import { DatePicker } from "jithvar-ui";

function MyComponent() {
  const [date, setDate] = useState(null);

  return (
    <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
  );
}
```

**Features:**

- Min/max date constraints
- Custom placeholder
- Disabled state support

### SearchableSelect

Powerful searchable dropdown with API support.

```tsx
import { SearchableSelect } from "jithvar-ui";

// Static options
function StaticExample() {
  const [value, setValue] = useState("");
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  return (
    <SearchableSelect value={value} onChange={setValue} options={options} />
  );
}

// API-based with server-side search
function APIExample() {
  const [value, setValue] = useState("");

  return (
    <SearchableSelect
      value={value}
      onChange={setValue}
      apiUrl="https://api.example.com/search"
      apiSearchParam="q"
      minSearchLength={3}
      labelKey="name"
      valueKey="id"
    />
  );
}
```

**Features:**

- Single and multiple selection modes
- Static data or API-based
- Server-side search (configurable min characters)
- Custom option rendering
- Debounced search

### RangeSlider

Dual-handle range slider for selecting min/max values.

```tsx
import { RangeSlider } from "jithvar-ui";

function MyComponent() {
  const [range, setRange] = useState([20, 80]);

  return (
    <RangeSlider
      min={0}
      max={100}
      value={range}
      onChange={setRange}
      showLabels={true}
      showTooltip={true}
      formatLabel={(val) => `$${val}`}
    />
  );
}
```

**Features:**

- Customizable min/max/step
- Labels and tooltips
- Custom label formatting
- Smooth dragging experience

### JTable

Advanced data table with server-side operations, smart filters, customizable actions, and URL state management.

```tsx
import { JTable, JTableColumn, JTableAction } from "jithvar-ui";

function MyComponent() {
  const columns: JTableColumn[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      filterable: true,
      type: "number",
      visible: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      filterable: true,
      searchable: true,
      type: "text",
    },
    {
      key: "created",
      label: "Created",
      sortable: true,
      filterable: true,
      type: "date",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <span className={`status-${value}`}>{value}</span>,
    },
  ];

  const actions: JTableAction[] = [
    {
      label: "Edit",
      icon: "✏️",
      onClick: (row) => handleEdit(row),
      variant: "primary",
      tooltip: "Edit record",
    },
    {
      label: "Delete",
      icon: "🗑️",
      onClick: (row) => handleDelete(row),
      variant: "danger",
      visible: (row) => row.canDelete,
    },
  ];

  return (
    <JTable
      columns={columns}
      actions={actions}
      apiUrl="https://api.example.com/data"
      enableUniversalSearch={true}
      enableColumnSearch={true}
      enableColumnToggle={true}
      enableSelection={true}
      selectionMode="multiple"
      enablePagination={true}
      pageSizeOptions={[10, 25, 50, 100]}
      defaultPageSize={10}
      searchMode="like"
      striped={true}
      hover={true}
      onSelectionChange={(rows) => console.log("Selected:", rows)}
    />
  );
}
```

**Features:**

- **✨ Floating Actions (NEW!)** - Hover-activated action buttons that appear near mouse pointer
- **Smart Filters** - Click filter icon to open popup filters (date range picker for dates, range slider for numbers, text search with modes)
- **Column Visibility** - Show/hide columns dynamically with column toggle dropdown
- **Custom Actions** - Add action buttons with custom variants, icons, tooltips, and conditional visibility
- **Built-in Actions** - copy, view, edit, delete, call, email, visit with auto icons & tooltips
- **Row Selection** - Single or multiple selection modes with checkbox/radio
- **Search Modes** - Supports 'like', 'exact', 'startsWith', 'endsWith' for text filtering
- **Server-side Operations** - Pagination, sorting, and filtering handled by your API
- **URL State Management** - All filters, sorts, and pagination stored in URL for sharing
- **Customizable Styling** - Striped rows, hover effects, borders, compact mode, sticky headers
- **Row Events** - onClick, onDoubleClick handlers
- **Custom Rendering** - Custom cell rendering, header rendering, and row class names

**Floating Actions Example:**

```tsx
// NEW! Floating actions appear on row hover near mouse pointer
<JTable
  columns={columns}
  apiUrl="https://api.example.com/users"
  floatingActions={{
    enabled: true,
    phoneField: "phone", // Required for 'call' action
    emailField: "email", // Required for 'email' action
    urlField: "website", // Required for 'visit' action
    actions: [
      {
        type: "copy",
        onClick: (row) => navigator.clipboard.writeText(JSON.stringify(row)),
      },
      {
        type: "view",
        onClick: (row) => navigate(`/users/${row.id}`),
      },
      {
        type: "edit",
        onClick: (row) => openEditModal(row),
        visible: (row) => row.editable, // Conditional visibility
      },
      {
        type: "delete",
        onClick: (row) => deleteUser(row.id),
        disabled: (row) => row.isProtected, // Conditional disable
      },
      {
        type: "call", // Only shows if phone field has value
        onClick: (row) => (window.location.href = `tel:${row.phone}`),
      },
      {
        type: "email", // Only shows if email field has value
        onClick: (row) => (window.location.href = `mailto:${row.email}`),
      },
      {
        type: "visit", // Only shows if URL field has value
        onClick: (row) => window.open(row.website, "_blank"),
      },
      {
        type: "custom",
        icon: "⭐",
        tooltip: "Add to Favorites",
        onClick: (row) => addToFavorites(row.id),
      },
    ],
  }}
/>
```

See [FLOATING_ACTIONS_GUIDE.md](./FLOATING_ACTIONS_GUIDE.md) for complete documentation.

**API Integration:**
Your API should handle these query parameters:

- `page` - Current page number
- `pageSize` - Records per page
- `sortColumn` - Column to sort by
- `sortDirection` - `asc` or `desc`
- `search` - Universal search term
- `searchMode` - Search mode: `like`, `exact`, `startsWith`, `endsWith`
- `visibleColumns` - Comma-separated list of visible column keys
- `[columnKey]` - Individual column text filters
- `[columnKey]_start`, `[columnKey]_end` - Date range filters
- `[columnKey]_min`, `[columnKey]_max` - Number range filters

Expected API response format:

```json
{
  "data": [...],
  "total": 100
}
```

**Action Configuration:**
Actions support extensive customization:

```tsx
{
  label: 'Action Label',       // Button text
  icon: '🎯',                   // Icon (emoji or React element)
  onClick: (row, index) => {}, // Click handler
  variant: 'primary',           // Style variant
  tooltip: 'Tooltip text',      // Hover tooltip
  visible: (row) => true,       // Conditional visibility
  disabled: (row) => false,     // Conditional disabled state
  className: 'custom-class'     // Custom CSS class
}
```

Supported action variants: `primary`, `secondary`, `danger`, `success`, `warning`

## 🎨 Customization

All components use CSS classes prefixed with `jv-` which you can override in your own CSS:

```css
/* Customize date picker colors */
.jv-calendar-day-selected {
  background: #your-color !important;
}

/* Customize table styles */
.jv-table thead {
  background: #your-bg-color;
}
```

## 📖 TypeScript Support

All components are fully typed. Import types as needed:

```tsx
import {
  DateRange,
  Option,
  JTableColumn,
  JTableAction,
  JTableProps,
  FilterState,
} from "jithvar-ui";
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run demo
npm run demo

# Watch mode for development
npm run dev
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
