# Pagination

Pagination splits a long list into pages so the UI only renders a slice at a time: tables, product grids, search results. On the client it comes down to `slice` and some careful arithmetic.

## Page math

For **1-based** page numbers (what users see):

```js
const start = (page - 1) * pageSize;
const end = start + pageSize; // exclusive
const items = list.slice(start, end);
const totalPages = Math.ceil(list.length / pageSize);
```

`slice` never throws: if `start` is past the end it just returns `[]`, and `end` beyond the length is clamped.

## A reusable `paginate` helper

```js
function paginate(list, page = 1, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages); // clamp bad input
  const start = (current - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    page: current,
    pageSize,
    totalItems: list.length,
    totalPages,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}

const rows = Array.from({ length: 23 }, (_, i) => `Row ${i + 1}`);
paginate(rows, 3, 10);
// { items: ["Row 21", "Row 22", "Row 23"], page: 3, totalPages: 3, hasPrev: true, hasNext: false, ... }
```

Clamping matters: a URL like `?page=99` or `?page=-1` should land on a valid page, not an empty screen.

## Split into chunks

Sometimes you need **all** pages at once (for example a slideshow, or batching API calls):

```js
const chunk = (list, size) =>
  Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## Page number buttons

Show a window of pages around the current one instead of all 500:

```js
function pageWindow(current, total, size = 5) {
  const half = Math.floor(size / 2);
  const start = Math.max(1, Math.min(current - half, total - size + 1));
  return Array.from({ length: Math.min(size, total) }, (_, i) => start + i);
}

pageWindow(1, 20); // [1, 2, 3, 4, 5]
pageWindow(10, 20); // [8, 9, 10, 11, 12]
pageWindow(20, 20); // [16, 17, 18, 19, 20]
```

## Pagination + filtering + sorting

Order matters: **filter → sort → paginate**. Paginating first would sort/filter only the visible page. And when the filter changes, reset to page 1, because the old page number may no longer exist.

```js
const view = paginate(
  products.filter((p) => p.inStock).toSorted((a, b) => a.price - b.price),
  page,
  20,
);
```

## "Load more" / infinite scroll

Instead of replacing the page, grow the visible slice:

```js
const visible = list.slice(0, page * pageSize);
const canLoadMore = visible.length < list.length;
```

## Client vs server pagination

| | Client-side (`slice`) | Server-side (`?page=&limit=` or cursor) |
|---|---|---|
| Data size | small/medium (all rows already loaded) | large or unbounded |
| First load | slower (fetch everything) | fast |
| Page change | instant | network request |
| Totals | free (`list.length`) | API must return them |

For large or changing datasets, use **cursor**-based pagination on the server (`?after=<lastId>`), which doesn't skip or repeat rows when items are added mid-browse.

## Gotchas

- Mixing 0-based and 1-based page numbers is the #1 off-by-one bug. Pick one for your state and convert only at the edges (URL, UI).
- `Math.ceil(0 / size)` is `0`; keep at least one (empty) page so "Page 1 of 0" never shows.
