# Floating Actions - Quick Reference Guide

## What are Floating Actions?

Floating actions are icon-based action buttons that appear near the mouse pointer when you hover over a table row. They provide a clean, intuitive way to perform actions without cluttering the table with permanent action columns.

## Basic Setup

```typescript
import { JTable, JTableFloatingConfig } from "jithvar-ui";

const floatingActions: JTableFloatingConfig = {
  enabled: true,
  actions: [
    {
      type: "view",
      onClick: (row) => console.log("View", row),
    },
    {
      type: "edit",
      onClick: (row) => console.log("Edit", row),
    },
    {
      type: "delete",
      onClick: (row) => console.log("Delete", row),
    },
  ],
};

<JTable columns={columns} apiUrl="..." floatingActions={floatingActions} />;
```

## Built-in Action Types

| Type     | Icon   | Default Tooltip | Use Case                   |
| -------- | ------ | --------------- | -------------------------- |
| `copy`   | 📋     | Copy            | Copy row data to clipboard |
| `view`   | 👁️     | View Details    | Navigate to detail page    |
| `edit`   | ✏️     | Edit            | Open edit form/modal       |
| `delete` | 🗑️     | Delete          | Delete the row             |
| `call`   | 📞     | Call            | Initiate phone call        |
| `email`  | ✉️     | Send Email      | Open email client          |
| `visit`  | 🔗     | Visit Link      | Open URL in new tab        |
| `custom` | Custom | Action          | Your custom action         |

## Field-Based Actions

Some actions require specific fields in your data:

### Call Action (requires phone field)

```typescript
const floatingActions: JTableFloatingConfig = {
  enabled: true,
  phoneField: "phone", // or 'mobile', 'phoneNumber', etc.
  actions: [
    {
      type: "call",
      onClick: (row) => (window.location.href = `tel:${row.phone}`),
    },
  ],
};
```

**Note:** Call button only shows if the phone field has a value.

### Email Action (requires email field)

```typescript
const floatingActions: JTableFloatingConfig = {
  enabled: true,
  emailField: "email",
  actions: [
    {
      type: "email",
      onClick: (row) => (window.location.href = `mailto:${row.email}`),
    },
  ],
};
```

**Note:** Email button only shows if the email field has a value.

### Visit Action (requires URL field)

```typescript
const floatingActions: JTableFloatingConfig = {
  enabled: true,
  urlField: "website", // or 'url', 'link', etc.
  actions: [
    {
      type: "visit",
      onClick: (row) => window.open(row.website, "_blank"),
    },
  ],
};
```

**Note:** Visit button only shows if the URL field has a value.

## Custom Icons and Tooltips

```typescript
{
  type: 'custom',
  icon: '⭐',  // Any emoji or React component
  tooltip: 'Add to Favorites',
  onClick: (row) => addToFavorites(row),
}
```

You can also override built-in icons:

```typescript
{
  type: 'delete',
  icon: '❌',  // Custom icon instead of 🗑️
  tooltip: 'Remove Item',  // Custom tooltip instead of "Delete"
  onClick: (row) => removeItem(row),
}
```

## Conditional Actions

### Conditional Visibility

```typescript
{
  type: 'delete',
  onClick: (row) => deleteRow(row),
  visible: (row) => row.canDelete,  // Only show if user can delete
}
```

### Conditional Disabled State

```typescript
{
  type: 'edit',
  onClick: (row) => editRow(row),
  disabled: (row) => row.isLocked,  // Disable if row is locked
}
```

## Complete Example

```typescript
const floatingActions: JTableFloatingConfig = {
  enabled: true,
  phoneField: "phone",
  emailField: "email",
  urlField: "website",
  actions: [
    // Copy row data
    {
      type: "copy",
      onClick: (row) => {
        navigator.clipboard.writeText(JSON.stringify(row));
        toast.success("Copied to clipboard!");
      },
    },

    // View details
    {
      type: "view",
      onClick: (row) => navigate(`/users/${row.id}`),
    },

    // Edit (only if editable)
    {
      type: "edit",
      onClick: (row) => openEditModal(row),
      visible: (row) => row.editable,
    },

    // Delete (only if can delete)
    {
      type: "delete",
      onClick: async (row) => {
        if (confirm(`Delete ${row.name}?`)) {
          await deleteUser(row.id);
          refetch();
        }
      },
      visible: (row) => row.canDelete,
    },

    // Call (only if phone exists)
    {
      type: "call",
      onClick: (row) => (window.location.href = `tel:${row.phone}`),
    },

    // Email (only if email exists)
    {
      type: "email",
      onClick: (row) => (window.location.href = `mailto:${row.email}`),
    },

    // Visit website (only if website exists)
    {
      type: "visit",
      onClick: (row) => window.open(row.website, "_blank"),
    },

    // Custom: Add to favorites
    {
      type: "custom",
      icon: (row) => (row.isFavorite ? "⭐" : "☆"), // Dynamic icon
      tooltip: "Toggle Favorite",
      onClick: (row) => toggleFavorite(row.id),
    },

    // Custom: Download report
    {
      type: "custom",
      icon: "📥",
      tooltip: "Download Report",
      onClick: (row) => downloadReport(row.id),
      disabled: (row) => !row.hasReport,
    },
  ],
};
```

## Best Practices

### ✅ Do's

- Use tooltips for all actions (required for accessibility)
- Keep actions to 3-7 items for best UX
- Use conditional visibility to show relevant actions only
- Use meaningful icons that users recognize
- Handle errors gracefully in onClick handlers
- Provide user feedback (toasts, confirmations)

### ❌ Don'ts

- Don't add too many actions (menu gets crowded)
- Don't use text labels (icons only with tooltips)
- Don't forget to check if required fields exist
- Don't perform destructive actions without confirmation
- Don't use confusing or ambiguous icons

## Common Patterns

### Pattern 1: CRUD Operations

```typescript
actions: [
  { type: "view", onClick: viewRow },
  { type: "edit", onClick: editRow, visible: canEdit },
  { type: "delete", onClick: deleteRow, visible: canDelete },
];
```

### Pattern 2: Communication

```typescript
actions: [
  { type: "call", onClick: call },
  { type: "email", onClick: email },
  { type: "custom", icon: "💬", tooltip: "Message", onClick: message },
];
```

### Pattern 3: Data Export

```typescript
actions: [
  { type: "copy", onClick: copyRow },
  { type: "custom", icon: "📥", tooltip: "Export CSV", onClick: exportCSV },
  { type: "custom", icon: "📄", tooltip: "Generate PDF", onClick: generatePDF },
];
```

## Styling Customization

Override default styles using CSS:

```css
/* Change floating menu background */
.jv-jtable-floating-actions {
  background: #1f2937;
  border-color: #374151;
}

/* Change button style */
.jv-jtable-floating-action-btn {
  background: #374151;
  color: white;
}

.jv-jtable-floating-action-btn:hover {
  background: #4b5563;
  transform: scale(1.15);
}

/* Change button size */
.jv-jtable-floating-action-btn {
  width: 36px;
  height: 36px;
  font-size: 16px;
}
```

## Troubleshooting

### Actions not appearing?

1. Check `enabled: true` is set
2. Verify actions array is not empty
3. Check `visible` conditions aren't hiding all actions
4. Ensure row has required fields (phone, email, url)

### Actions appearing in wrong position?

- Floating menu follows mouse pointer
- Uses `position: fixed` with transform
- Check for CSS conflicts with z-index

### Actions not clicking?

1. Verify onClick handler is defined
2. Check for event.stopPropagation() conflicts
3. Ensure button isn't disabled

### Performance issues?

- Limit actions to 5-7 items
- Use conditional visibility to reduce rendered buttons
- Avoid heavy computations in onClick handlers

## TypeScript Types

```typescript
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
  icon?: React.ReactNode | string;
  tooltip?: string;
  onClick: (row: any, index: number) => void;
  visible?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
}

interface JTableFloatingConfig {
  enabled?: boolean;
  actions?: JTableFloatingAction[];
  phoneField?: string;
  emailField?: string;
  urlField?: string;
}
```

## Migration from Column Actions

If you're migrating from traditional column actions:

**Before:**

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

**After (Floating):**

```typescript
floatingActions={{
  enabled: true,
  actions: [
    {
      type: 'view',  // Built-in type instead of custom icon
      onClick: viewRow,  // Same handler
      // tooltip auto-generated
    }
  ]
}}
```

You can use both simultaneously if needed!

---

**Quick Tip:** Start with basic actions (view, edit, delete) and add more as needed. The floating menu design scales well from 2-7 actions.
