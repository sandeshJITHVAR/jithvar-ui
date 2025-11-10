# 🚀 Quick Reference - JTable Features

## Floating Actions (Hover-based)

### Basic Setup

```typescript
<JTable
  floatingActions={{
    enabled: true,
    phoneField: "phone",
    emailField: "email",
    actions: [
      { type: "copy", variant: "info" },
      { type: "view", variant: "primary" },
      { type: "edit", variant: "warning" },
      { type: "delete", variant: "danger" },
      { type: "call", variant: "success" }, // Auto tel: link
      { type: "email", variant: "secondary" }, // Auto mailto: link
    ],
  }}
/>
```

### Behavior

- **Position**: Horizontal row below mouse cursor
- **Movement**: Follows cursor as you move
- **Persistence**: Stays 300ms after mouse leaves
- **Links**: Auto `mailto:` for email, `tel:` for phone

---

## Bulk Actions (Selection-based)

### Basic Setup

```typescript
<JTable
  enableSelection={true}
  bulkActions={[
    {
      label: "Export",
      icon: "📥",
      variant: "primary",
      onClick: (selectedRows) => exportData(selectedRows),
    },
    {
      label: "Delete",
      icon: "🗑️",
      variant: "danger",
      onClick: (selectedRows) => deleteRows(selectedRows),
    },
  ]}
/>
```

### Features

- Appears when rows are selected
- Shows "X rows selected" count
- Passes selected row data to onClick
- Supports conditional disable

---

## Selection Configuration

### Hide Checkbox Column

```typescript
<JTable
  enableSelection={false} // Removes checkbox column entirely
/>
```

### Single Selection (Radio Buttons)

```typescript
<JTable
  enableSelection={true}
  selectionMode="single" // Radio buttons instead of checkboxes
/>
```

### Multiple Selection (Default)

```typescript
<JTable
  enableSelection={true}
  selectionMode="multiple" // Checkboxes
  onSelectionChange={(rows) => console.log("Selected:", rows)}
/>
```

---

## Action Button Variants

### Available Variants

- `primary` → Blue icons
- `secondary` → Gray icons
- `danger` → Red icons
- `success` → Green icons
- `warning` → Orange icons
- `info` → Cyan icons
- `ghost` → Light gray icons

### Styling

- **Background**: Transparent (icon colors only)
- **Hover**: Light tint (no dark backgrounds)
- **Size**: 36x36px (floating), 40x40px (floating hover)

---

## Complete Example

```typescript
import { JTable } from "jithvar-ui";

<JTable
  // Data
  columns={columns}
  apiUrl="/api/users"
  // Selection
  enableSelection={true}
  selectionMode="multiple"
  onSelectionChange={(rows) => console.log(rows)}
  // Bulk Actions
  bulkActions={[
    {
      label: "Export",
      icon: "📥",
      variant: "primary",
      onClick: (rows) => exportRows(rows),
      tooltip: "Export selected rows",
    },
    {
      label: "Delete",
      icon: "🗑️",
      variant: "danger",
      onClick: (rows) => deleteRows(rows),
      disabled: (rows) => rows.length === 0,
    },
  ]}
  // Floating Actions
  floatingActions={{
    enabled: true,
    phoneField: "phone",
    emailField: "email",
    actions: [
      { type: "copy", variant: "info", onClick: (row) => copy(row) },
      { type: "view", variant: "primary", onClick: (row) => view(row) },
      { type: "edit", variant: "warning", onClick: (row) => edit(row) },
      { type: "delete", variant: "danger", onClick: (row) => del(row) },
      { type: "call", variant: "success", onClick: (row) => call(row) },
      { type: "email", variant: "secondary", onClick: (row) => email(row) },
    ],
  }}
  // Search & Filter
  enableUniversalSearch={true}
  enableColumnSearch={true}
  // Pagination
  enablePagination={true}
  defaultPageSize={20}
  // Appearance
  striped={true}
  hover={true}
/>;
```

---

## Props Quick Reference

| Prop                | Type                     | Default      | Description               |
| ------------------- | ------------------------ | ------------ | ------------------------- |
| `enableSelection`   | `boolean`                | `true`       | Show/hide checkbox column |
| `selectionMode`     | `'single' \| 'multiple'` | `'multiple'` | Radio or checkbox         |
| `onSelectionChange` | `(rows: any[]) => void`  | -            | Selection callback        |
| `bulkActions`       | `JTableBulkAction[]`     | `[]`         | Bulk action buttons       |
| `floatingActions`   | `JTableFloatingConfig`   | -            | Floating action config    |
| `actions`           | `JTableAction[]`         | `[]`         | Column action buttons     |

---

## Testing

### Demo Server

```bash
cd demo && npx vite
# Open http://localhost:5173/
```

### Test Floating Actions

1. Hover over any row
2. Actions appear below cursor (horizontal)
3. Move mouse → Actions follow
4. Click email/phone → Opens mailto:/tel:

### Test Bulk Actions

1. Select multiple rows (checkboxes)
2. Bulk actions bar appears above table
3. Shows "X rows selected"
4. Click action → Receives selected rows

### Test Selection Config

```typescript
// Test 1: Hide checkbox
enableSelection={false}

// Test 2: Single selection
enableSelection={true}
selectionMode="single"

// Test 3: Track selection
onSelectionChange={(rows) => console.log(rows)}
```

---

**Status**: ✅ All features working  
**Version**: 1.0.0  
**Updated**: November 10, 2025
