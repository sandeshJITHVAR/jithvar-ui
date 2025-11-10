<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Jithvar UI Component Library

This is a React/Next.js UI component library project built with TypeScript.

## Project Structure

- `src/` - Source code for components
- `demo/` - Demo application to showcase components
- `dist/` - Built library output

## Code Style

- Use TypeScript for all code
- Follow React best practices and hooks
- Use CSS modules or scoped CSS for styling
- Prefix all CSS classes with `jv-` to avoid conflicts
- Components should be fully typed with TypeScript interfaces

## Components

### DateRangePicker

Date range selection with predefined ranges like Yesterday, Last 7/15/30 Days, Current/Last Month, Last 3 Months, and custom selection. Highlights all dates in the selected range.

### DatePicker

Single date selection component with optional min/max date constraints.

### SearchableSelect

Searchable dropdown with:

- Single/multiple selection support
- Static data or API-based data
- Server-side search (requires 3+ characters for API mode)
- Custom option rendering

### RangeSlider

Dual-handle range slider for selecting min/max values with:

- Customizable min/max/step
- Tooltip display
- Custom label formatting

### DataTable

Advanced data table with:

- Server-side pagination, sorting, and filtering
- Universal search across all columns
- Individual column search/filters
- Date range filters for date columns
- Range sliders for number columns
- Row selection with checkbox
- URL state management (shareable filtered results)
- All operations use GET method with query parameters
