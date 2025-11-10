# API Implementation Guide for JTable

The JTable component expects your backend API to handle the following query parameters:

## Query Parameters

### Pagination

- `page` (number) - Current page number (1-based)
- `pageSize` (number) - Number of records per page

### Sorting

- `sortColumn` (string) - The column key to sort by
- `sortDirection` (string) - Either 'asc' or 'desc'

### Universal Search

- `search` (string) - Search term to filter across all searchable columns
- `searchMode` (string) - Search mode: 'like', 'exact', 'startsWith', 'endsWith'

### Column Visibility

- `visibleColumns` (string) - Comma-separated list of visible column keys

### Column Filters

- `[columnKey]` (string) - Filter value for text columns
- `[columnKey]_start` (ISO date) - Start date for date range filters
- `[columnKey]_end` (ISO date) - End date for date range filters
- `[columnKey]_min` (number) - Minimum value for number range filters
- `[columnKey]_max` (number) - Maximum value for number range filters

## Example Request

```
GET /api/users?page=1&pageSize=10&sortColumn=name&sortDirection=asc&search=john&filter_status=active&filter_age_min=18&filter_age_max=65&filter_created_start=2024-01-01T00:00:00.000Z&filter_created_end=2024-12-31T23:59:59.999Z
```

## Expected Response Format

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "status": "active",
      "created": "2024-01-15T10:30:00.000Z"
    }
    // ... more records
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10
}
```

## Node.js/Express Example

```javascript
app.get("/api/users", async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    sortColumn,
    sortDirection = "asc",
    search,
    ...filters
  } = req.query;

  let query = db("users");

  // Universal search
  if (search) {
    query = query.where(function () {
      this.where("name", "like", `%${search}%`)
        .orWhere("email", "like", `%${search}%`)
        .orWhere("phone", "like", `%${search}%`);
    });
  }

  // Column filters
  Object.keys(filters).forEach((key) => {
    if (key.endsWith("_start") || key.endsWith("_end")) {
      const columnKey = key.replace(/_start|_end/, "");
      const startDate = filters[`${columnKey}_start`];
      const endDate = filters[`${columnKey}_end`];

      if (startDate) query = query.where(columnKey, ">=", startDate);
      if (endDate) query = query.where(columnKey, "<=", endDate);
    } else if (key.endsWith("_min") || key.endsWith("_max")) {
      const columnKey = key.replace(/_min|_max/, "");
      const min = filters[`${columnKey}_min`];
      const max = filters[`${columnKey}_max`];

      if (min) query = query.where(columnKey, ">=", min);
      if (max) query = query.where(columnKey, "<=", max);
    } else if (!key.startsWith("filter_")) {
      // Regular column filter
      query = query.where(key, "like", `%${filters[key]}%`);
    }
  });

  // Sorting
  if (sortColumn) {
    query = query.orderBy(sortColumn, sortDirection);
  }

  // Count total
  const total = await query.clone().count("* as count").first();

  // Pagination
  const offset = (page - 1) * pageSize;
  const data = await query.limit(pageSize).offset(offset);

  res.json({
    data,
    total: total.count,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
  });
});
```

## Next.js API Route Example

```typescript
// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    page = "1",
    pageSize = "10",
    sortColumn,
    sortDirection = "asc",
    search,
    ...filters
  } = req.query;

  // Your database query logic here
  const { data, total } = await fetchUsers({
    page: parseInt(page as string),
    pageSize: parseInt(pageSize as string),
    sortColumn: sortColumn as string,
    sortDirection: sortDirection as "asc" | "desc",
    search: search as string,
    filters,
  });

  res.status(200).json({
    data,
    total,
    page: parseInt(page as string),
    pageSize: parseInt(pageSize as string),
  });
}
```

## Django REST Framework Example

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

class UserListView(APIView):
    def get(self, request):
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('pageSize', 10))
        sort_column = request.GET.get('sortColumn', 'id')
        sort_direction = request.GET.get('sortDirection', 'asc')
        search = request.GET.get('search', '')

        queryset = User.objects.all()

        # Universal search
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )

        # Column filters
        for key, value in request.GET.items():
            if key.endswith('_start'):
                column = key.replace('_start', '')
                queryset = queryset.filter(**{f'{column}__gte': value})
            elif key.endswith('_end'):
                column = key.replace('_end', '')
                queryset = queryset.filter(**{f'{column}__lte': value})
            elif key.endswith('_min'):
                column = key.replace('_min', '')
                queryset = queryset.filter(**{f'{column}__gte': value})
            elif key.endswith('_max'):
                column = key.replace('_max', '')
                queryset = queryset.filter(**{f'{column}__lte': value})

        # Sorting
        order_by = sort_column if sort_direction == 'asc' else f'-{sort_column}'
        queryset = queryset.order_by(order_by)

        # Count total
        total = queryset.count()

        # Pagination
        start = (page - 1) * page_size
        end = start + page_size
        data = queryset[start:end]

        return Response({
            'data': UserSerializer(data, many=True).data,
            'total': total,
            'page': page,
            'pageSize': page_size,
        })
```

## Testing Tips

1. Use tools like Postman or curl to test your API endpoints
2. Ensure proper escaping of special characters in search queries
3. Validate and sanitize all input parameters
4. Add proper error handling for invalid parameters
5. Consider adding rate limiting for production use
6. Test with large datasets to ensure performance
