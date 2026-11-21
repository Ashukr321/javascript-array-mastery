// Practice: pagination
// Run: node practice.js

function paginate(list, page = 1, pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: list.slice(start, start + pageSize),
    page: current,
    totalItems: list.length,
    totalPages,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}

const rows = Array.from({ length: 23 }, (_, i) => `Row ${i + 1}`);
console.log(paginate(rows, 1, 10).items);
console.log(paginate(rows, 3, 10));
console.log("clamped high:", paginate(rows, 99, 10).page);
console.log("clamped low:", paginate(rows, -5, 10).page);
console.log("empty list:", paginate([], 1, 10));

const chunk = (list, size) =>
  Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));
console.log("chunk:", chunk([1, 2, 3, 4, 5], 2));

function pageWindow(current, total, size = 5) {
  const half = Math.floor(size / 2);
  const start = Math.max(1, Math.min(current - half, total - size + 1));
  return Array.from({ length: Math.min(size, total) }, (_, i) => start + i);
}
console.log(pageWindow(1, 20), pageWindow(10, 20), pageWindow(20, 20), pageWindow(2, 3));

// --- Exercises ---
// a) Add a `from`/`to` label: "Showing 21–23 of 23".
// b) Implement loadMore(list, page, size) that returns the first page*size items and a canLoadMore flag.
// c) Filter rows containing "1", sort them descending, then paginate 5 per page.
