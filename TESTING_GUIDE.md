# 🧪 Floating Actions Testing Guide

## How to Test the New Features

### 1. **Cell-Level Hover Detection**

**Test Steps:**

1. Navigate to JTable Demo page
2. Hover over any cell in the Name, Email, or Phone columns
3. **Expected**: Floating actions appear at the bottom of that specific cell
4. Move to another cell
5. **Expected**: Floating actions follow to the new cell

**❌ What NOT to test:**

- Don't hover over the checkbox column - no floating actions should appear
- Don't hover over the ID column - no floating actions should appear
- Don't hover over the Actions column - no floating actions should appear

### 2. **Copy Cell Value (Not Row)**

**Test Steps:**

1. Hover over a Name cell (e.g., "John Smith")
2. Click the Copy button (📋 icon)
3. Paste in a text editor (Cmd+V / Ctrl+V)
4. **Expected**: You should see just the name, NOT a JSON object
5. Try with Email cell
6. **Expected**: You should see just the email address

**Before Fix:**

```
{"id":1,"name":"John Smith","email":"john.smith@example.com",...}
```

**After Fix:**

```
John Smith
```

### 3. **Name + Designation Display**

**Visual Check:**

1. Look at the Name column in the table
2. **Expected**: You should see TWO lines per row:
   - Line 1: Bold name (e.g., "John Smith")
   - Line 2: Smaller gray text with job title (e.g., "Software Engineer")

**Example:**

```
John Smith
Software Engineer

Jane Doe
Senior Developer

Michael Brown
Team Lead
```

### 4. **Dual Field Search**

**Test Steps:**

1. Click the filter icon in the Name column header
2. Type "engineer" (lowercase)
3. **Expected**: All rows with "Engineer" in designation should appear
4. Clear filter
5. Type a person's name (e.g., "john")
6. **Expected**: All Johns should appear
7. Type "manager"
8. **Expected**: All people with Manager designation should appear

### 5. **Universal Search with Designation**

**Test Steps:**

1. Use the universal search box at the top
2. Type "Senior Developer"
3. **Expected**: All Senior Developers should be shown
4. Clear and type "Team Lead"
5. **Expected**: All Team Leads should be shown

### 6. **Simultaneous Actions**

**Visual Check:**

1. Observe the table - you should see:
   - Regular action buttons in the Actions column (👁️ ✏️ 🗑️)
   - Floating action buttons when hovering cells (📋 📞 ✉️)
2. Both should work independently
3. **Expected**: No conflicts, both systems active

### 7. **Positioning Test**

**Test Steps:**

1. Hover over a short cell (like Age)
2. **Expected**: Floating actions appear at bottom center of cell
3. Hover over a long cell (like Email)
4. **Expected**: Floating actions appear at bottom center of cell
5. **Expected**: Actions don't follow your cursor - they stay at cell bottom

### 8. **Smooth Transition**

**Test Steps:**

1. Hover over a cell (floating actions appear)
2. Quickly move cursor away
3. Move cursor back to floating actions within 300ms
4. **Expected**: Floating actions stay visible
5. Move cursor away and wait
6. **Expected**: Floating actions disappear after 300ms

## 🎯 Quick Test Matrix

| Test Case             | Action                         | Expected Result                   | Status |
| --------------------- | ------------------------------ | --------------------------------- | ------ |
| Hover Name Cell       | Mouse over                     | Floating actions appear at bottom | ⬜     |
| Hover Email Cell      | Mouse over                     | Floating actions appear at bottom | ⬜     |
| Hover Checkbox        | Mouse over                     | NO floating actions               | ⬜     |
| Hover ID              | Mouse over                     | NO floating actions               | ⬜     |
| Hover Actions Column  | Mouse over                     | NO floating actions               | ⬜     |
| Copy Name             | Click copy on name cell        | Only name copied                  | ⬜     |
| Copy Email            | Click copy on email cell       | Only email copied                 | ⬜     |
| View Name Column      | Visual check                   | Name + Designation in 2 lines     | ⬜     |
| Filter by Name        | Type name in filter            | Matches found                     | ⬜     |
| Filter by Designation | Type "engineer" in name filter | Engineers shown                   | ⬜     |
| Universal Search      | Type "Manager"                 | All managers shown                | ⬜     |
| Both Action Systems   | Visual check                   | Both visible and working          | ⬜     |
| Smooth Hover          | Quick mouse movements          | 300ms delay working               | ⬜     |

## 🐛 Common Issues & Solutions

### Issue: Floating actions appear on checkbox column

**Solution**: Check that `handleCellMouseEnter` excludes the column properly

### Issue: Copy button copies JSON object

**Solution**: Verify `cellValue` is being passed to copy action, not `row`

### Issue: Can't see designation

**Solution**: Check mock data has `designation` field populated

### Issue: Name filter doesn't find designations

**Solution**: Verify mockAPI filters both `name` and `designation` fields

### Issue: Floating actions and action column conflict

**Solution**: Removed the condition that disabled floating actions when action column exists

## 📸 Visual Examples

### Name Column Layout

```
┌─────────────────────────┐
│ John Smith             │  ← Bold, larger
│ Software Engineer      │  ← Gray, smaller
└─────────────────────────┘
```

### Floating Actions Position

```
┌─────────────────────────┐
│                         │
│    john.smith@...       │  ← Cell content
│                         │
│    [📋] [📞] [✉️]      │  ← Bottom center
└─────────────────────────┘
```

## ✅ Success Criteria

All tests pass when:

- ✅ Floating actions only appear on data columns
- ✅ Copy button copies single cell value
- ✅ Name column shows name AND designation
- ✅ Name filter searches both fields
- ✅ Universal search includes designation
- ✅ Both action systems work together
- ✅ Positioning is consistent (cell bottom center)
- ✅ Hover behavior is smooth (300ms delay)

---

**Test in browser at**: http://localhost:5173/  
**Navigate to**: JTable Demo page
