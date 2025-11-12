# 🚀 Jithvar UI v1.1.0-beta.1 Release Notes

## 🎉 What's New

### 🆕 Enhanced JTable Component

We've significantly improved the JTable component based on user feedback and real-world usage:

#### 1. **Custom API Parameter Mapping** 🔧

The biggest new feature! You can now map JTable's internal parameters to your API's expected parameter names.

**Before (limited to JTable's parameter names):**

```tsx
// Your API had to accept: ?page=1&pageSize=25&sortColumn=name&search=john
<JTable columns={columns} apiUrl="/api/users" />
```

**After (flexible parameter mapping):**

```tsx
// Now works with any API parameter format!
<JTable
  columns={columns}
  apiUrl="/api/users"
  apiParams={{
    page: "offset", // Maps to ?offset=1
    pageSize: "limit", // Maps to ?limit=25
    sortColumn: "sort_by", // Maps to ?sort_by=name
    universalSearch: "q", // Maps to ?q=john
  }}
/>
// Result: /api/users?offset=1&limit=25&sort_by=name&q=john
```

**Popular API Format Examples:**

```tsx
// Laravel/PHP APIs
const laravelParams = {
  page: "page",
  pageSize: "per_page",
  sortColumn: "sort",
  sortDirection: "direction",
  universalSearch: "search",
};

// REST APIs
const restParams = {
  page: "offset",
  pageSize: "limit",
  sortColumn: "sort_by",
  sortDirection: "order",
  universalSearch: "q",
};

// GraphQL APIs
const graphqlParams = {
  page: "pageNumber",
  pageSize: "recordsPerPage",
  sortColumn: "orderBy",
  sortDirection: "sortDirection",
  universalSearch: "filter",
};
```

#### 2. **Built-in Skeleton Loading** ⚡

No more external skeleton components needed! JTable now handles loading states internally.

**Before:**

```tsx
// You had to manage loading states manually
{
  loading ? (
    <SkeletonLoader rows={10} />
  ) : (
    <JTable columns={columns} apiUrl="/api/users" />
  );
}
```

**After:**

```tsx
// Skeleton loading is automatic!
<JTable columns={columns} apiUrl="/api/users" />
// Shows beautiful skeleton rows while loading data
```

#### 3. **Improved Floating Actions** 🎯

Better positioning, smoother animations, and more reliable hover detection.

```tsx
<JTable
  columns={columns}
  apiUrl="/api/contacts"
  floatingActions={{
    enabled: true,
    actions: [
      {
        type: "copy",
        onClick: (row) => navigator.clipboard.writeText(row.name),
      },
      { type: "call", onClick: (row) => window.open(`tel:${row.phone}`) },
      { type: "email", onClick: (row) => window.open(`mailto:${row.email}`) },
    ],
    phoneField: "phone",
    emailField: "email",
  }}
/>
```

#### 4. **Cleaner Filter Interface** ✨

Removed the search mode indicator for a cleaner, less cluttered filter experience.

### 📚 Enhanced Documentation

#### Real-world Examples

We've added comprehensive examples that you can copy and use immediately:

- **📊 Complete Dashboard** - Charts + Table + Filters
- **📝 Contact Form** - All form inputs with validation
- **👥 User Management** - Full CRUD operations with JTable

#### Framework-Specific Guides

Detailed setup instructions for:

- ✅ Create React App (CRA)
- ✅ Next.js 13/14/15 (App Router)
- ✅ Next.js (Pages Router)
- ✅ Vite + React
- ✅ TypeScript configuration

#### Installation Improvements

- Tree-shaking bundle size reference
- Peer dependency management
- Troubleshooting common issues
- SSR/SSG compatibility guide

## 🔄 Migration from v1.0.x

**✅ Fully Backward Compatible!** No breaking changes.

Your existing code will continue to work exactly as before. The new features are additive.

**Optional Enhancements:**

```tsx
// If your API uses different parameter names, you can now optimize:

// Old way (still works)
<JTable columns={columns} apiUrl="/api/users" />

// New optimized way (optional)
<JTable
  columns={columns}
  apiUrl="/api/users"
  apiParams={{
    page: 'page',
    pageSize: 'per_page',
    sortColumn: 'sort',
    universalSearch: 'search'
  }}
/>
```

## 🎯 Who Should Upgrade?

### Immediate Benefits For:

- **Backend Developers** - No need to change your API parameter names
- **Teams with Existing APIs** - JTable adapts to your API format
- **Performance-conscious Developers** - Better skeleton loading and rendering
- **UI/UX Focused Teams** - Cleaner, more polished interface

### Use Cases:

1. **Legacy API Integration** - Your API uses `limit/offset` instead of `pageSize/page`
2. **Multi-API Applications** - Different APIs with different parameter formats
3. **Microservices Architecture** - Each service has its own parameter convention
4. **Third-party API Integration** - APIs you can't modify

## 📦 Installation

### New Projects

```bash
npm install jithvar-ui@1.1.0-beta.1
```

### Existing Projects

```bash
npm update jithvar-ui@1.1.0-beta.1
```

### Yarn

```bash
yarn add jithvar-ui@1.1.0-beta.1
```

### PNPM

```bash
pnpm add jithvar-ui@1.1.0-beta.1
```

## 🧪 Beta Testing

This is a **beta release** - we'd love your feedback!

### What We're Testing:

- API parameter mapping with different backend frameworks
- Skeleton loading performance across different data sizes
- Floating action usability and positioning
- Documentation completeness and clarity

### How to Provide Feedback:

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/jithvar/jithvar-ui/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/jithvar/jithvar-ui/discussions)
- 📧 **Direct Feedback**: [contact@jithvar.com](mailto:contact@jithvar.com)

### Testing Scenarios:

1. **Try the new API parameter mapping** with your existing APIs
2. **Test skeleton loading** with slow/fast network conditions
3. **Use floating actions** on different screen sizes
4. **Follow the new documentation** to set up fresh projects

## 🛣️ What's Next?

### v1.1.0 Stable (Expected: December 2024)

Based on beta feedback, we'll finalize:

- Performance optimizations
- Additional API parameter mapping options
- Enhanced documentation
- Bug fixes from beta testing

### Future Releases

- More chart types (Sankey, Treemap, Network)
- Advanced table features (column grouping, row grouping)
- Form validation system
- Theme builder tool

## 🙏 Thank You

Special thanks to our community for the feedback that drove these improvements:

- **API Parameter Flexibility** - Requested by 15+ developers
- **Built-in Loading States** - Top feature request
- **Better Documentation** - Feedback from 20+ onboarding sessions

---

## 📞 Support & Resources

- **📖 Documentation**: [ui.jithvar.com](https://ui.jithvar.com)
- **🎯 Getting Started**: [GETTING_STARTED.md](./GETTING_STARTED.md)
- **📋 Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)
- **💼 Jithvar Consultancy**: [jithvar.com](https://jithvar.com)
- **📧 Support**: [contact@jithvar.com](mailto:contact@jithvar.com)

---

**Happy coding! 🚀**

_Built with ❤️ by [Jithvar Consultancy Services](https://jithvar.com)_
