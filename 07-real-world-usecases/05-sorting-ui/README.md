# Sorting UI

Sortable tables and "Sort by: price / name / newest" dropdowns are built on `sort` (or the non-mutating `toSorted`) with the right **comparator**.

## Comparator recap

`sort(compare)` calls `compare(a, b)` and orders by the sign of the result:

- negative → `a` first
- positive → `b` first
- `0` → keep their relative order (sort is **stable** since ES2019)

```js
const nums = [10, 1, 5, 100];
nums.toSorted(); // [1, 10, 100, 5]  ← default sort compares STRINGS
nums.toSorted((a, b) => a - b); // [1, 5, 10, 100]
```

## Don't mutate UI state

`sort` sorts **in place**. In React/Vue state, or when the original order matters, use `toSorted` (ES2023) or copy first:

```js
const sorted = products.toSorted(byPrice); // new array
const sortedOld = [...products].sort(byPrice); // same, older browsers
```

## Comparators by type

```js
const byNumber = (key) => (a, b) => a[key] - b[key];
const byText = (key) => (a, b) => a[key].localeCompare(b[key], undefined, { sensitivity: "base", numeric: true });
const byDate = (key) => (a, b) => new Date(a[key]) - new Date(b[key]);
```

`localeCompare` handles accents and case properly, and `numeric: true` sorts `"item 2"` before `"item 10"`.

## Ascending / descending toggle

```js
const withDirection = (compare, dir) => (dir === "asc" ? compare : (a, b) => compare(b, a));

let sortState = { key: "price", dir: "asc" };

function onHeaderClick(key) {
  sortState = sortState.key === key ? { key, dir: sortState.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" };
}
```

Clicking the same column flips direction; clicking a new column starts ascending.

## Multi-column sort (tie-breakers)

Sort by category, then by price within each category:

```js
const thenBy = (...comparators) => (a, b) => {
  for (const c of comparators) {
    const r = c(a, b);
    if (r !== 0) return r;
  }
  return 0;
};

products.toSorted(thenBy(byText("category"), byNumber("price")));
```

## Putting empty values last

`null`/`undefined` prices shouldn't jump to the top:

```js
const nullsLast = (key, compare) => (a, b) =>
  a[key] == null ? (b[key] == null ? 0 : 1) : b[key] == null ? -1 : compare(a, b);
```

## A full sort config

```js
const SORTS = {
  "price-asc": byNumber("price"),
  "price-desc": withDirection(byNumber("price"), "desc"),
  "name-asc": byText("name"),
  newest: withDirection(byDate("createdAt"), "desc"),
};

const visible = products.toSorted(SORTS[selectedOption]);
```

## Gotchas

- `(a, b) => a > b` returns a boolean, not a number. It looks like it works on some inputs and silently fails on others.
- `a - b` on strings gives `NaN`; use `localeCompare`.
- Sort **before** paginating (see Pagination), and keep the sort when filters change.
- Sorting objects re-orders references; it doesn't copy the objects themselves.

## Accessibility

On sortable table headers, set `aria-sort="ascending" | "descending" | "none"` and make the header a `<button>` so keyboard and screen-reader users can sort too.
